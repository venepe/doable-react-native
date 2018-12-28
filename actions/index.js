import { Permissions } from "expo";
import Voice from 'react-native-voice';
import AudioTypes from '../constants/AudioTypes';
import DeckTypes from '../constants/DeckTypes';
import UserTypes from '../constants/UserTypes';
import VoiceTypes from '../constants/VoiceTypes';
import { getRandomInt, getAffirmativeAudio, getNegativeAudio } from '../utilities';
import { track } from '../helpers/analytics';
import { getUID } from '../helpers/user';
import Player from '../helpers/player';
import { cancelVoice } from '../helpers/voice';
import Logger from '../helpers/logger';

export const playAudiocard = payload => (dispatch) => {
  let { payload: { audiocard } } = payload;

  track('Play Audiocard', {});

  dispatch(setActiveAudiocardAndUri({ payload: { activeAudiocard: audiocard,
    activeUri: audiocard.questionAudioUri } }));
  dispatch(startPlayback({ payload: { uri: audiocard.questionAudioUri } }));
};

export const startPlayback = payload => (dispatch, getState) => {
  let { payload: { uri, title } } = payload;
  let { isInteractive, activeUri, activeAudiocard } = getState();

  dispatch(startPlayer());
  Player.play({ uri, title }, 0, () => {
    if (isInteractive == true && activeUri === activeAudiocard.questionAudioUri) {
      dispatch(startListening());
    } else {
      dispatch(startAudioSilence());
    }
  });

  };

export const onSpeechResults = payload => (dispatch, getState) => {
  let { activeDeckId, uid, activeAudiocard: { answerText, id } } = getState();
  console.log(uid);
  console.log('activeDeckId', activeDeckId);
  let { payload: { speechResults } } = payload;
  let uri = '';
  let isCorrect = speechResults.value.find((result) => result.toLowerCase() === answerText.toLowerCase());
  isCorrect = isCorrect ? true : false;
  Logger.interactiveSession({ audiocardId: id, deckId: activeDeckId, response: speechResults.value[0], isCorrect, uid })
  if (isCorrect) {
    uri = getAffirmativeAudio();
  } else {
    uri = getNegativeAudio();
  }
  Voice.destroy();
  Player.play({ uri : 'five_hundred_milliseconds_of_silence.mp3' , isLocal: true }, 0, () => {
    Player.play({ uri }, 0, () => {
      dispatch(nextAudioUri());
    });
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
    cancelVoice();
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
          dispatch(setActiveAudiocardAndUri({ payload: { activeAudiocard: nextAudiocard,
            activeUri: nextAudiocard.questionAudioUri } }));
          dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri, title: nextAudiocard.questionText } }));
        });

      } else if (nextIndex < length ) {
        const nextAudiocard = audiocards[nextIndex];
        dispatch(setActiveAudiocardAndUri({ payload: { activeAudiocard: nextAudiocard,
          activeUri: nextAudiocard.questionAudioUri } }));
        dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri, title: nextAudiocard.questionText } }));
      } else if (isOnRepeat === true) {
        const nextAudiocard = audiocards[0];
        dispatch(setActiveAudiocardAndUri({ payload: { activeAudiocard: nextAudiocard,
          activeUri: nextAudiocard.questionAudioUri } }));
        dispatch(startPlayback({ payload: { uri: nextAudiocard.questionAudioUri, title: nextAudiocard.questionText } }));
      } else {
        dispatch(stopPlayer());
      }
    }
  };

export const previousAudioUri = () => (dispatch, getState) => {
    let { activeUri, audiocards, activeAudiocard } = getState();
    cancelVoice();
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
        dispatch(setActiveAudiocardAndUri({ payload: { activeAudiocard: previousAudiocard,
          activeUri: previousAudiocard.questionAudioUri } }));
        dispatch(startPlayback({ payload: { uri: previousAudiocard.questionAudioUri } }));
      } else {
        dispatch(stopPlayer());
      }
    }
  };

export const stopPlayBack = () => (dispatch) => {
  Player.stop();
  cancelVoice();
  dispatch(stopPlayer());
  };

export const generateUID = () => (dispatch) => {
  getUID().then((uid) => {
    console.log('uid', uid);
    dispatch(setUID({ payload: { uid } }));
  })
};

export const setActiveAudiocard = payload => ({
  type: AudioTypes.SET_ACTIVE_AUDIOCARD,
  ...payload,
});

export const setActiveAudiocardAndUri = payload => ({
  type: AudioTypes.SET_ACTIVE_AUDIOCARD_AND_URI,
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

export const setIsInteractive = payload => ({
  type: VoiceTypes.SET_IS_INTERACTIVE,
  ...payload,
});

export const setUID = payload => ({
  type: UserTypes.SET_UID,
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
  setIsInteractive,
  setUID,
};

export default actions;
