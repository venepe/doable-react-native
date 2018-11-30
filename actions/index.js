import { Audio, Constants, FileSystem, Permissions } from 'expo';
import AudioTypes from '../constants/AudioTypes';
let soundObject = new Audio.Sound();
let recordingObject;
let testUri;
soundObject.setOnPlaybackStatusUpdate(playbackObject => {
  console.log(playbackObject);
});

export const startPlayback = payload => (dispatch) => {
  console.log(payload);
  let { payload: { uri } } = payload;
  console.log(uri);
  soundObject.loadAsync({ uri })
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

export const stopPlaybackAndBeginRecording = () => (dispatch) => {
  soundObject.unloadAsync()
    .then(() => {
      return Permissions.askAsync(Permissions.AUDIO_RECORDING);
    })
    .then(() => {
      return Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
      });
    })
    .then(() => {
      return new Audio.Recording();
    })
    .then(recording => {
      recordingObject = recording;
      return recordingObject.prepareToRecordAsync(JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)));
    })
    .then(() => {
      recordingObject.setOnRecordingStatusUpdate(recordingStatusObject => {
        console.log(recordingStatusObject);
      });
      return recordingObject.startAsync();
    })
    .then(() => {
      console.log('recording');
    })
    .catch(error => {
      console.log(error);
    });
  };

export const stopRecordingAndEnablePlayback = () => (dispatch) => {
  recordingObject.stopAndUnloadAsync()
    .then(() => {
      return FileSystem.getInfoAsync(recordingObject.getURI())
    })
    .then(info => {
      console.log(`FILE INFO: ${JSON.stringify(info)}`);
      testUri = info.uri;
    })
    .then(() => {
      return Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        playsInSilentModeIOS: true,
        playsInSilentLockedModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
      });
    })
    .then(() => {
      console.log(startPlayback);
      dispatch(startPlayback({ payload: { uri: testUri } } ));
    })
    .catch(error => {
      console.log(error);
    })
};


const actions = {
  startPlayback,
  stopPlayBack,
  stopPlaybackAndBeginRecording,
  stopRecordingAndEnablePlayback,
};

export default actions;
