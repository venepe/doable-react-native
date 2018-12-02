import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';

const initialState = {
  decks: [],
  activeAudioRecord: {},
  isPlaying: false,
  isRecording: false,
  decks: [
    {
      title: 'Deck 1'
    },
    {
      title: 'Deck 2'
    },
  ]
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
    case DeckTypes.DELETE_DECK:
    {
      const decks = state.decks.filter(deck => deck.name !== action.payload.name);
        return { ...state,
          decks,
        };
    }
    default:
      return state;
  }
};

export const getActiveRecord = state => state.activeAudioRecord;
export const getIsPlaying = state => state.isPlaying;
export const getIsRecording = state => state.isRecording;
export const getDecks = state => state.decks;

export default reducer;
