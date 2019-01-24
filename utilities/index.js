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

export const getRandomInt = (length, callback) => {
  const randomInt = Math.floor(Math.random() * length);
  return randomInt;
}

export function randomString(length) {
  let result = uuid.v4();
    return result;
}
