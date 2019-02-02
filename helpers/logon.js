import React, { Component } from 'react';
import { AuthSession, SecureStore } from 'expo';
import { Platform } from 'react-native';
import Auth0 from 'react-native-auth0';
import jwtDecoder from 'jwt-decode';
import client from '../apolloClient';
import { store } from '../App';
import { setUID } from '../actions';
import { randomString } from '../utilities';
import { LOGON_USER } from '../mutations';

const auth0ClientId = 'Z1nFXf7pX2wRyf5Ps4ArqYTyJ6fs5eE9';
const auth0Domain = 'https://d0able.auth0.com';
import Keys from '../constants/Keys';

function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  }

export const logonUser = () => {
  const redirectUrl = AuthSession.getRedirectUrl();
  const returnUrl = Platform.OS === 'ios' ? `com.venepe.doable://d0able.auth0.com/${Platform.OS}/com.venepe.doable/callback` : '';
  return AuthSession.startAsync({
    authUrl: `${auth0Domain}/authorize` + toQueryString({
      client_id: auth0ClientId,
      response_type: 'id_token',
      scope: 'openid profile email',
      redirect_uri: redirectUrl,
      nonce: randomString(),
    }),
    returnUrl,
    }).then((result) => {
      const { params = {} } = result;
      const { id_token = '' } = params;
      const decodedToken = jwtDecoder(id_token);
      const uid = decodedToken.sub;
      const email = decodedToken.email;
      return SecureStore.setItemAsync(Keys.TOKEN_KEY, id_token).then(() => {
        return { uid, email }
      });
    })
    .then(({ uid, email }) => {
      return client.mutate({
        mutation: LOGON_USER,
        variables: { input: { uid, email } },
      });
    })
    .then(({ data }) => {
      const uid = data.logonUser.user.uid;
      store.dispatch(setUID({ payload: { uid  } }));
    });
};
