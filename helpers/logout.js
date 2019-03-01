import React, { Component } from 'react';
import { SecureStore, WebBrowser } from 'expo';;
import { Platform } from 'react-native';
import { store } from '../App';
import { setUID } from '../actions';
import Keys from '../constants/Keys';
const auth0ClientId = 'Z1nFXf7pX2wRyf5Ps4ArqYTyJ6fs5eE9';
export const logoutUser = () => {
  const returnUrl = `com.venepe.doable://d0able.auth0.com/${Platform.OS}/com.venepe.doable/callback`;
  return WebBrowser.openBrowserAsync(`https://d0able.auth0.com/v2/logout?client_id=${auth0ClientId}&returnTo=${returnUrl}`)
    .then((result) => {
      return SecureStore.setItemAsync(Keys.TOKEN_KEY, '')
    })
    .then(() => {
      store.dispatch(setUID({ payload: { uid: null  } }));
    });
};
