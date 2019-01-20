import gql from 'graphql-tag';
import DeckItem from '../components/DeckItem';

export const CREATE_DECK = gql`
  mutation CreateDeck($input: CreateDeckInput!) {
    createDeck(input: $input) {
      deck {
        nodeId
        id
        title
        description
      }
    }
  }
`

export const LOGON_USER = gql`
  mutation($input:LogonUserInput!) {
    logonUser(input:$input) {
      user {
        id
        uid
        email
        decksByUserId(first: 25) {
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
  }
  ${DeckItem.fragments.deckItem}
`
