import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';

const initialState = {
  activeAudiocard: {},
  activeUri: '',
  isPlaying: false,
  activeDeckId: '',
  audiocards: [],
  isOnRepeat: false,
  isOnRandom: false,
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

export default reducer;
