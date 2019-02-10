import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getFrontText } from '../../reducers';
import { getDisplayText } from '../../utilities';
const PLACEHOLDER = 'Front Text Here';

class FrontText extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          frontText: nextProps.frontText,
          isActive: nextProps.isActive,
        }
      }

  constructor(props) {
    super(props);

    this.state = {
      frontText: [],
      isActive: props.isActive,
    };
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.frontText !== prevProps.frontText) {
      this.setState({
        frontText: props.frontText,
      });
    }
    if (props.isActive !== prevProps.isActive) {
      this.setState({
        isActive: props.isActive,
      });
    }
  }

  render() {
    let { frontText, isActive } = this.state;
    let displayText = getDisplayText(frontText);
    if (displayText.length < 1) {
      displayText = PLACEHOLDER;
    }
    let opacity = isActive ? 1.0 : .5;
    let fontSize = isActive ? 28 : 20;
    return (
      <View style={[styles.root, {opacity}]}>
        <Text style={[styles.text, {fontSize}]}>{displayText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
  },
  text: {
    color: '#00B0FF',
    fontSize: 28,
    fontWeight: '400',
    padding: 10,
    // fontFamily: 'Roboto-Thin',
  },
});

const mapStateToProps = state => ({
  frontText: getFrontText(state),
});

export default connect(
  mapStateToProps,
  null,
)(FrontText);
