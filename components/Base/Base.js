import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Voice from 'react-native-voice';
import { connect } from 'react-redux';
import App from '../App';
import { onSpeechResults } from '../../actions';

class Base extends Component {

  constructor(props) {
    super(props);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }

  onSpeechResultsHandler(speechResults) {
    this.props.onSpeechResults({ payload: { speechResults } })
  }

  render() {
    return (
      <App />
    )
  }
}

export default connect(
  null,
  { onSpeechResults },
)(Base);
