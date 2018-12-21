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
import { getActiveAudiocard, getIsPlaying, getIsOnRepeat, getIsOnRandom } from '../../reducers';
import { startPlayback, stopPlayBack, setIsOnRepeat, setIsOnRandom, nextAudioUri, previousAudioUri } from '../../actions';

const playerColor = '#EEEEEE';
const activePlayColor = '#FF8A80';

class Player extends Component {
  static propTypes = {}

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          activeAudiocard: nextProps.activeAudiocard,
          isPlaying: nextProps.isPlaying,
          isOnRepeat: nextProps.isOnRepeat,
          isOnRandom: nextProps.isOnRandom,
        }
      }

  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleIsOnRepeat = this.toggleIsOnRepeat.bind(this);
    this.toggleIsOnRandom = this.toggleIsOnRandom.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);

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
    if (props.isOnRepeat !== prevProps.isOnRepeat) {
      this.setState({
        isOnRepeat: props.isOnRepeat,
      });
    }
    if (props.isOnRandom !== prevProps.isOnRandom) {
      this.setState({
        isOnRandom: props.isOnRandom,
      });
    }
  }

  togglePlay() {
    const { isPlaying, activeAudiocard } = this.state;
    if (isPlaying) {
      this.props.stopPlayBack();
    } else {
      this.props.startPlayback({
        payload: { uri: activeAudiocard.questionAudioUri },
      });
    }
  }

  toggleIsOnRepeat() {
    const { isOnRepeat } = this.state;
    this.props.setIsOnRepeat({
      payload: { isOnRepeat: !isOnRepeat },
    });
  }

  toggleIsOnRandom() {
    const { isOnRandom } = this.state;
    this.props.setIsOnRandom({
      payload: { isOnRandom: !isOnRandom },
    });
  }

  onNext() {
    this.props.nextAudioUri();
  }

  onPrevious() {
    this.props.previousAudioUri();
  }

  render() {
    let playButton;
    const { isPlaying, isOnRepeat, isOnRandom } = this.state;

    if (isPlaying) {
      playButton = <MaterialIcons name="pause-circle-outline" size={60} color={playerColor} />;
    } else {
      playButton = <MaterialIcons name="play-circle-outline" size={60} color={playerColor} />;
    }

    const repeatColor = isOnRepeat === true ? activePlayColor : playerColor;
    const randomColor = isOnRandom === true ? activePlayColor : playerColor;
    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <View style={styles.skipPrevious}>
            <TouchableOpacity style={[styles.controlButton, {marginBottom: 5}]} onPress={this.toggleIsOnRandom}>
              <MaterialIcons style={styles.skip} name="shuffle" size={30} color={randomColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.skipPrevious}>
            <TouchableOpacity style={styles.controlButton} onPress={this.onPrevious}>
              <MaterialIcons style={styles.skip} name="skip-previous" size={40} color={playerColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.play}>
            <TouchableOpacity style={styles.controlButton} onPress={this.togglePlay}>
              { playButton }
            </TouchableOpacity>
          </View>
          <View style={styles.skipNext}>
            <TouchableOpacity style={styles.controlButton} onPress={this.onNext}>
              <MaterialIcons style={styles.skip} name="skip-next" size={40} color={playerColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.skipNext}>
            <TouchableOpacity style={[styles.controlButton, {marginBottom: 5}]} onPress={this.toggleIsOnRepeat}>
              <MaterialIcons style={styles.skip} name="repeat" size={30} color={repeatColor} />
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
  isOnRepeat: false,
};

Player.propTypes = {
  isPlaying: PropTypes.bool,
  isOnRepeat: PropTypes.bool,
}

const mapStateToProps = state => ({
  activeAudiocard: getActiveAudiocard(state),
  isPlaying: getIsPlaying(state),
  isOnRepeat: getIsOnRepeat(state),
  isOnRandom: getIsOnRandom(state),
});

export default connect(
  mapStateToProps,
  { startPlayback, stopPlayBack, setIsOnRepeat, setIsOnRandom, nextAudioUri, previousAudioUri },
)(Player);
