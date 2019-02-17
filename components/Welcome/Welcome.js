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
import { logonUser } from '../../helpers/logon';

class Welcome extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          uid: nextProps.uid,
        }
      }

  constructor(props) {
    super(props);
    this.navigateToDeckList = this.navigateToDeckList.bind(this);
    this.onDone = this.onDone.bind(this);

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

  onDone() {
    logonUser()
      .then(() => {
        this.navigateToDeckList();
      });
  }

  render() {
    const { uid } = this.state;
    if (uid && uid.length > 0) {
      this.navigateToDeckList();
    }

    return (
      <View style={styles.root}>
        <AppIntroSlider slides={slides} onDone={() => this.onDone()}/>
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
    key: 'upload',
    title: 'Upload a PDF',
    text: '',
    image: require('../../assets/upload_pdf.png'),
    imageStyle: styles.image200,
    backgroundColor: '#651FFF',
  },
  {
    key: 'select',
    title: 'Select What to Study',
    text: '',
    image: require('../../assets/list.png'),
    imageStyle: styles.image200,
    backgroundColor: '#2979FF',
  },
  {
    key: 'wow',
    title: 'Earn an Easy A',
    text: '',
    image: require('../../assets/ribbon.png'),
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
