import { SecureStore } from 'expo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { GRAPHQL_URL } from './config';
const TOKEN_KEY = 'TOKEN_KEY';

const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: GRAPHQL_URL });

const stateLink = withClientState({
  cache,
  defaults: {},
  resolvers: {},
});

const authLink = setContext((_, { headers }) => {
  return SecureStore.getItemAsync(TOKEN_KEY)
      .then((token) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          }
        }
      });
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, authLink, httpLink]),
  cache,
});

export default client;
