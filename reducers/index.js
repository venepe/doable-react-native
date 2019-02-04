import CardTypes from '../constants/CardTypes';
import CardBuilderTypes from '../constants/CardBuilderTypes';
import NetworkTypes from '../constants/NetworkTypes';
import UserTypes from '../constants/UserTypes';
import { EDITING } from '../constants/Enums';

const initialState = {
  activeCard: {},
  activeCards: [],
  uid: null,
  isLoading: false,
  frontText: '',
  backText: '',
  frontTextIndexes: [],
  backTextIndexes: [],
  cardEditingStatus: EDITING.FRONT_TEXT,
  uploadProgress: 0,
};

function getIndexToRemove(textIndexes, index) {
  return textIndexes.findIndex((elm) => {
    return elm === index;
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CardTypes.SET_ACTIVE_CARD:
    {
      const { activeCard } = action.payload;

      return {
        ...state,
        activeCard,
      };
    }
    case CardTypes.SET_ACTIVE_CARDS:
    {
      const { activeCards } = action.payload;
      return {
        ...state,
        activeCards,
      };
    }
    case CardTypes.REMOVE_CARD_BY_ID:
    {
      const { id } = action.payload;
      let { activeCards } = state;
      const idx = activeCards.findIndex((card) => {
        return card.id === id;
      });
      activeCards.splice(idx, 1);
      return {
        ...state,
        activeCards,
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
      const { frontTextWord, frontTextIndex } = action.payload;
      let { frontText, frontTextIndexes } = state;
      frontText = `${frontText} ${frontTextWord.trim()}`;
      frontTextIndexes.push(frontTextIndex);
      return {
        ...state,
        frontText,
        frontTextIndexes,
      };
    }
    case CardBuilderTypes.ADD_BACK_TEXT_WORD:
    {
      const { backTextWord, backTextIndex } = action.payload;
      let { backText, backTextIndexes } = state;
      backText = `${backText} ${backTextWord.trim()}`;
      backTextIndexes.push(backTextIndex);
      return {
        ...state,
        backText,
        backTextIndexes,
      };
    }
    case CardBuilderTypes.REMOVE_FRONT_TEXT_WORD_AT_INDEX:
    {
      const { index } = action.payload;
      let { frontText, frontTextIndexes } = state;
      let indexToRemove = getIndexToRemove(frontTextIndexes, index);
      let words = frontText.trim().split(' ');
      words.splice(indexToRemove, 1);
      frontText = words.join(' ');
      frontTextIndexes.splice(indexToRemove, 1);
      return {
        ...state,
        frontText,
        frontTextIndexes,
      };
    }
    case CardBuilderTypes.REMOVE_BACK_TEXT_WORD_AT_INDEX:
    {
      const { index } = action.payload;
      let { backText, backTextIndexes } = state;
      let indexToRemove = getIndexToRemove(backTextIndexes, index);
      let words = backText.trim().split(' ');
      words.splice(indexToRemove, 1);
      backText = words.join(' ');
      backTextIndexes.splice(indexToRemove, 1);
      return {
        ...state,
        backText,
        backTextIndexes,
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
        frontText: '',
        backText: '',
        frontTextIndexes: [],
        backTextIndexes: [],
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
export const getFrontText = state => state.frontText;
export const getBackText = state => state.backText;
export const getFrontTextIndexes = state => state.frontTextIndexes;
export const getBackTextIndexes = state => state.backTextIndexes;
export const getActiveCard = state => state.activeCard;
export const getActiveCards = state => state.activeCards;
export const getCardEditingStatus = state => state.cardEditingStatus;

export default reducer;
