import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ApolloProvider } from 'react-apollo';
import client from './apolloClient';
import reducer from './reducers';
import BaseApp from './components/Base';

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default class Base extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BaseApp />
        </Provider>
      </ApolloProvider>
  );
  }
}
