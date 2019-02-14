import gql from 'graphql-tag';
import CardItem from '../components/CardItem';
import DeckItem from '../components/DeckItem';
import DocumentItem from '../components/DocumentItem';

export const DECKS_BY_USER_UID = gql`
  query userByUid($uid: String!, $first: Int, $after: Cursor) {
    userByUid(uid: $uid) {
      decksByUserUid(first: $first, after: $after, orderBy: PRIMARY_KEY_DESC) {
        edges {
            node {
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
      imageUri
      text
      createdAt
    }
  }
`

export const DECK_BY_ID = gql`
  query deckById($id: Int!) {
    deckById(id: $id) {
      nodeId
      title
      description
      createdAt
    }
  }
`
