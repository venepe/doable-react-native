import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import Swipeout from 'react-native-swipeout';
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
    deleteAudiocard: () => {},
  }

  constructor(props) {
    super(props);

    this.deleteAudiocard = this.deleteAudiocard.bind(this);

    this.state = {
      rowID: props.rowID,
      audiocardItem: props.audiocardItem,
    };
  }


  deleteAudiocard() {
    console.log('deleteAudiocard');
  }

  render() {
    let color;
    const rowIDPlus7 = this.state.rowID + 7;
    const remainder = rowIDPlus7 % 7;
    if (remainder === 0) {
      color = '#FF8A80';
    } else if (remainder === 1) {
      color = '#FFD180';
    } else if (remainder === 2) {
      color = '#FFFF8D';
    } else if (remainder === 3) {
      color = '#B9F6CA';
    } else if (remainder === 4) {
      color = '#80D8FF';
    } else if (remainder === 5) {
      color = '#8C9EFF';
    } else if (remainder === 6) {
      color = '#B388FF';
    }

    const right = [
      { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF1744', onPress: this.deleteAudiocard },
    ];

    const audiocardItem = this.state.audiocardItem || {};

    return (
      <Swipeout right={right} autoClose>
        <TouchableOpacity onPress={() => this.props.onPress(this.state.rowID)}>
          <View style={[styles.card, styles.container]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title, { color }]}>{audiocardItem.questionText}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
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
