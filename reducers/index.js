import CardTypes from '../constants/CardTypes';
import DeckTypes from '../constants/DeckTypes';
import NetworkTypes from '../constants/NetworkTypes';
import UserTypes from '../constants/UserTypes';

const initialState = {
  activeCard: {},
  activeDeckId: '',
  uid: null,
  email: null,
  isLoading: false,
};

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
    case DeckTypes.SET_ACTIVE_DECK_ID:
    {
      const { activeDeckId } = action.payload;
      return {
        ...state,
        activeDeckId,
      };
    }
    case UserTypes.SET_USER:
    {
      const { uid, email } = action.payload;
      return {
        ...state,
        uid,
        email,
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
    default:
      return state;
  }
};

export const getIsLoading = state => state.isLoading;
export const getUID = state => state.getUID;

export default reducer;
