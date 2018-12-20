import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons/index';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import Query from '../Query';
import { connect } from 'react-redux';
import { startPlayback, stopPlayBack, setActiveDeck, playAudiocard, setAudioCards } from '../../actions';
import { AUDIOCARDS_BY_DECK_NODEID } from '../../queries';
import { getAudiocardsForDeck, getHeaderButtonColor } from '../../utilities';
import { getActiveAudiocard } from '../../reducers';
import Player from '../Player';
import styles from './styles';

let _deckById;

class Display extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: '#3B5998',
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerBackTitle: 'Back',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          activeDeckId: nextProps.activeDeckId,
          activeAudiocard: nextProps.activeAudiocard,
        }
      }

  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);

    const { navigation } = this.props;
    const deckId = navigation.getParam('deckId');
    const audiocardId = navigation.getParam('audiocardId');

    this.state = {
      activeAudiocard: props.activeAudiocard,
      deckId,
      audiocardId,
    }
  }

  componentDidMount() {
    const audiocards = getAudiocardsForDeck(_deckById);
    const currentIndex = audiocards.findIndex(({ id }) => id === this.state.audiocardId);
    this.props.setAudioCards({
      payload: { audiocards },
    });
    this.props.playAudiocard({
      payload: { audiocard: audiocards[currentIndex] },
    });
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeAudiocard !== prevProps.activeAudiocard) {
      this.setState({
        activeAudiocard: props.activeAudiocard,
      });
    }
    if (props.activeDeckId !== prevProps.activeDeckId) {
      this.setState({
        activeDeckId: props.activeDeckId,
      });
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    const { navigation } = this.props;
    const deckId = navigation.getParam('deckId');

    return (
      <View style={styles.root}>
        <Query
        query={AUDIOCARDS_BY_DECK_NODEID}
        variables={{ id: deckId }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { deckById }, fetchMore, networkStatus}) => {
          _deckById = deckById;
          return (
            <View style={styles.container}>
              <View style={styles.subContainer}>
                  <TouchableOpacity style={styles.backButtonContainer} onPress={this.goBack}>
                    <MaterialIcons name="keyboard-arrow-down" size={40} color="#FAFAFA" />
                  </TouchableOpacity>
                  <View style={styles.boxContainer}>
                    <Text style={styles.title}>{this.state.activeAudiocard.questionText}</Text>
                  </View>
              </View>
              <View style={styles.playerContainer}>
                <Player />
              </View>
            </View>
          )
        }}
        </Query>
      </View>
    );
  }
}

Display.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: '',
    headerStyle: {
      backgroundColor: '#000D11',
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      color: '#F5F5F5',
    },
    headerBackTitle: 'Back',
    headerBackTitleStyle: {
      color: '#FFFFFF',
    },
  };
};

Display.defaultProps = {
  activeAudiocard: {},
};

const mapStateToProps = state => ({
  activeAudiocard: getActiveAudiocard(state),
});

export default connect(
  mapStateToProps,
  { startPlayback, stopPlayBack, setActiveDeck, playAudiocard, setAudioCards },
)(Display);
