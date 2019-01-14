import gql from 'graphql-tag';

export const ALL_CARDS = gql`
  query {
    allCards {
      nodes {
        nodeId
        id
        questionText
        questionAudioUri
        answerText
        answerAudioUri
        createdAt
      }
    }
  }
`
