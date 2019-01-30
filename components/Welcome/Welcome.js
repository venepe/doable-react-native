import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux';
import { getUID } from '../../reducers';
import LogonButton from '../LogonButton';

class Welcome extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          uid: nextProps.uid,
        }
      }

  constructor(props) {
    super(props);
    this.navigateToDeckList = this.navigateToDeckList.bind(this);

    this.state = {
      uid: props.uid,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.uid !== prevProps.uid) {
      this.setState({
        uid: props.uid,
      });
    }
  }

  navigateToDeckList() {
    const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'DeckList'})
    ] })
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { uid } = this.state;
    if (uid && uid.length > 0) {
      this.navigateToDeckList();
    }

    return (
      <View style={styles.root}>
        <AppIntroSlider slides={slides} />
        <View style={{height: 50}}>
          <LogonButton didLogin={this.navigateToDeckList} />
        </View>
      </View>
    )
  }
}

Welcome.navigationOptions = (props) => {

  return {
    headerStyle: {
      backgroundColor: '#000D11',
    },
    headerTitle: 'Welcome',
    headerTitleStyle: {
      color: '#F5F5F5',
    },
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#212121',
  },
  image200: {
    width: 200,
    height: 200,
  },
});

const slides = [
  {
    key: 'capture',
    title: 'Capture Your Card',
    text: 'Take a picture of what you are learning.',
    image: require('../../assets/camera.png'),
    imageStyle: styles.image200,
    backgroundColor: '#651FFF',
  },
  {
    key: 'ai',
    title: 'We Identify Text',
    text: 'Wait while we we convert your image to text',
    image: require('../../assets/wand.png'),
    imageStyle: styles.image200,
    backgroundColor: '#2979FF',
  },
  {
    key: 'select',
    title: 'Make Your Card',
    text: 'Tap the text to the front or back',
    image: require('../../assets/list.png'),
    imageStyle: styles.image200,
    backgroundColor: '#00BFA5',
  }
];

Welcome.defaultProps = {};

Welcome.propTypes = {}

const mapStateToProps = state => ({
  uid: getUID(state),
});

export default connect(
  mapStateToProps,
)(Welcome);
