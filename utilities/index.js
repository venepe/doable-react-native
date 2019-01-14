import { Platform } from 'react-native';

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

export const getAffirmativeAudio = () => {
  const responses = [
    'https://storage.googleapis.com/doable-audio/e0b2d000-0966-11e9-bc71-8d44dbfcc8db.mp3',
    'https://storage.googleapis.com/doable-audio/e0b2f710-0966-11e9-bc71-8d44dbfcc8db.mp3',
  ];
  const randomInt = Math.floor(Math.random() * responses.length);
  return responses[randomInt];
}

export const getNegativeAudio = () => {
  const responses = [
    'https://storage.googleapis.com/doable-audio/30b7e3b0-0967-11e9-bc71-8d44dbfcc8db.mp3',
    'https://storage.googleapis.com/doable-audio/30c948d0-0967-11e9-bc71-8d44dbfcc8db.mp3',
  ];
  const randomInt = Math.floor(Math.random() * responses.length);
  return responses[randomInt];
}
