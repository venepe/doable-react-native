import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { connect } from 'react-redux';
import { getActiveAudiocard, getIsPlaying, getActiveUri } from '../../reducers';
import { startPlayback, stopPlayBack } from '../../actions';

const playerColor = '#EEEEEE';
const activePlayColor = '#FF8A80';

class PlayerOverlay extends Component {
  static propTypes = {}

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          activeAudiocard: nextProps.activeAudiocard,
          isPlaying: nextProps.isPlaying,
          activeUri: nextProps.activeUri,
        }
      }

  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.goToDisplay = this.goToDisplay.bind(this);

    this.state = {
      isPlaying: props.isPlaying,
      activeAudiocard: props.activeAudiocard,
      activeUri: props.activeUri,
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
    if (props.activeUri !== prevProps.activeUri) {
      this.setState({
        activeUri: props.activeUri,
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

  goToDisplay() {
    this.props.navigation.navigate('DisplayModal');
  }

  render() {
    if (this.state.activeAudiocard.questionText) {
      let playButton;
      let text;
      const { isPlaying, activeUri, activeAudiocard } = this.state;

      if (isPlaying) {
        playButton = <MaterialIcons name="pause-circle-outline" size={35} color={playerColor} />;
      } else {
        playButton = <MaterialIcons name="play-circle-outline" size={35} color={playerColor} />;
      }

      text = activeUri === activeAudiocard.answerAudioUri ? activeAudiocard.answerText : activeAudiocard.questionText;

      return (
        <TouchableOpacity style={styles.container}  onPress={this.goToDisplay}>
          <View style={styles.controlButton}>
            <MaterialIcons name="keyboard-arrow-up" size={35} color="#EEEEEE" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{text}</Text>
          </View>
          <TouchableOpacity style={styles.controlButton} onPress={this.togglePlay}>
            { playButton }
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else {
      return <View />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: '#D6D7DA',
  },
  title: {
    color: '#EEEEEE',
    fontSize: 14,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
  },
  titleContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 2,
  },
});

PlayerOverlay.defaultProps = {
  isPlaying: false,
  activeAudiocard: {},
};

PlayerOverlay.propTypes = {
  isPlaying: PropTypes.bool,
}

const mapStateToProps = state => ({
  activeAudiocard: getActiveAudiocard(state),
  isPlaying: getIsPlaying(state),
  activeUri: getActiveUri(state),
});

export default connect(
  mapStateToProps,
  { startPlayback, stopPlayBack },
)(PlayerOverlay);
