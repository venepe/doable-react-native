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
import { startPlayback, stopPlayBack, setActiveDeck } from '../../actions';

class NavPlayButton extends Component {
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
      isDirty: false,
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
      playButton = <Button title={'Pause'} color={'#FFFFFF'} onPress={this.togglePlay} />;
    } else {
      playButton = <Button title={'Play'} color={'#FFFFFF'} onPress={this.togglePlay} />;
    }

    return (
      <View style={styles.play}>
        { playButton }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  play: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: 'transparent',
  },
});

NavPlayButton.defaultProps = {
  isPlaying: false,
  activeAudioRecord: {},
};

NavPlayButton.propTypes = {
  isPlaying: PropTypes.bool,
}

const mapStateToProps = state => ({
  activeAudioRecord: getActiveRecord(state),
  isPlaying: getIsPlaying(state),
});

export default connect(
  mapStateToProps,
  { startPlayback, stopPlayBack },
)(NavPlayButton);
