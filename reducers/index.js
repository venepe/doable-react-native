import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';

const initialState = {
  activeAudioRecord: {},
  isPlaying: false,
  activeDeck: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AudioTypes.SET_ACTIVE_RECORD:
    {
      const { activeAudioRecord } = action.payload;
      return {
        ...state,
        activeAudioRecord,
      };
    }
    case AudioTypes.START_PLAYBACK:
    {
      const { isPlaying } = action.payload;
      return {
        ...state,
        isPlaying,
      };
    }
    case AudioTypes.STOP_PLAYBACK:
    {
      const { isPlaying } = action.payload;
      return {
        ...state,
        isPlaying,
      };
    }
    case DeckTypes.SET_ACTIVE_DECK:
    {
      const { activeDeck } = action.payload;
      return {
        ...state,
        activeDeck,
      };
    }
    default:
      return state;
  }
};

export const getActiveRecord = state => state.activeAudioRecord;
export const getIsPlaying = state => state.isPlaying;

export default reducer;
