import Voice from 'react-native-voice';

export const cancelVoice = () => {
  if (Voice.isRecognizing()) {
    Voice.cancel();
  }
}
