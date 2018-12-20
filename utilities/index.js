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
