import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getBackText } from '../../reducers';
import { getDisplayText } from '../../utilities';
const PLACEHOLDER = 'Back Text Here';

class BackText extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          backText: nextProps.backText,
          isActive: nextProps.isActive,
        }
      }

  constructor(props) {
    super(props);

    this.state = {
      backText: [],
      isActive: props.isActive,
    };
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.backText !== prevProps.backText) {
      this.setState({
        backText: props.backText,
      });
    }
    if (props.isActive !== prevProps.isActive) {
      this.setState({
        isActive: props.isActive,
      });
    }
  }

  render() {

    let { backText, isActive } = this.state;
    let displayText = getDisplayText(backText);
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
    color: '#FF8A80',
    fontSize: 28,
    fontWeight: '400',
    padding: 10,
    // fontFamily: 'Roboto-Thin',
  },
});

const mapStateToProps = state => ({
  backText: getBackText(state),
});

export default connect(
  mapStateToProps,
  null,
)(BackText);
