import gql from 'graphql-tag';

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
