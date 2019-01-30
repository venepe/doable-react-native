import React, { Component } from 'react';
import { SecureStore } from 'expo';;
import { store } from '../App';
import { setUID } from '../actions';
import Keys from '../constants/Keys';

export const logoutUser = () => {
  return SecureStore.setItemAsync(Keys.TOKEN_KEY, '')
    .then(() => {
      console.log('asdf');
      store.dispatch(setUID({ payload: { uid: null  } }));
    });
};
