import { SecureStore } from 'expo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { RetryLink } from 'apollo-link-retry';
import { GRAPHQL_URL } from './config';
import { logonUser } from './helpers/logon';
import Keys from './constants/Keys';

const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: GRAPHQL_URL });

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
          logonUser()
            .then(() => {
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
  return SecureStore.getItemAsync(Keys.TOKEN_KEY)
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
