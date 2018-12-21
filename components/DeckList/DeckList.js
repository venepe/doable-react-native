import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DeckItem from '../DeckItem';
import Placeholder from '../Placeholder';
import PlayerOverlay from '../PlayerOverlay';
import Query from '../Query';
import { ALL_DECKS } from '../../queries';
import { getHeaderButtonColor } from '../../utilities';

class DeckList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Decks',
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

  renderItem({ item, index }) {
    return (
      <DeckItem deckItem={item} key={index} rowID={index} onPress={this.onPressRow} />
    )
  }

  onPressRow(item) {
    this.props.navigation.navigate('AudiocardList', {
      deckId: item.id,
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <Query
        query={ALL_DECKS}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { allDecks }, fetchMore, networkStatus}) => {

          if (allDecks.edges.length < 1) {
            return (
              <Placeholder text={'Create a Deck to Get Started!'}></Placeholder>
            );
          }
          let list = allDecks.edges.map(({ node }) => {
            return { ...node };
          });

          return (
            <FlatList
              data={list}
              keyExtractor={(node) => node.nodeId}
              renderItem={this.renderItem}
            />
          )
        }}
        </Query>
        <PlayerOverlay navigation={this.props.navigation} />
      </View>
    )
  }
}

DeckList.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: 'Decks',
    headerStyle: {
      backgroundColor: '#000D11',
    },
    headerTitleStyle: {
      color: '#F5F5F5',
    },
    headerBackTitle: 'Back',
    headerBackTitleStyle: {
      color: '#FFFFFF',
    },
    headerRight: (
      <Button
        title={'Create'}
        color={getHeaderButtonColor()}
        onPress={() => navigate('CreateDeckModal')}
      />
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
  placeholder: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '400',
  },
});

DeckList.defaultProps = {};

DeckList.propTypes = {}

export default DeckList;
