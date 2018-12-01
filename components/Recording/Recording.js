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
import Player from '../Player';
import { getActiveRecord } from '../../reducers';
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

    this.state = {
      isDirty: props.isDirty,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeAudioRecord !== prevProps.activeAudioRecord) {
      this.setState({
        activeAudioRecord: props.activeAudioRecord,
      });
    }
  }

  stopPlaybackAndBeginRecording() {
    this.setState({
      isDirty: true,
      isRecording: true,
    });
    this.props.stopPlaybackAndBeginRecording();
  }

  stopRecordingAndEnablePlayback() {
    this.setState({
      isRecording: false,
    });
    this.props.stopRecordingAndEnablePlayback();
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderRecording() {
    let { isDirty, isRecording, } = this.state;
    // isDirty = true;
    // isRecording = false;
    if (!isDirty) {
      return (
        <TouchableOpacity style={styles.closeButton} onPress={this.stopPlaybackAndBeginRecording}>
          <MaterialIcons name="keyboard-voice" size={75} color="#FF5252" />
        </TouchableOpacity>
      );
    } else if (isRecording) {
      return (
        <TouchableOpacity style={styles.closeButton} onPress={this.stopRecordingAndEnablePlayback}>
          <MaterialIcons name="stop" size={75} color="#FF5252" />
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.cancelSaveContainer}>
          <View style={styles.playerContainer}>
            <Player />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
              <MaterialIcons name="cancel" size={75} color="#FF5252" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
              <MaterialIcons name="check-circle" size={75} color="#69F0AE" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
          <MaterialIcons name="close" size={50} color="#F5F5F5" />
        </TouchableOpacity>
        <View style={styles.recordingStateContainer}>
          {this.renderRecording()}
        </View>
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
    backgroundColor: '#212121',
  },
  recordingStateContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelSaveContainer: {
    flex:1,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

Recording.defaultProps = {
  isDirty: false,
  isRecording: false,
};

Recording.propTypes = {
  isDirty: PropTypes.bool,
  isRecording: PropTypes.bool,
}

const mapStateToProps = state => ({

});

export default connect(
  null,
  { stopPlaybackAndBeginRecording, stopRecordingAndEnablePlayback },
)(Recording);
