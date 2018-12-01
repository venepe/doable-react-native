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
import { getActiveRecord, getIsPlaying } from '../../reducers';
import { startPlayback, stopPlayBack } from '../../actions';

// import {  } from '../../actions';

class Player extends Component {
  static propTypes = {}

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          activeAudioRecord: nextProps.activeAudioRecord,
          isPlaying: nextProps.isPlaying,
        }
      }

  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);

    this.state = {
      isPlaying: props.isPlaying,
      activeAudioRecord: props.activeAudioRecord,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeAudioRecord !== prevProps.activeAudioRecord) {
      this.setState({
        activeAudioRecord: props.activeAudioRecord,
      });
    }
    if (props.isPlaying !== prevProps.isPlaying) {
      this.setState({
        isPlaying: props.isPlaying,
      });
    }
  }

  togglePlay() {
    console.log('asdf');
    const { isPlaying, activeAudioRecord } = this.state;
    if (isPlaying) {
      this.props.stopPlayBack();
    } else {
      this.props.startPlayback({
        payload: { uri: activeAudioRecord.uri },
      });
    }
  }

  render() {
    let playButton;
    if (this.state.isPlaying) {
      playButton = <MaterialIcons name="pause-circle-outline" size={60} color="#FF4081" />;
    } else {
      playButton = <MaterialIcons name="play-circle-outline" size={60} color="#FF4081" />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <View style={styles.play}>
            <TouchableOpacity style={styles.controlButton} onPress={this.togglePlay}>
              { playButton }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 5,
  },
  play: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  controlButton: {
    backgroundColor: 'transparent',
  },
});

Player.defaultProps = {
  isPlaying: false,
  activeAudioRecord: {},
};

Player.propTypes = {
  isPlaying: PropTypes.bool,
}

const mapStateToProps = state => ({
  activeAudioRecord: getActiveRecord(state),
  isPlaying: getIsPlaying(state),
});

export default connect(
  mapStateToProps,
  { startPlayback, stopPlayBack },
)(Player);
