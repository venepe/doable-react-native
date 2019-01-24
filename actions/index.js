import { Alert } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import CardTypes from '../constants/CardTypes';
import CardBuilderTypes from '../constants/CardBuilderTypes';
import NetworkTypes from '../constants/NetworkTypes';
import UserTypes from '../constants/UserTypes';
import { getRandomInt } from '../utilities';
import { track } from '../helpers/analytics';
import { getUser } from '../helpers/user';
import { API_URL } from '../config';

export const uploadDocument = payload =>
  (dispatch, getState) => {
    let { payload: { deckId } } = payload;
    const permissions = Permissions.CAMERA_ROLL;
    Permissions.askAsync(permissions).then(({ status }) => {
      if (status === 'granted') {
        ImagePicker.launchImageLibraryAsync({ mediaTypes: 'Images', allowsEditing: false })
          .then((result) => {
            if (!result.cancelled) {
              const { uri } = result;
              const { uid } = getState();

              let name = uri.match(/\w+(?:\.\w+)*$/g)[0];
              let type = 'image/jpeg';

              const data = new FormData();
              data.append('document', {
                uri,
                type,
                name,
              });

              data.append('userUid', uid);
              data.append('deckId', deckId);

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
            }
          });
      }
    });
  };

export const setUID = payload => ({
  type: UserTypes.SET_UID,
  ...payload,
});

export const setActiveCard = payload => ({
  type: CardTypes.SET_ACTIVE_CARD,
  ...payload,
});

export const setActiveCards = payload => ({
  type: CardTypes.SET_ACTIVE_CARDS,
  ...payload,
});

export const removeActiveCardById = payload => ({
  type: CardTypes.REMOVE_CARD_BY_ID,
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

export const addFrontTextWord = payload => ({
  type: CardBuilderTypes.ADD_FRONT_TEXT_WORD,
  ...payload,
});

export const addBackTextWord = payload => ({
  type: CardBuilderTypes.ADD_BACK_TEXT_WORD,
  ...payload,
});

export const clearFrontText = () => ({
  type: CardBuilderTypes.CLEAR_FRONT_TEXT_WORD,
});

export const clearBackText = () => ({
  type: CardBuilderTypes.CLEAR_BACK_TEXT_WORD,
});

const actions = {
  setUID,
  didBeginUploading,
  didFinishUploading,
  addFrontTextWord,
  addBackTextWord,
  clearFrontText,
  clearBackText,
};

export default actions;
