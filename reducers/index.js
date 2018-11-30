import AudioTypes from '../constants/AudioTypes';

const initialState = {
  decks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AudioTypes.USER_LOCATION_CHANGED:
    {
      const { latitude, longitude } = action.payload;
      return {
        ...state,
        userCoordinates: {
          latitude,
          longitude,
        },
      };
    }
    default:
      return state;
  }
};

export const getUserCoordinates = state => state.userCoordinates;

export default reducer;
