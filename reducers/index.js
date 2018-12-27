import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';
import VoiceTypes from '../constants/VoiceTypes';

const initialState = {
  activeAudiocard: {},
  activeUri: '',
  isPlaying: false,
  activeDeckId: '',
  audiocards: [],
  isOnRepeat: false,
  isOnRandom: false,
  isInteractive: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AudioTypes.SET_ACTIVE_AUDIOCARD:
    {
      const { activeAudiocard } = action.payload;
      return {
        ...state,
        activeAudiocard,
      };
    }
    case AudioTypes.SET_ACTIVE_AUDIOCARD_AND_URI:
    {
      const { activeAudiocard, activeUri } = action.payload;
      return {
        ...state,
        activeAudiocard,
        activeUri,
      };
    }
    case AudioTypes.SET_ACTIVE_URI:
    {
      const { activeUri } = action.payload;
      return {
        ...state,
        activeUri,
      };
    }
    case AudioTypes.SET_AUDIOCARDS:
    {
      const { audiocards } = action.payload;
      return {
        ...state,
        audiocards,
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
    case AudioTypes.SET_IS_ON_REPEAT:
    {
      const { isOnRepeat } = action.payload;
      return {
        ...state,
        isOnRepeat,
      };
    }
    case AudioTypes.SET_IS_ON_RANDOM:
    {
      const { isOnRandom } = action.payload;
      return {
        ...state,
        isOnRandom,
      };
    }
    case VoiceTypes.SET_IS_INTERACTIVE:
    {
      const { isInteractive } = action.payload;
      return {
        ...state,
        isInteractive,
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
    default:
      return state;
  }
};

export const getActiveAudiocard = state => state.activeAudiocard;
export const getAudiocards = state => state.audiocards;
export const getIsPlaying = state => state.isPlaying;
export const getIsOnRepeat = state => state.isOnRepeat;
export const getIsOnRandom = state => state.isOnRandom;
export const getActiveDeckId = state => state.activeDeckId;
export const getActiveUri = state => state.activeUri;
export const getIsInteractive = state => state.isInteractive;

export default reducer;
