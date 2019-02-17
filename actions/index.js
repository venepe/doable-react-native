import { Alert } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import CardTypes from '../constants/CardTypes';
import CardBuilderTypes from '../constants/CardBuilderTypes';
import NetworkTypes from '../constants/NetworkTypes';
import UserTypes from '../constants/UserTypes';
import { getRandomInt } from '../utilities';
import { track } from '../helpers/analytics';
import { getUser } from '../helpers/user';
import GraphQLValues from '../constants/GraphQLValues';
import { API_URL } from '../config';
import client from '../apolloClient';
import { DECKS_BY_USER_UID } from '../queries';

export const uploadDeck = payload =>
  (dispatch, getState) => {
    let { payload: { uri, name } } = payload;
    const type = 'application/pdf';
    const { uid } = getState();

    name = uri.match(/\w+(?:\.\w+)*$/g)[0];

    const data = new FormData();
    data.append('document', {
      uri,
      type,
      name,
    });

    data.append('userUid', uid);

    dispatch(didBeginUploading());

    const oReq = new XMLHttpRequest();

    oReq.upload.addEventListener('progress', (oEvent) => {
      if (oEvent.lengthComputable) {
        let uploadProgress = oEvent.loaded / oEvent.total;
        dispatch(onUploadProgress({ payload: { uploadProgress } }));
      }
    });

    oReq.open('POST', `${API_URL}/deck`, true);
    oReq.setRequestHeader('Content-Type', 'multipart/form-data');

    oReq.send(data);

    oReq.onreadystatechange = () => {
      if (oReq.readyState == XMLHttpRequest.DONE) {
        if (oReq.status === 200) {
          let result = JSON.parse(oReq.responseText);
          let { deck } = result;
          console.log(deck);
          deck.__typename = 'Deck';
          const { userByUid } = client.readQuery({ query: DECKS_BY_USER_UID, variables: {
            uid,
            first: GraphQLValues.FIRST,
            after: null,
          } });
          userByUid.decksByUserUid.edges.unshift({ __typename: 'DecksEdge', node: deck });
          dispatch(didFinishUploading({ payload: { deck: result.deck } }));
        } else {
          let errorMessage = 'Verify that you are connected to the internet.'
          if (oReq.status === 400) {
            let result = JSON.parse(oReq.responseText);
            errorMessage = result.message;
          }
          dispatch(didFinishUploading({ payload: { deck: '' } }));
          Alert.alert(
            'Document Failed',
            errorMessage,
            [
              {text: 'Okay'},
            ],
            { cancelable: false }
          );
        }
      }
    }
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

export const removeActiveCardAtIndexAndSetActiveCard = payload => ({
  type: CardTypes.REMOVE_ACTIVE_CARD_AT_INDEX,
  ...payload,
});

export const didBeginUploading = () => ({
  type: NetworkTypes.BEGIN_UPLOAD,
  payload: { isLoading: true, progress: 0 },
});

export const didFinishUploading = (payload = {}) => ({
  type: NetworkTypes.FINISH_UPLOAD,
  payload: { ...payload.payload, isLoading: false },
});

export const onUploadProgress = payload => ({
  type: NetworkTypes.ON_UPLOAD_PROGRESS,
  payload: { ...payload.payload, isLoading: true },
});

export const addFrontTextWord = payload => ({
  type: CardBuilderTypes.ADD_FRONT_TEXT_WORD,
  ...payload,
});

export const addBackTextWord = payload => ({
  type: CardBuilderTypes.ADD_BACK_TEXT_WORD,
  ...payload,
});

export const removeFrontTextWordAtIndex = payload => ({
  type: CardBuilderTypes.REMOVE_FRONT_TEXT_WORD_AT_INDEX,
  ...payload,
});

export const removeBackTextWordAtIndex = payload => ({
  type: CardBuilderTypes.REMOVE_BACK_TEXT_WORD_AT_INDEX,
  ...payload,
});

export const setCardEditingStatus = payload => ({
  type: CardBuilderTypes.SET_CARD_EDITING_STATUSES,
  ...payload,
});

export const clearCardEditing = () => ({
  type: CardBuilderTypes.CLEAR_CARD_EDITING,
});

const actions = {
  setUID,
  didBeginUploading,
  didFinishUploading,
  onUploadProgress,
  addFrontTextWord,
  addBackTextWord,
  setCardEditingStatus,
  clearCardEditing,
};

export default actions;
