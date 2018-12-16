import gql from 'graphql-tag';
import AudiocardItem from '../components/AudiocardItem';
import DeckItem from '../components/DeckItem';

export const ALL_AUDIOCARDS = gql`
  query {
    allAudiocards {
      edges {
          node {
            nodeId
            ...AudiocardItem
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
    }
  }
  ${AudiocardItem.fragments.audiocardItem}
`

export const ALL_DECKS = gql`
  query {
    allDecks {
      edges {
          node {
            nodeId
            ...DeckItem
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
    }
  }
  ${DeckItem.fragments.deckItem}
`

export const AUDIOCARDS_BY_DECK_NODEID = gql`
  query deckById($id: Int!) {
    deckById(id: $id) {
      deckAudiocardsByDeckId {
        edges {
          node {
            audiocardByAudiocardId {
              nodeId
              ...AudiocardItem
            }
          }
        }
      }
    }
  }
  ${AudiocardItem.fragments.audiocardItem}
`
