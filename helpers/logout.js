import React, { Component } from 'react';
import { AuthSession, SecureStore } from 'expo';;
import { Platform } from 'react-native';
import { store } from '../App';
import { setUID } from '../actions';
import Keys from '../constants/Keys';
const auth0ClientId = 'Z1nFXf7pX2wRyf5Ps4ArqYTyJ6fs5eE9';
export const logoutUser = () => {
  const returnUrl = AuthSession.getRedirectUrl();;
  return fetch(`https://d0able.auth0.com/v2/logout?client_id=${auth0ClientId}&returnTo=${returnUrl}`)
    .then((result) => {
      return SecureStore.setItemAsync(Keys.TOKEN_KEY, '')
    })
    .then(() => {
      store.dispatch(setUID({ payload: { uid: null  } }));
    });
};
