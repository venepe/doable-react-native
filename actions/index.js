import { Audio, Constants, FileSystem, Permissions } from 'expo';
import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';
import { getRandomInt } from '../utilities';
import { track } from '../utilities/analytics';
let soundObject = new Audio.Sound();


export const playAudiocard = payload => (dispatch) => {
  let { payload: { audiocard } } = payload;

  track('Play Audiocard', {});

  dispatch(setActiveUri({ payload: { activeUri: audiocard.questionAudioUri } }));
  dispatch(setActiveAudiocard({ payload: { activeAudiocard: audiocard } }));
  dispatch(startPlayback({ payload: { uri: audiocard.questionAudioUri } }));
};

const unLoadAudio = (() => {
  return new Promise((resolve) => {
    soundObject.stopAsync()
      .then(() => {
        return soundObject.unloadAsync();
      })
      .then(() => {
        resolve();
      })
      .catch(() => {
        resolve();
      })
  });
})

export const startPlayback = payload => (dispatch) => {
  let { payload: { uri } } = payload;
  unLoadAudio()
    .then(() => {
      return soundObject.loadAsync({ uri });
    })
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
        soundObject.unloadAsync()
          .then(() => {
            dispatch(startAudioSilence());
          });
      }
    });
  };

export const startAudioSilence = () => (dispatch, getState) => {
  let { activeUri, activeAudiocard } = getState();
  unLoadAudio()
    .then(() => {
      if (activeUri === activeAudiocard.questionAudioUri) {
        return soundObject.loadAsync(require('../assets/2-seconds-of-silence.mp3'));
      } else {
        return soundObject.loadAsync(require('../assets/500-milliseconds-of-silence.mp3'));
      }
    })
    .then(() => {
      return soundObject.playAsync();
    })
    .catch(error => {
      console.log(error);
    });

    soundObject.setOnPlaybackStatusUpdate(playbackObject => {
      if (playbackObject.didJustFinish) {
        soundObject.unloadAsync()
          .then(() => {
            dispatch(nextAudioUri());
          });
      }
    });
}

export const nextAudioUri = () => (dispatch, getState) => {
    let { activeUri, audiocards, activeAudiocard, isOnRepeat, isOnRandom } = getState();
    if (activeUri === activeAudiocard.questionAudioUri) {
      console.log('finished question, play answer');
      activeUri = activeAudiocard.answerAudioUri;
      dispatch(setActiveUri({ payload: { activeUri } }));
      dispatch(startPlayback({ payload: { uri: activeUri } }));
    } else {
      const length = audiocards.length;
      const currentId = activeAudiocard.id;
      const currentIndex = audiocards.findIndex(({ id }) => id === currentId);
      const nextIndex = currentIndex + 1;
      if (isOnRandom === true) {
        getRandomInt(currentIndex, length, (randomIndex) => {
          const nextAudiocard = audiocards[randomIndex];
          dispatch(setActiveUri({ payload: { activeUri: nextAudiocard.questionAudioUri } }));
          dispatch(setActiveAudiocard({ payload: { activeAudiocard: nextAudiocard } }));
          dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri } }));
        });

      } else if (nextIndex < length ) {
        const nextAudiocard = audiocards[nextIndex];
        dispatch(setActiveUri({ payload: { activeUri: nextAudiocard.questionAudioUri } }));
        dispatch(setActiveAudiocard({ payload: { activeAudiocard: nextAudiocard } }));
        dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri } }));
      } else if (isOnRepeat === true) {
        const nextAudiocard = audiocards[0];
        dispatch(setActiveUri({ payload: { activeUri: nextAudiocard.questionAudioUri } }));
        dispatch(setActiveAudiocard({ payload: { activeAudiocard: nextAudiocard } }));
        dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri } }));
      } else {
        dispatch(stopPlayer());
      }
    }
  };

export const previousAudioUri = () => (dispatch, getState) => {
    let { activeUri, audiocards, activeAudiocard } = getState();
    if (activeUri === activeAudiocard.answerAudioUri) {
      console.log('on answer, play question');
      activeUri = activeAudiocard.questionAudioUri;
      dispatch(setActiveUri({ payload: { activeUri } }));
      dispatch(startPlayback({ payload: { uri: activeUri } }));
    } else {
      const length = audiocards.length;
      const currentId = activeAudiocard.id;
      const currentIndex = audiocards.findIndex(({ id }) => id === currentId);
      const previousIndex = currentIndex - 1;
      if (previousIndex > -1) {
        const previousAudiocard = audiocards[previousIndex];
        dispatch(setActiveUri({ payload: { activeUri: previousAudiocard.questionAudioUri } }));
        dispatch(setActiveAudiocard({ payload: { activeAudiocard: previousAudiocard } }));
        dispatch(startPlayback({ payload: { uri: previousAudiocard.questionAudioUri } }));
      } else {
        dispatch(stopPlayer());
      }
    }
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

export const setActiveAudiocard = payload => ({
  type: AudioTypes.SET_ACTIVE_AUDIOCARD,
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

export const setActiveDeckId = payload => ({
  type: DeckTypes.SET_ACTIVE_DECK_ID,
  ...payload,
});

export const setAudioCards = payload => ({
  type: AudioTypes.SET_AUDIOCARDS,
  ...payload,
});

export const setActiveUri = payload => ({
  type: AudioTypes.SET_ACTIVE_URI,
  ...payload,
});

export const setIsOnRepeat = payload => ({
  type: AudioTypes.SET_IS_ON_REPEAT,
  ...payload,
});

export const setIsOnRandom = payload => ({
  type: AudioTypes.SET_IS_ON_RANDOM,
  ...payload,
});

const actions = {
  startPlayback,
  stopPlayBack,
  startPlayer,
  stopPlayer,
  setActiveDeckId,
  setAudioCards,
  setIsOnRepeat,
  setIsOnRandom,
};

export default actions;
