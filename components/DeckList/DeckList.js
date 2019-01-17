import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import DeckItem from '../DeckItem';
import Placeholder from '../Placeholder';
import Query, { IS_FETCHING_MORE } from '../Query';
import NavSearchBar from '../NavSearchBar';
import NavCreateDeck from '../NavCreateDeck';
import { ALL_DECKS } from '../../queries';
import { getHeaderButtonColor } from '../../utilities';
const FIRST = 25;

class DeckList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

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
    this.props.navigation.navigate('CardList', {
      deckId: item.id,
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <Query
        query={ALL_DECKS}
        variables={{ first: FIRST, after: null }}
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
            <View style={styles.container}>
              <FlatList
                data={list}
                keyExtractor={(node) => node.nodeId}
                renderItem={this.renderItem}
                ListFooterComponent={() => {
                  if (allDecks.pageInfo.hasNextPage && networkStatus !== IS_FETCHING_MORE) {
                      return (
                        <TouchableOpacity style={styles.moreContainer} onPress={() => {
                        fetchMore({
                            variables: { first: FIRST, after: allDecks.pageInfo.endCursor},
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                              return {
                                allDecks: {
                                  edges: [
                                    ...previousResult.allDecks.edges,
                                    ...fetchMoreResult.allDecks.edges,
                                  ],
                                  pageInfo: fetchMoreResult.allDecks.pageInfo,
                                  __typename: allDecks.__typename,
                                }
                              };
                            },
                          });
                        }}
                        >
                        <MaterialIcons name='keyboard-arrow-down' size={40} color='#FAFAFA' />
                      </TouchableOpacity>);
                  } else if (networkStatus === IS_FETCHING_MORE) {
                    return <ActivityIndicator size='large' color='#FAFAFA' />
                  } else {
                    return <View></View>
                  }
                }
                }
              />
            </View>
          )
        }}
        </Query>
      </View>
    )
  }
}

DeckList.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
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
     <NavCreateDeck navigation={navigation} />
   ),
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#212121',
  },
  container: {
    flex: 1,
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
  moreContainer: {
    alignItems: 'center',
  },
});

DeckList.defaultProps = {};

DeckList.propTypes = {}

export default DeckList;
