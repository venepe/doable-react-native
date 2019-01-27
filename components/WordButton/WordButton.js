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
          isActive: nextProps.isActive,
        }
      }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      isActive: props.isActive,
      word: props.word,
      index: props.index,
      backgroundColor: props.backgroundColor,
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
    let { isActive, word, index } = this.state;
    isActive = !isActive;
    this.setState({
      isActive,
    });
    this.props.onPress({ word, index, isActive });
  }

  render() {
    let backgroundColor = this.state.isActive ? this.props.backgroundColor : '#FFFF00';
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
