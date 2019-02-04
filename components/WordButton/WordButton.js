import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { EDITING } from '../../constants/Enums';
import { getCardEditingStatus, getFrontTextIndexes, getBackTextIndexes } from '../../reducers';
import {
  addFrontTextWord,
  addBackTextWord,
  removeFrontTextWordAtIndex,
  removeBackTextWordAtIndex,
  } from '../../actions';

let BACKGROUND_COLOR = {
  FRONT_TEXT: '#00B0FF',
  BACK_TEXT: '#FF8A80',
};

function findIndex(textIndexes, index) {
  return textIndexes.findIndex((elm) => {
    return elm === index;
  });
}

class WordButton extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          word: nextProps.word,
          index: nextProps.index,
          cardEditingStatus: nextProps.cardEditingStatus,
        }
      }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      isActive: false,
      word: props.word,
      index: props.index,
      cardEditingStatus: props.cardEditingStatus,
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
    if (props.cardEditingStatus !== prevProps.cardEditingStatus) {
      const { index } = this.state;
      const { cardEditingStatus } = props;
      let activeIndexes = [];
      if (cardEditingStatus === EDITING.FRONT_TEXT) {
        activeIndexes = props.frontTextIndexes;
      } else {
        activeIndexes = props.backTextIndexes;
      }
      let isActive = findIndex(activeIndexes, index) !== -1;
      this.setState({
        cardEditingStatus,
        isActive,
      });
    }
  }

  onPress() {
    let { isActive, word, index, cardEditingStatus } = this.state;
    if (cardEditingStatus === EDITING.FRONT_TEXT) {
      if (isActive) {
        this.props.removeFrontTextWordAtIndex( { payload: { index } });
      } else {
        this.props.addFrontTextWord( { payload: { frontTextWord: word, frontTextIndex: index } });
      }
    } else {
      if (isActive) {
        this.props.removeBackTextWordAtIndex( { payload: { index } });
      } else {
        this.props.addBackTextWord( { payload: { backTextWord: word, backTextIndex: index } });
      }
    }

    isActive = !isActive;
    this.setState({
      isActive,
    });
  }

  render() {
    const { isActive, cardEditingStatus, word } = this.state;
    let backgroundColor = isActive ? BACKGROUND_COLOR[cardEditingStatus] : '#FFFF00';
    return (
      <TouchableOpacity style={{backgroundColor, margin: 5}} onPress={() => this.onPress()}>
        <Text style={styles.text}>{word}</Text>
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
  isActive: false,
};

WordButton.propTypes = {
}

const mapStateToProps = state => ({
  cardEditingStatus: getCardEditingStatus(state),
  frontTextIndexes: getFrontTextIndexes(state),
  backTextIndexes: getBackTextIndexes(state),
});

export default connect(
  mapStateToProps,
  {
    addFrontTextWord,
    addBackTextWord,
    removeFrontTextWordAtIndex,
    removeBackTextWordAtIndex,
  },
)(WordButton);
