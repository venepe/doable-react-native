import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

class WordButton extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          word: nextProps.word,
          index: nextProps.index,
        }
      }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      isActive: false,
      word: props.word,
      index: props.index,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.word !== prevProps.word) {
      this.setState({
        word: props.word,
      });
    }
    if (props.index !== prevProps.index) {
      this.setState({
        index: props.index,
      });
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
  index: -1,
  word: '',
  onPress: () => {},
};

WordButton.propTypes = {
}

export default WordButton;
