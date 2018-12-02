import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Navigator,
  Text,
  View,
} from 'react-native';

import styles from './styles';

export default class Placeholder extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

Placeholder.defaultProps = {
  text: '',
};

Placeholder.propTypes = {
  text: PropTypes.string,
}
