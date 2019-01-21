import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

class CreateCardWordButton extends Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      isActive: false,
      word: props.word,
    }
  }

  onPress() {
    let isActive = this.state.isActive;
    this.setState({
      isActive: !isActive,
    });
    this.props.onPress();
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

CreateCardWordButton.defaultProps = {
  word: '',
};

CreateCardWordButton.propTypes = {
}

export default CreateCardWordButton;
