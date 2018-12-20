import { Audio, Constants, FileSystem, Permissions } from 'expo';
import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';
import { getRandomInt } from '../utilities';
let soundObject = new Audio.Sound();


export const playAudiocard = payload => (dispatch) => {
  let { payload: { audiocard } } = payload;
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
            dispatch(nextAudioUri());
          })
      }
    });
  };

export const nextAudioUri = () => (dispatch, getState) => {
    let { activeUri, audiocards, activeAudiocard, isOnRepeat, isOnRandom } = getState();
    if (activeUri === activeAudiocard.questionAudioUri) {
      console.log('finished question, play answer');
      activeUri = activeAudiocard.answerAudioUri;
      dispatch(setActiveUri({ payload: { activeUri } }));
      setTimeout(() => {
        dispatch(startPlayback({ payload: { uri: activeUri } }));
      }, 2200);
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
          setTimeout(() => {
            dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri } }));
          }, 500);
        });

      } else if (nextIndex < length ) {
        const nextAudiocard = audiocards[nextIndex];
        dispatch(setActiveUri({ payload: { activeUri: nextAudiocard.questionAudioUri } }));
        dispatch(setActiveAudiocard({ payload: { activeAudiocard: nextAudiocard } }));
        setTimeout(() => {
          dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri } }));
        }, 500);
      } else if (isOnRepeat === true) {
        const nextAudiocard = audiocards[0];
        dispatch(setActiveUri({ payload: { activeUri: nextAudiocard.questionAudioUri } }));
        dispatch(setActiveAudiocard({ payload: { activeAudiocard: nextAudiocard } }));
        setTimeout(() => {
          dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri } }));
        }, 500);
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
