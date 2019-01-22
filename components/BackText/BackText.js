import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getBackText } from '../../reducers';

class BackText extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backText.length > 0) {
          return {
            backText: nextProps.backText,
          }
        }
      }

  constructor(props) {
    super(props);

    this.state = {
      backText: '',
    };
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.backText !== prevProps.backText) {
      this.setState({
        backText: props.backText,
      });
    }
  }

  render() {

    return (
      <View style={styles.root}>
        <Text style={styles.text}>{this.state.backText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
  },
  text: {
    color: '#00B0FF',
    fontSize: 14,
    fontWeight: '400',
    padding: 5,
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
