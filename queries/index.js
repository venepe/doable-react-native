import gql from 'graphql-tag';
import CardItem from '../components/CardItem';
import DeckItem from '../components/DeckItem';

export const ALL_CARDS = gql`
  query {
    allCards {
      edges {
          node {
            nodeId
            ...CardItem
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
    }
  }
  ${CardItem.fragments.cardItem}
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

export const CARDS_BY_DECK_NODEID = gql`
  query deckById($id: Int!) {
    deckById(id: $id) {
      cardsByDeckId {
        edges {
          node {
            ...CardItem
          }
        }
      }
    }
  }
  ${CardItem.fragments.cardItem}
`
