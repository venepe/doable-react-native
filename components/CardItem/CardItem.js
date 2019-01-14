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

class CardItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    onPress: PropTypes.func,
    deleteCard: PropTypes.func,
  }

  static defaultProps = {
    rowID: 0,
    onPress: () => {},
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

    return (
        <TouchableOpacity onPress={() => this.props.onPress({ id: cardItem.id })}>
          <View style={[styles.card, styles.container, { opacity }]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title, { color }]}>{cardItem.frontText}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
