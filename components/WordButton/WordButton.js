import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

class WordButton extends Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      isActive: false,
      word: props.word,
    }
  }

  onPress() {
    const { isActive, word } = this.state;
    this.setState({
      isActive: !isActive,
    });
    this.props.onPress({ word });
  }

  render() {
    let backgroundColor = this.state.isActive ? '#00B0FF' : '#FFFF00';
    return (
      <TouchableOpacity style={{backgroundColor, margin: 5}} onPress={() => this.onPress()}>
        <Text style={styles.text}>{this.state.word}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#212121',
    fontSize: 28,
    fontWeight: '400',
    padding: 5,
    // fontFamily: 'Roboto-Thin',
  },
});

WordButton.defaultProps = {
  word: '',
  onPress: () => {},
};

WordButton.propTypes = {
}

export default WordButton;
