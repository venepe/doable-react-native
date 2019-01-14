import DeckTypes from '../constants/DeckTypes';
import UserTypes from '../constants/UserTypes';

const initialState = {
  activeDeckId: '',
  uid: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DeckTypes.SET_ACTIVE_DECK_ID:
    {
      const { activeDeckId } = action.payload;
      return {
        ...state,
        activeDeckId,
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
    default:
      return state;
  }
};

export default reducer;
