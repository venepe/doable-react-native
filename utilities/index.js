import { Platform } from 'react-native';

export const getAudiocardsForDeck = (deck) => {
  return deck.deckAudiocardsByDeckId.edges.map(({ node: { audiocardByAudiocardId } }) => {
    return {
      ...audiocardByAudiocardId
    };
  })
}

export const getHeaderButtonColor = () => {
  return Platform.OS === 'ios' ? '#FFFFFF' : 'transparent';
}

export const getRandomInt = (currentInt, length, callback) => {
  const randomInt = Math.floor(Math.random() * length);
  if (randomInt === currentInt) {
    getRandomInt(currentInt, length, callback);
  } else {
    callback(randomInt)
  }
}
