import { Alert } from 'react-native';
import CardTypes from '../constants/CardTypes';
import DeckTypes from '../constants/DeckTypes';
import NetworkTypes from '../constants/NetworkTypes';
import UserTypes from '../constants/UserTypes';
import { getRandomInt } from '../utilities';
import { track } from '../helpers/analytics';
import { getUser } from '../helpers/user';
import { API_URL } from '../config';

export const uploadImage = payload =>
  (dispatch, getState) => {
    let { payload: { uri, } } = payload;
    // const { uid } = getState();
    let name = uri.match(/\w+(?:\.\w+)*$/g)[0];
    let type = 'image/jpeg';
    const data = new FormData();
    data.append('document', {
      uri,
      type,
      name,
    });

    data.append('userId', 1);
    data.append('deckId', 1);

    dispatch(didBeginUploading());

    return fetch(`${API_URL}/document`, {
        method: 'post',
        body: data,
      })
      .then(response => response.json())
      .then(result => {
        dispatch(didFinishUploading({ payload: { document: result.document } }));
      })
      .catch((error) => {
        dispatch(didFinishUploading({ payload: { score: '' } }));
        Alert.alert(
          'Unable to Upload',
          'Verify that you are connected to the internet.',
          [
            {text: 'Okay'},
          ],
          { cancelable: false }
        )
      });
  };

export const generateUID = () => (dispatch) => {
  getUID().then((uid) => {
    dispatch(setUID({ payload: { uid } }));
  })
};

export const setUID = payload => ({
  type: UserTypes.SET_USER,
  ...payload,
});

export const setActiveAudiocard = payload => ({
  type: CardTypes.SET_ACTIVE_CARD,
  ...payload,
});

export const didBeginUploading = () => ({
  type: NetworkTypes.BEGIN_UPLOAD,
  payload: { isLoading: true },
});

export const didFinishUploading = (payload = {}) => ({
  type: NetworkTypes.FINISH_UPLOAD,
  payload: { ...payload.payload, isLoading: false },
});

const actions = {
  setUID,
  didBeginUploading,
  didFinishUploading,
};

export default actions;
