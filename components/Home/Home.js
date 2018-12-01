import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { startPlayback, stopPlayBack, stopPlaybackAndBeginRecording, stopRecordingAndEnablePlayback } from '../../actions';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Doable',
    headerStyle: {
      backgroundColor: '#3B5998',
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerBackTitle: 'Back',
  };

  constructor(props) {
    super(props);
    // props.navigation.setParams({ user: props.user });
    this.startPlayback = this.startPlayback.bind(this);
    this.stopPlayBack = this.stopPlayBack.bind(this);
    this.stopPlaybackAndBeginRecording = this.stopPlaybackAndBeginRecording.bind(this);
    this.stopRecordingAndEnablePlayback = this.stopRecordingAndEnablePlayback.bind(this);
  }

  startPlayback() {
    this.props.startPlayback();
  }

  stopPlayBack() {
    this.props.stopPlayBack();
  }

  stopPlaybackAndBeginRecording() {
    this.props.stopPlaybackAndBeginRecording();
  }

  stopRecordingAndEnablePlayback() {
    this.props.stopRecordingAndEnablePlayback();
  }

  render() {
    return (
      <View style={styles.root}>
        <Button
          onPress={() => this.startPlayback()}
          title="Start Playback"
          color="#841584"
        />
        <Button
          onPress={() => this.stopPlayBack()}
          title="Stop Playback"
          color="#841584"
        />
        <Button
          onPress={() => this.stopPlaybackAndBeginRecording()}
          title="Start Recording"
          color="#841584"
        />
        <Button
          onPress={() => this.stopRecordingAndEnablePlayback()}
          title="Stop Recording"
          color="#841584"
        />
        <Button
          onPress={() => this.props.navigation.navigate('RecordingModal')}
          title="Modal"
          color="#841584"
        />
      </View>
    )
  }
}

Home.navigationOptions = (props) => {
  return {
    title: 'Doable',
    headerStyle: {
      backgroundColor: '#0086C3',
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerBackTitle: 'Back',
    headerBackTitleStyle: {
      color: '#FFFFFF',
    },
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },
});

Home.defaultProps = {
};

Home.propTypes = {
}

const mapStateToProps = state => ({

});

export default connect(
  null,
  { startPlayback, stopPlayBack, stopPlaybackAndBeginRecording, stopRecordingAndEnablePlayback },
)(Home);
