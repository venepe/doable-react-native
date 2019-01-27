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
  return Platform.OS === 'ios' ? '#FFFFFF' : '#FFFFFF';
}

export const getRandomInt = (length) => {
  const randomInt = Math.floor(Math.random() * length);
  return randomInt;
}

export const getRandomIndex = (currentIndex, length) => {
  let randomInt = getRandomInt(length);
  if (randomInt === currentIndex) {
    randomInt = randomInt - 1;
    if (randomInt < 0) {
      randomInt = length - 1;
    }
  }
  return randomInt;
}


export function randomString(length) {
  let result = uuid.v4();
    return result;
}
