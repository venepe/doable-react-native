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
import { getActiveAudiocard, getIsPlaying } from '../../reducers';
import { startPlayback, stopPlayBack } from '../../actions';

// import {  } from '../../actions';

class Player extends Component {
  static propTypes = {}

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          activeAudiocard: nextProps.activeAudiocard,
          isPlaying: nextProps.isPlaying,
        }
      }

  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);

    this.state = {
      isPlaying: props.isPlaying,
      activeAudiocard: props.activeAudiocard,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeAudiocard !== prevProps.activeAudiocard) {
      this.setState({
        activeAudiocard: props.activeAudiocard,
      });
    }
    if (props.isPlaying !== prevProps.isPlaying) {
      this.setState({
        isPlaying: props.isPlaying,
      });
    }
  }

  togglePlay() {
    const { isPlaying, activeAudiocard } = this.state;
    if (isPlaying) {
      this.props.stopPlayBack();
    } else {
      this.props.startPlayback({
        payload: { uri: activeAudiocard.uri },
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
          <View style={styles.skipPrevious}>
            <TouchableOpacity style={[styles.controlButton, {marginBottom: 5}]} onPress={this.onPrevious}>
              <MaterialIcons style={styles.skip} name="shuffle" size={30} color="#FF4081" />
            </TouchableOpacity>
          </View>
          <View style={styles.skipPrevious}>
            <TouchableOpacity style={styles.controlButton} onPress={this.onPrevious}>
              <MaterialIcons style={styles.skip} name="skip-previous" size={40} color="#FF4081" />
            </TouchableOpacity>
          </View>
          <View style={styles.play}>
            <TouchableOpacity style={styles.controlButton} onPress={this.togglePlay}>
              { playButton }
            </TouchableOpacity>
          </View>
          <View style={styles.skipNext}>
            <TouchableOpacity style={styles.controlButton} onPress={this.onNext}>
              <MaterialIcons style={styles.skip} name="skip-next" size={40} color="#FF4081" />
            </TouchableOpacity>
          </View>
          <View style={styles.skipNext}>
            <TouchableOpacity style={[styles.controlButton, {marginBottom: 5}]} onPress={this.onNext}>
              <MaterialIcons style={styles.skip} name="repeat" size={30} color="#FF4081" />
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
  skip: {
    marginTop: 10,
    marginBottom: 7,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 5,
    alignItems: 'flex-end',
  },
  skipPrevious: {
    flex: 1,
    alignItems: 'flex-end',
  },
  play: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  skipNext: {
    flex: 1,
    alignItems: 'flex-start',
  },
  controlButton: {
    backgroundColor: 'transparent',
  },
});

Player.defaultProps = {
  isPlaying: false,
  activeAudiocard: {},
};

Player.propTypes = {
  isPlaying: PropTypes.bool,
}

const mapStateToProps = state => ({
  activeAudiocard: getActiveAudiocard(state),
  isPlaying: getIsPlaying(state),
});

export default connect(
  mapStateToProps,
  { startPlayback, stopPlayBack },
)(Player);
