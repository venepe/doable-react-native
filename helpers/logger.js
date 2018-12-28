import { LOGGER_URL } from '../config';

const interactiveSession = ({ audiocardId, deckId, response, isCorrect, uid }) => {
  const interactiveSession = { uid, audiocardId, deckId, response, isCorrect }
  fetch(`${LOGGER_URL}/interactive-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ interactiveSession }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };

const audioSession = ({ audiocardId, deckId, uid }) => {
  const audioSession = { uid, audiocardId, deckId }
  fetch(`${LOGGER_URL}/audio-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audioSession }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };

  export default {
    interactiveSession,
    audioSession,
  };
