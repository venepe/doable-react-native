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
  query allDecks($first: Int, $after: Cursor) {
    allDecks(first: $first, after: $after) {
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

export const SEARCH_DECKS = gql`
query searchDecks($search: String, $first: Int, $after: Cursor) {
  searchDecks(search: $search, first: $first, after: $after) {
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
