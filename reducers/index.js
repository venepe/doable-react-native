import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';
import FlashcardTypes from '../constants/FlashcardTypes';

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
  ],
  flashcards: [
    {
      title: 'Flashcard 1',
      uri: '',
    },
    {
      title: 'Flashcard 2',
      uri: '',
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
      const decks = state.decks.filter(deck => deck.title !== action.payload.title);
        return { ...state,
          decks,
        };
    }
    case FlashcardTypes.DELETE_FLASHCARD:
    {
      const flashcards = state.flashcards.filter(flashcard => flashcard.title !== action.payload.title);
        return { ...state,
          flashcards,
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
export const getFlashcards = state => state.flashcards;

export default reducer;
