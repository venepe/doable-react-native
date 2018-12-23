import MusicControl from 'react-native-music-control';
import RNSound from 'react-native-sound';

let sound = {
  play: () => {},
  pause: () => {},
  stop: () => {},
};

const play = ({ uri, title, albumName = '', isLocal = false }, elapsedTime = 0, done) => {
  console.log(uri);
  let path = isLocal === true ? RNSound.MAIN_BUNDLE : '';
  MusicControl.setNowPlaying({
    state: MusicControl.STATE_PLAYING,
    title: title,
    album: albumName,
  });
  sound.stop();
  sound = new RNSound(uri, path, (error) => {
    if (error) {
      console.error('failed to load the sound', error);
      return;
    }

    // Play the sound with an onEnd callback
    sound.play((success) => {
      if (success) {
        done();
      } else {
        console.error('playback failed due to audio decoding errors');
      }
    });
  });
};

const stop = () => {
  MusicControl.updatePlayback({
    state: MusicControl.STATE_STOPPED,
    elapsedTime: 0,
  });
  sound.stop();
};

const pause = (elapsedTime) => {
  // MusicControl.updatePlayback({
  //   state: MusicControl.STATE_PAUSED,
  //   elapsedTime,
  // });
  sound.pause();
};

const resume = (elapsedTime, done) => {
  // MusicControl.updatePlayback({
  //   state: MusicControl.STATE_PLAYING,
  //   elapsedTime,
  // });
  sound.play((success) => {
    if (success) {
      done();
    } else {
      console.error('playback failed due to audio decoding errors');
    }
  });
};

export default {
  play,
  stop,
  pause,
  resume,
};
