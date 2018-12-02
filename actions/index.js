import { Audio, Constants, FileSystem, Permissions } from 'expo';
import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';
let soundObject = new Audio.Sound();
let recordingObject;

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
        dispatch(stopPlayer());
      }
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
      dispatch(stopPlayer());
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
        // console.log(recordingStatusObject);
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
      return FileSystem.getInfoAsync(recordingObject.getURI())
    })
    .then(info => {
      console.log(`FILE INFO: ${JSON.stringify(info)}`);
      const activeAudioRecord = { uri: info.uri }
      dispatch(setActiveRecord({ payload: { activeAudioRecord } } ));
    })
    .catch(error => {
      console.log(error);
    })
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

export const deleteDeck = payload => ({
  type: DeckTypes.DELETE_DECK,
  ...payload,
});

const actions = {
  startPlayback,
  stopPlayBack,
  stopPlaybackAndBeginRecording,
  stopRecordingAndEnablePlayback,
  startPlayer,
  stopPlayer,
  deleteDeck,
};

export default actions;
