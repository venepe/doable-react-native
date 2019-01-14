import DeckTypes from '../constants/DeckTypes';
import UserTypes from '../constants/UserTypes';
import { getRandomInt } from '../utilities';
import { track } from '../helpers/analytics';
import { getUID } from '../helpers/user';

export const generateUID = () => (dispatch) => {
  getUID().then((uid) => {
    dispatch(setUID({ payload: { uid } }));
  })
};

export const setUID = payload => ({
  type: UserTypes.SET_UID,
  ...payload,
});

const actions = {
  setUID,
};

export default actions;
