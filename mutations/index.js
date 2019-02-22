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
        createdAt
      }
    }
  }
`

export const UPDATE_DECK = gql`
  mutation UpdateDeck($input: UpdateDeckByIdInput!) {
    updateDeckById(input: $input) {
      deck {
        nodeId
        title
        description
        createdAt
      }
    }
  }
`

export const ARCHIVE_DECK = gql`
  mutation ArchiveDeck($input: UpdateDeckByIdInput!) {
    updateDeckById(input: $input) {
      deck {
        nodeId
        id
        title
        description
        createdAt
      }
    }
  }
`

export const CREATE_CARD = gql`
  mutation CreateCard($input: CreateCardInput!) {
    createCard(input: $input) {
      card {
        nodeId
        id
        frontText
        backText
        createdAt
      }
    }
  }
`

export const ARCHIVE_CARD = gql`
  mutation ArchiveCard($input: UpdateCardByIdInput!) {
    updateCardById(input: $input) {
      card {
        nodeId
        id
        frontText
        backText
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
      }
    }
  }
`
