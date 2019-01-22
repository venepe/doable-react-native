import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getFrontText } from '../../reducers';

class FrontText extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.frontText.length > 0) {
          return {
            frontText: nextProps.frontText,
          }
        }
      }

  constructor(props) {
    super(props);

    this.state = {
      frontText: '',
    };
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.frontText !== prevProps.frontText) {
      this.setState({
        frontText: props.frontText,
      });
    }
  }

  render() {

    return (
      <View style={styles.root}>
        <Text style={styles.text}>{this.state.frontText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
  },
  text: {
    color: '#1DE9B6',
    fontSize: 14,
    fontWeight: '400',
    padding: 5,
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
