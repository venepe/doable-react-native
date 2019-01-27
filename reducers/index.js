import CardTypes from '../constants/CardTypes';
import CardBuilderTypes from '../constants/CardBuilderTypes';
import NetworkTypes from '../constants/NetworkTypes';
import UserTypes from '../constants/UserTypes';

const initialState = {
  activeCard: {},
  activeCards: [],
  uid: null,
  isLoading: false,
  frontText: '',
  backText: '',
  uploadProgress: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CardTypes.SET_ACTIVE_CARD:
    {
      const { activeCard } = action.payload;

      console.log(activeCard);
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
      const { frontTextWord } = action.payload;
      let { frontText } = state;
      frontText = `${frontText} ${frontTextWord.trim()}`
      return {
        ...state,
        frontText,
      };
    }
    case CardBuilderTypes.ADD_BACK_TEXT_WORD:
    {
      const { backTextWord } = action.payload;
      let { backText } = state;
      backText = `${backText} ${backTextWord.trim()}`
      return {
        ...state,
        backText,
      };
    }
    case CardBuilderTypes.REMOVE_FRONT_TEXT_WORD_AT_INDEX:
    {
      const { index } = action.payload;
      let { frontText } = state;
      let words = frontText.trim().split(' ');
      words.splice(index, 1);
      frontText = words.join(' ');
      return {
        ...state,
        frontText,
      };
    }
    case CardBuilderTypes.REMOVE_BACK_TEXT_WORD_AT_INDEX:
    {
      const { index } = action.payload;
      let { backText } = state;
      let words = backText.trim().split(' ');
      words.splice(index, 1);
      backText = words.join(' ');
      return {
        ...state,
        backText,
      };
    }
    case CardBuilderTypes.CLEAR_FRONT_TEXT_WORD:
    {
      return {
        ...state,
        frontText: '',
      };
    }
    case CardBuilderTypes.CLEAR_BACK_TEXT_WORD:
    {
      return {
        ...state,
        backText: '',
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
export const getActiveCard = state => state.activeCard;
export const getActiveCards = state => state.activeCards;

export default reducer;
