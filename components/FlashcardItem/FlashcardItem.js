import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { deleteFlashcard } from '../../actions';
import styles from './styles';

class FlashcardItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    flashcard: PropTypes.shape({
      title: PropTypes.string,
    }),
    onPress: PropTypes.func,
    deleteFlashcard: PropTypes.func,
  }

  static defaultProps = {
    rowID: 0,
    flashcard: {},
    onPress: () => {},
    deleteFlashcard: () => {},
  }

  constructor(props) {
    super(props);

    this.deleteFlashcard = this.deleteFlashcard.bind(this);

    this.state = {
      rowID: props.rowID,
      flashcard: props.flashcard,
    };
  }


  deleteFlashcard() {
    console.log('deleteFlashcard');
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
      { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF1744', onPress: this.deleteFlashcard },
    ];

    const flashcard = this.state.flashcard || {};

    return (
      <Swipeout right={right} autoClose>
        <TouchableOpacity onPress={() => this.props.onPress(this.state.rowID)}>
          <View style={[styles.card, styles.container]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title, { color }]}>{flashcard.title}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  null,
  { deleteFlashcard },
)(FlashcardItem);
