import CardTypes from '../constants/CardTypes';
import CardBuilderTypes from '../constants/CardBuilderTypes';
import NetworkTypes from '../constants/NetworkTypes';
import UserTypes from '../constants/UserTypes';
import { EDITING } from '../constants/Enums';
import { getRandomInt } from '../utilities';

// frontTextIndexesOnDocument = {
//   documentId,
//   wordIndexes: frontTextIndexes,
// }];

// frontText = [
//   documentIndexKey: `${documentId}:${index}`,
//   word,
// ]

const initialState = {
  activeCard: {},
  activeCards: [],
  activeIndex: -1,
  potentialCards: [],
  uid: null,
  didLoadUid: false,
  isLoading: false,
  frontText: [],
  backText: [],
  cardEditingStatus: EDITING.FRONT_TEXT,
  uploadProgress: 0,
  frontTextIndexesOnDocument: {},
  backTextIndexesOnDocument: {},
};

function getIndexToRemove(textIndexes, index) {
  return textIndexes.findIndex((elm) => {
    return elm === index;
  });
}

function getDocumentKeyIndexToRemove(textArray, documentIndexKeyToRemove) {
  return textArray.findIndex(({ documentIndexKey }) => {
    return documentIndexKey === documentIndexKeyToRemove;
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CardTypes.SET_ACTIVE_CARD:
    {
      const { activeCard, activeIndex } = action.payload;

      return {
        ...state,
        activeCard,
        activeIndex,
      };
    }
    case CardTypes.SET_ACTIVE_CARDS:
    {
      const { activeCards } = action.payload;
      return {
        ...state,
        activeCards: [...activeCards],
        potentialCards: [...activeCards],
      };
    }
    case CardTypes.REMOVE_ACTIVE_CARD_AT_INDEX:
    {
      const { index } = action.payload;
      let { activeCards, potentialCards } = state;
      activeCards.splice(index, 1);
      let nextIdx = getRandomInt(activeCards.length);
      let activeCard = activeCards[nextIdx];
      return {
        ...state,
        activeCards: [...activeCards],
        activeCard,
        activeIndex: nextIdx,
      };
    }
    case UserTypes.SET_UID:
    {
      const { uid } = action.payload;
      return {
        ...state,
        uid,
      };
    }
    case UserTypes.DID_LOAD_UID:
    {
      return {
        ...state,
        didLoadUid: true,
      };
    }
    case NetworkTypes.BEGIN_UPLOAD:
    {
      const { isLoading } = action.payload;
      return {
        ...state,
        isLoading,
      };
    }
    case NetworkTypes.FINISH_UPLOAD:
    {
      const { isLoading } = action.payload;
      return {
        ...state,
        isLoading,
      };
    }
    case NetworkTypes.ON_UPLOAD_PROGRESS:
    {
      const { isLoading, uploadProgress } = action.payload;
      return {
        ...state,
        isLoading,
        uploadProgress,
      };
    }
    case CardBuilderTypes.ADD_FRONT_TEXT_WORD:
    {
      const { frontTextWord, documentId, wordIndex } = action.payload;
      let { frontText, frontTextIndexesOnDocument } = state;
      frontText.push({
        documentIndexKey: `${documentId}:${wordIndex}`,
        word: frontTextWord.trim(),
      });

      if (!frontTextIndexesOnDocument[documentId]) {
        frontTextIndexesOnDocument[documentId] = [];
      }
      frontTextIndexesOnDocument[documentId].push(wordIndex);
      return {
        ...state,
        frontText: [...frontText],
        frontTextIndexesOnDocument,
      };
    }
    case CardBuilderTypes.ADD_BACK_TEXT_WORD:
    {
      const { backTextWord, documentId, wordIndex } = action.payload;
      let { backText, backTextIndexesOnDocument } = state;
      backText.push({
        documentIndexKey: `${documentId}:${wordIndex}`,
        word: backTextWord.trim(),
      });

      if (!backTextIndexesOnDocument[documentId]) {
        backTextIndexesOnDocument[documentId] = [];
      }
      backTextIndexesOnDocument[documentId].push(wordIndex);
      return {
        ...state,
        backText: [...backText],
        backTextIndexesOnDocument,
      };
    }
    case CardBuilderTypes.REMOVE_FRONT_TEXT_WORD_AT_INDEX:
    {
      const { index, documentId } = action.payload;
      let { frontText, frontTextIndexesOnDocument } = state;
      if (!frontTextIndexesOnDocument[documentId]) {
        return;
      }

      const documentIndexKey = `${documentId}:${index}`;
      let indexesOnDocumentToRemove = getIndexToRemove(frontTextIndexesOnDocument[documentId], index);
      let indexOnFrontTextToRemove = getDocumentKeyIndexToRemove(frontText, documentIndexKey);
      frontTextIndexesOnDocument[documentId].splice(indexesOnDocumentToRemove, 1);
      frontText.splice(indexOnFrontTextToRemove, 1);

      return {
        ...state,
        frontText: [...frontText],
        frontTextIndexesOnDocument,
      };
    }
    case CardBuilderTypes.REMOVE_BACK_TEXT_WORD_AT_INDEX:
    {
      const { index, documentId } = action.payload;
      let { backText, backTextIndexesOnDocument } = state;
      if (!backTextIndexesOnDocument[documentId]) {
        return;
      }

      const documentIndexKey = `${documentId}:${index}`;
      let indexesOnDocumentToRemove = getIndexToRemove(backTextIndexesOnDocument[documentId], index);
      let indexOnFrontTextToRemove = getDocumentKeyIndexToRemove(backText, documentIndexKey);
      backTextIndexesOnDocument[documentId].splice(indexesOnDocumentToRemove, 1);
      backText.splice(indexOnFrontTextToRemove, 1);

      return {
        ...state,
        backText: [...backText],
        backTextIndexesOnDocument,
      };
    }
    case CardBuilderTypes.SET_CARD_EDITING_STATUSES:
    {
      const { cardEditingStatus } = action.payload;
      return {
        ...state,
        cardEditingStatus,
      };
    }
    case CardBuilderTypes.CLEAR_CARD_EDITING:
    {
      return {
        ...state,
        frontText: [],
        backText: [],
        frontTextIndexesOnDocument: {},
        backTextIndexesOnDocument: {},
        cardEditingStatus: EDITING.FRONT_TEXT,
      };
    }
    default:
      return state;
  }
};

export const getIsLoading = state => state.isLoading;
export const getUploadProgress = state => state.uploadProgress;
export const getUID = state => state.uid;
export const getDidLoadUID = state => state.didLoadUid;
export const getFrontText = state => state.frontText;
export const getBackText = state => state.backText;
export const getFrontTextIndexesOnDocument = state => state.frontTextIndexesOnDocument;
export const getBackTextIndexesOnDocument = state => state.backTextIndexesOnDocument;
export const getActiveCard = state => state.activeCard;
export const getActiveCards = state => state.activeCards;
export const getActiveIndex = state => state.activeIndex;
export const getPotentialCards = state => state.potentialCards;
export const getCardEditingStatus = state => state.cardEditingStatus;

export default reducer;
