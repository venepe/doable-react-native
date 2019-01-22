import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import styles from './styles';

class DeckItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    rowID: 0,
    onPress: () => {},
    onDelete: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      rowID: props.rowID,
      deckItem: props.deckItem,
    };
  }

  render() {
    let color = '#FF8A80';
    const right = [
      { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF1744', onPress: () => this.props.onDelete(deckItem) },
    ];
    const deckItem = this.state.deckItem || {};

    return (
      <Swipeout right={right} autoClose>
        <TouchableOpacity onPress={() => this.props.onPress(deckItem)}>
          <View style={[styles.card, styles.container]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title, { color }]}>{deckItem.title}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

DeckItem.fragments = {
  deckItem: gql`
    fragment DeckItem on Deck {
      nodeId
      id
      title
      description
      createdAt
    }
  `,
};

DeckItem.propTypes = {
  deckItem: propType(DeckItem.fragments.deckItem).isRequired,
};

export default DeckItem;
