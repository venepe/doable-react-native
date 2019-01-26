import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons/index';
import { getFrontText } from '../../reducers';
const PLACEHOLDER = 'Front Text Here';

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
    this.onEdit = this.onEdit.bind(this);

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

  onEdit() {

  }

  render() {
    let { frontText } = this.state;
    if (frontText.length < 1) {
      frontText = PLACEHOLDER;
    }

    return (
      <View style={styles.root}>
        <Text style={styles.title}>{frontText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  editButtonContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: 15,
    width: 58,
  },
  title: {
    color: '#00B0FF',
    fontSize: 28,
    fontWeight: '400',
    padding: 5,
    // fontFamily: 'Roboto-Thin',
  },
  text: {
    color: '#FF8A80',
    fontSize: 28,
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
