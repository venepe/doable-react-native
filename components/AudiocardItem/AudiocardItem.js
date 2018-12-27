import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import styles from './styles';

class AudiocardItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    onPress: PropTypes.func,
    deleteAudiocard: PropTypes.func,
  }

  static defaultProps = {
    rowID: 0,
    onPress: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      rowID: props.rowID,
      audiocardItem: props.audiocardItem,
    };
  }

  render() {
    let color = '#FF8A80';

    const audiocardItem = this.state.audiocardItem || {};

    return (
        <TouchableOpacity onPress={() => this.props.onPress({ id: audiocardItem.id })}>
          <View style={[styles.card, styles.container]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title, { color }]}>{audiocardItem.questionText}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}

AudiocardItem.fragments = {
  audiocardItem: gql`
    fragment AudiocardItem on Audiocard {
      nodeId
      id
      questionText
      questionAudioUri
      answerText
      answerAudioUri
      createdAt
    }
  `,
};

AudiocardItem.propTypes = {
  audiocardItem: propType(AudiocardItem.fragments.audiocardItem).isRequired,
};

export default AudiocardItem;
