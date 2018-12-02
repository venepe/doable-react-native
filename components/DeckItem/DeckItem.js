import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { deleteDeck } from '../../actions';
import styles from './styles';

class DeckItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    deck: PropTypes.shape({
      title: PropTypes.string,
    }),
    onPress: PropTypes.func,
    deleteDeck: PropTypes.func,
  }

  static defaultProps = {
    rowID: 0,
    deck: {},
    onPress: () => {},
    deleteDeck: () => {},
  }

  constructor(props) {
    super(props);

    this.deleteDeck = this.deleteDeck.bind(this);

    this.state = {
      rowID: props.rowID,
      deck: props.deck,
    };
  }


  deleteDeck() {
    console.log('deleteDeck');
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
      { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF1744', onPress: this.deleteDeck },
    ];

    const deck = this.state.deck || {};

    return (
      <Swipeout right={right} autoClose>
        <TouchableOpacity onPress={() => this.props.onPress(this.state.rowID)}>
          <View style={[styles.card, styles.container]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title, { color }]}>{deck.title}</Text>
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
  { deleteDeck },
)(DeckItem);
