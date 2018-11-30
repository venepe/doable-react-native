import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { connect } from 'react-redux';

import { stopPlaybackAndBeginRecording, stopRecordingAndEnablePlayback } from '../../actions';

class Recording extends Component {
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
    this.goBack = this.goBack.bind(this);
    this.stopPlaybackAndBeginRecording = this.stopPlaybackAndBeginRecording.bind(this);
    this.stopRecordingAndEnablePlayback = this.stopRecordingAndEnablePlayback.bind(this);
  }

  stopPlaybackAndBeginRecording() {
    this.props.stopPlaybackAndBeginRecording();
  }

  stopRecordingAndEnablePlayback() {
    this.props.stopRecordingAndEnablePlayback();
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
          <MaterialIcons name="close" size={50} color="#F5F5F5" />
        </TouchableOpacity>
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
      </View>
    )
  }
}

Recording.navigationOptions = (props) => {
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
  },
});

Recording.defaultProps = {
};

Recording.propTypes = {
}

const mapStateToProps = state => ({

});

export default connect(
  null,
  { stopPlaybackAndBeginRecording, stopRecordingAndEnablePlayback },
)(Recording);
