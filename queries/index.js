import gql from 'graphql-tag';
import CardItem from '../components/CardItem';
import DeckItem from '../components/DeckItem';
import DocumentItem from '../components/DocumentItem';

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

export const DECKS_BY_USER_UID = gql`
  query userByUid($uid: String!) {
    userByUid(uid: $uid) {
      decksByUserUid(orderBy: PRIMARY_KEY_DESC) {
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
  }
  ${DeckItem.fragments.deckItem}
`

export const CARDS_BY_DECK_NODEID = gql`
  query deckById($id: Int!) {
    deckById(id: $id) {
      cardsByDeckId(orderBy: PRIMARY_KEY_DESC) {
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

export const DOCUMENT_BY_CARD_NODEID = gql`
  query deckById($id: Int!) {
    deckById(id: $id) {
      documentsByDeckId(orderBy: PRIMARY_KEY_DESC) {
        edges {
          node {
            ...DocumentItem
          }
        }
      }
    }
  }
  ${DocumentItem.fragments.documentItem}
`

export const DOCUMENT_BY_ID = gql`
  query documentById($id: Int!) {
    documentById(id: $id) {
      nodeId
      id
      imageUri
      text
      createdAt
    }
  }
`
