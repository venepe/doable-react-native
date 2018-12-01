import AudioTypes from '../constants/AudioTypes';

const initialState = {
  decks: [],
  activeAudioRecord: {},
  isPlaying: false,
  isRecording: false,
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
    default:
      return state;
  }
};

export const getActiveRecord = state => state.activeAudioRecord;
export const getIsPlaying = state => state.isPlaying;
export const getIsRecording = state => state.isRecording;

export default reducer;
