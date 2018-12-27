import { Permissions } from "expo";
import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';
import { getRandomInt, getAffirmativeAudio, getNegativeAudio } from '../utilities';
import { track } from '../helpers/analytics';
import Player from '../helpers/player';
import Voice from 'react-native-voice';

export const playAudiocard = payload => (dispatch) => {
  let { payload: { audiocard } } = payload;

  track('Play Audiocard', {});

  dispatch(setActiveUri({ payload: { activeUri: audiocard.questionAudioUri } }));
  dispatch(setActiveAudiocard({ payload: { activeAudiocard: audiocard } }));
  dispatch(startPlayback({ payload: { uri: audiocard.questionAudioUri } }));
};

export const startPlayback = payload => (dispatch, getState) => {
  let { payload: { uri, title } } = payload;
  let { isInteractive, activeUri, activeAudiocard } = getState();

  isInteractive = true;
  dispatch(startPlayer());
  Player.play({ uri, title }, 0, () => {
    if (isInteractive && activeUri === activeAudiocard.questionAudioUri) {
      dispatch(startListening());
    } else {
      dispatch(startAudioSilence());
    }
  });

  };

export const onSpeechResults = payload => (dispatch, getState) => {
  let { activeAudiocard: { answerText } } = getState();
  let { payload: { speechResults } } = payload;
  let uri = '';
  let isCorrect = speechResults.value.find((result) => result.toLowerCase() === answerText.toLowerCase());
  if (isCorrect) {
    uri = getAffirmativeAudio();
  } else {
    uri = getNegativeAudio();
  }
  Player.play({ uri }, 0, () => {
    dispatch(nextAudioUri());
  });
};

export const startListening = payload => (dispatch) => {
  Permissions.askAsync(Permissions.AUDIO_RECORDING).then(() => {
    Voice.start('en-US');
  });
};

export const startAudioSilence = () => (dispatch, getState) => {
  let { activeUri, activeAudiocard } = getState();
  let uri = '';
  if (activeUri === activeAudiocard.questionAudioUri) {
    uri = 'two_seconds_of_silence.mp3';
  } else {
    uri = 'five_hundred_milliseconds_of_silence.mp3';
  }

  Player.play({ uri, isLocal: true}, 0, () => {
    dispatch(nextAudioUri());
  });
}

export const nextAudioUri = () => (dispatch, getState) => {
    let { activeUri, audiocards, activeAudiocard, isOnRepeat, isOnRandom } = getState();
    if (activeUri === activeAudiocard.questionAudioUri) {
      console.log('finished question, play answer');
      activeUri = activeAudiocard.answerAudioUri;
      dispatch(setActiveUri({ payload: { activeUri } }));
      dispatch(startPlayback({ payload: { uri: activeUri, title: activeAudiocard.answerText } }));
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
          dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri, title: nextAudiocard.questionText } }));
        });

      } else if (nextIndex < length ) {
        const nextAudiocard = audiocards[nextIndex];
        dispatch(setActiveUri({ payload: { activeUri: nextAudiocard.questionAudioUri } }));
        dispatch(setActiveAudiocard({ payload: { activeAudiocard: nextAudiocard } }));
        dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri, title: nextAudiocard.questionText } }));
      } else if (isOnRepeat === true) {
        const nextAudiocard = audiocards[0];
        dispatch(setActiveUri({ payload: { activeUri: nextAudiocard.questionAudioUri } }));
        dispatch(setActiveAudiocard({ payload: { activeAudiocard: nextAudiocard } }));
        dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri, title: nextAudiocard.questionText } }));
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
  Player.stop();
  dispatch(stopPlayer());
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
