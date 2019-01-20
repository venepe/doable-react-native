import { Platform } from 'react-native';
import uuid from 'react-native-uuid';

export const getCardsForDeck = (deck) => {
  return deck.deckCardsByDeckId.edges.map(({ node: { cardByCardId } }) => {
    return {
      ...cardByCardId
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

export function randomString(length) {
  let result = uuid.v4();
    return result;
}
