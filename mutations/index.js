import gql from 'graphql-tag';

export const ALL_AUDIOCARDS = gql`
  query {
    allAudiocards {
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
