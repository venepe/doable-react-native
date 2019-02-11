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

export const getThreeRandomIndexes = (length) => {
  const defaultLength = 3;
  var randomIndexes = [];
  length = length < defaultLength + 1 ? defaultLength + 1 : length;
  while(randomIndexes.length < defaultLength) {
    let randomInt = getRandomInt(length);
    if(randomIndexes.indexOf(randomInt) === -1 && randomInt > -1) {
      randomIndexes.push(randomInt);
    }
  }
  return randomIndexes;
}


export function randomString(length) {
  let result = uuid.v4();
    return result;
}


// @param
// [
//   documentIndexKey,
//   word
// ]

export function getDisplayText(textMap) {
  let displayText = '';
  textMap.map(({ word }) => {
    displayText = `${displayText} ${word}`;
  });
  return displayText;
}
