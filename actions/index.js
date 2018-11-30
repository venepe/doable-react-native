import { Audio, Constants, Permissions } from 'expo';
import AudioTypes from '../constants/AudioTypes';
const soundObject = new Audio.Sound();
soundObject.setOnPlaybackStatusUpdate(playbackObject => {
  console.log(playbackObject);
});

export const startPlayback = payload => (dispatch) => {
  soundObject.loadAsync(require('../assets/free.mp3'))
    .then(() => {
      return soundObject.playAsync();
    })
    .then(() => {
      console.log('playing!');
    })
    .catch(error => {
      console.log(error);
    });
  };

export const nextSong = () => (dispatch, getState) => {
    // const { library, player } = getState();
    dispatch(playSong({ payload: { song } }));
  };

export const stopPlayBack = () => (dispatch) => {
  soundObject.stopAsync()
    .then(() => {
      return soundObject.unloadAsync();
    })
    .then(() => {
      console.log('stopped!');
    })
    .catch(error => {
      console.log(error);
    });
  };

const actions = {
  startPlayback,
  stopPlayBack,
};

export default actions;
