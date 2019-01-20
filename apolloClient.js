import { AuthSession, SecureStore } from 'expo';
import jwtDecoder from 'jwt-decode';
import Auth0 from 'react-native-auth0';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { RetryLink } from 'apollo-link-retry';
import { store } from './App';
import { setUID } from './actions';
import { GRAPHQL_URL } from './config';
import { LOGON_USER } from './mutations';
import { randomString } from './utilities';
const auth0ClientId = 'Z1nFXf7pX2wRyf5Ps4ArqYTyJ6fs5eE9';
const auth0Domain = 'https://d0able.auth0.com';
const TOKEN_KEY = 'TOKEN_KEY';

const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: GRAPHQL_URL });

function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  }

const stateLink = withClientState({
  cache,
  defaults: {},
  resolvers: {},
});

const recoveryLink = new RetryLink({
	delay: {
		initial: 0,
	},
	attempts: {
		max: 5,
		retryIf: (error: ResponseError, operation) => {
			if (error.statusCode === 401 || error.statusCode === 403) {
				return new Promise((resolve, reject) => {
          const redirectUrl = AuthSession.getRedirectUrl();
          console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
          AuthSession.startAsync({
            authUrl: `${auth0Domain}/authorize` + toQueryString({
              client_id: auth0ClientId,
              response_type: 'id_token',
              scope: 'openid profile email',
              redirect_uri: redirectUrl,
              nonce: randomString(),
            }),
            returnUrl: 'com.venepe.doable://d0able.auth0.com/ios/com.venepe.doable/callback',
          }).then((result) => {
            console.log(result);
            const { params = {} } = result;
            const { id_token = '' } = params;
            const decodedToken = jwtDecoder(id_token);
            const uid = decodedToken.sub;
            const email = decodedToken.email;
            store.dispatch(setUID({ payload: { uid  } }));
            return SecureStore.setItemAsync(TOKEN_KEY, id_token).then(() => {
              return { uid, email };
            });
          })
          .then(({ uid, email }) => {
            return client.mutate({
              mutation: LOGON_USER,
              variables: { input: { uid, email } },
            });
          })
          .then(({ data }) => {
            const userId = data.logonUser.user.id;
            console.log('reload');
            resolve(true);
          })
          .catch((e) => {
            console.log(e);
						resolve(false);
					})
				});
			}
			return false;
		}
	}
});

const authLink = setContext((_, { headers }) => {
  return SecureStore.getItemAsync(TOKEN_KEY)
      .then((token) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          }
        }
      });
});

const client = new ApolloClient({
  link: ApolloLink.from([recoveryLink, stateLink, authLink, httpLink]),
  cache,
});

export default client;
