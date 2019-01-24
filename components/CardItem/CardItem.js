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

class CardItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    onPress: PropTypes.func,
    onDelete: PropTypes.func,
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
      cardItem: props.cardItem,
    };
  }

  render() {
    let color = '#FF8A80';

    const cardItem = this.state.cardItem || {};
    const opacity = 1.0;

    const right = [
      { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF1744', onPress: () => this.props.onDelete(cardItem) },
    ];

    return (
      <Swipeout right={right} autoClose>
        <TouchableOpacity onPress={() => this.props.onPress(cardItem)}>
          <View style={[styles.card, styles.container, { opacity }]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title, { color }]}>{cardItem.frontText}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

CardItem.fragments = {
  cardItem: gql`
    fragment CardItem on Card {
      nodeId
      id
      frontText
      backText
      createdAt
    }
  `,
};

CardItem.propTypes = {
  cardItem: propType(CardItem.fragments.cardItem).isRequired,
};

export default CardItem;
