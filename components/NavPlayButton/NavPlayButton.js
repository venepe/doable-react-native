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
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import Query from '../Query';
import { getIsPlaying, getActiveDeckId } from '../../reducers';
import { startPlayback, stopPlayBack, setActiveDeck, playAudiocard, setAudioCards } from '../../actions';
import { AUDIOCARDS_BY_DECK_NODEID } from '../../queries';

let _deckById;

class NavPlayButton extends Component {
  static propTypes = {}

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          activeDeckId: nextProps.activeDeckId,
          isPlaying: nextProps.isPlaying,
        }
      }

  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);

    this.state = {
      isPlaying: props.isPlaying,
      activeDeckId: props.activeDeckId,
      deckId: props.deckId,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeDeckId !== prevProps.activeDeckId) {
      this.setState({
        activeDeckId: props.activeDeckId,
      });
    }
    if (props.isPlaying !== prevProps.isPlaying) {
      this.setState({
        isPlaying: props.isPlaying,
      });
    }
  }

  getAudiocardsForDeck(deck) {
    console.log(deck);
    return deck.deckAudiocardsByDeckId.edges.map(({ node: { audiocardByAudiocardId } }) => {
      return {
        ...audiocardByAudiocardId
      };
    })
  }

  togglePlay() {
    console.log('asdf');
    const { isPlaying, activeDeckId } = this.state;
    if (isPlaying) {
      this.props.stopPlayBack();
    } else if (activeDeckId !== _deckById.id) {
      const audiocards = this.getAudiocardsForDeck(_deckById);
      this.props.setAudioCards({
        payload: { audiocards },
      });
      this.props.playAudiocard({
        payload: { audiocard: audiocards[0] },
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
        <Query
        query={AUDIOCARDS_BY_DECK_NODEID}
        variables={{ id: this.props.deckId }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { deckById }, fetchMore, networkStatus}) => {
          _deckById = deckById;
          return (
            playButton
          )
        }}
        </Query>
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
  activeDeckId: {},
  visibleDeck: {}
};

NavPlayButton.propTypes = {
  isPlaying: PropTypes.bool,
}

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state),
  activeDeckId: getActiveDeckId(state),
});

export default connect(
  mapStateToProps,
  { startPlayback, stopPlayBack, playAudiocard, setAudioCards },
)(NavPlayButton);
