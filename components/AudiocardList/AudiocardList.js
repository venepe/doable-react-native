import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { setActiveDeck, playAudiocard, setAudioCards } from '../../actions';
import AudiocardItem from '../AudiocardItem';
import Placeholder from '../Placeholder';
import NavPlayButton from '../NavPlayButton';
import Query from '../Query';
import PlayerOverlay from '../PlayerOverlay';
import { AUDIOCARDS_BY_DECK_NODEID } from '../../queries';
import { getAudiocardsForDeck } from '../../utilities';

let _deckById;

class AudiocardList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Audiocards',
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
    this.renderItem = this.renderItem.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
  }

  renderItem({ item }) {
    return (
      <AudiocardItem audiocardItem={item} onPress={this.onPressRow} />
    )
  }

  onPressRow({ id }) {
    const audiocardId = id;
    const { navigation } = this.props;
    const deckId = navigation.getParam('deckId');
    const audiocards = getAudiocardsForDeck(_deckById);
    const currentIndex = audiocards.findIndex(({ id }) => id === audiocardId);
    this.props.setAudioCards({
      payload: { audiocards },
    });
    this.props.playAudiocard({
      payload: { audiocard: audiocards[currentIndex] },
    });
    this.props.navigation.navigate('DisplayModal');
  }

  renderPlaceholder() {
    return (
      <Placeholder text={'Record an Audiocard and Start Learning!'}></Placeholder>
    );
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
          if (deckById && deckById.deckAudiocardsByDeckId.edges.length > 0) {
            let list = deckById.deckAudiocardsByDeckId.edges.map(({ node: { audiocardByAudiocardId } }) => {
              return { ...audiocardByAudiocardId };
            });
            return (
              <FlatList
                data={list}
                keyExtractor={(node) => node.nodeId}
                renderItem={this.renderItem}
              />
            )
          } else {
            return (
              <Placeholder text={'Record an Audiocard and Start Learning!'}></Placeholder>
            );
          }
        }}
        </Query>
        <PlayerOverlay navigation={this.props.navigation} />
      </View>
    )
  }
}

AudiocardList.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate, state } = navigation;

  return {
    title: 'Audiocards',
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
    headerRight: (
      <NavPlayButton deckId={state.params.deckId} />
    ),
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#212121',
  },
  rowItemContainer: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowItemHeader: {
    color: '#212121',
    fontSize: 22,
    fontWeight: '400',
  },
});

AudiocardList.defaultProps = {};

AudiocardList.propTypes = {}

export default connect(
  null,
  { setActiveDeck, playAudiocard, setAudioCards },
)(AudiocardList);
