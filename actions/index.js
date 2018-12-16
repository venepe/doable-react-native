import { Audio, Constants, FileSystem, Permissions } from 'expo';
import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';
let soundObject = new Audio.Sound();

export const startPlayback = payload => (dispatch) => {
  let { payload: { uri } } = payload;
  soundObject.loadAsync({ uri })
    .then(() => {
      return soundObject.playAsync();
    })
    .then(() => {
      dispatch(startPlayer());
      console.log('playing!');
    })
    .catch(error => {
      console.log(error);
    });

    soundObject.setOnPlaybackStatusUpdate(playbackObject => {
      if (playbackObject.didJustFinish) {
        dispatch(stopPlayBack());
      }
    });
  };

export const nextSong = () => (dispatch, getState) => {
    dispatch(playSong({ payload: { song } }));
  };

export const stopPlayBack = () => (dispatch) => {
  soundObject.stopAsync()
    .then(() => {
      return soundObject.unloadAsync();
    })
    .then(() => {
      dispatch(stopPlayer());
      console.log('stopped!');
    })
    .catch(error => {
      console.log(error);
    });
  };

export const setActiveRecord = payload => ({
  type: AudioTypes.SET_ACTIVE_RECORD,
  ...payload,
});

export const startPlayer = () => ({
  type: AudioTypes.START_PLAYBACK,
  payload: { isPlaying: true },
});

export const stopPlayer = () => ({
  type: AudioTypes.STOP_PLAYBACK,
  payload: { isPlaying: false },
});

export const setActiveDeck = payload => ({
  type: DeckTypes.SET_ACTIVE_DECK,
  ...payload,
});

const actions = {
  startPlayback,
  stopPlayBack,
  startPlayer,
  stopPlayer,
  setActiveDeck,
};

export default actions;
