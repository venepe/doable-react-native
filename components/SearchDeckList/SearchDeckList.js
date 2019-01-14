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
import { SEARCH_DECKS } from '../../queries';
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
    const { navigation } = this.props;
    const search = navigation.getParam('search');
    return (
      <View style={styles.root}>
        <Query
        query={SEARCH_DECKS}
        variables={{ search: search, first: FIRST, after: null }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { searchDecks }, fetchMore, networkStatus}) => {

          if (searchDecks.edges.length < 1) {
            return (
              <Placeholder text={'Hmm, we are always adding decks. Reach out if you need something added'}></Placeholder>
            );
          }

          let list = searchDecks.edges.map(({ node }) => {
            return { ...node };
          });

          return (
            <View style={styles.container}>
              <FlatList
                data={list}
                keyExtractor={(node) => node.nodeId}
                renderItem={this.renderItem}
                ListFooterComponent={() => {
                  if (searchDecks.pageInfo.hasNextPage && networkStatus !== IS_FETCHING_MORE) {
                      return (
                        <TouchableOpacity style={styles.moreContainer} onPress={() => {
                        fetchMore({
                            variables: { search: search, first: FIRST, after: searchDecks.pageInfo.endCursor},
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                              return {
                                searchDecks: {
                                  edges: [
                                    ...previousResult.searchDecks.edges,
                                    ...fetchMoreResult.searchDecks.edges,
                                  ],
                                  pageInfo: fetchMoreResult.searchDecks.pageInfo,
                                  __typename: searchDecks.__typename,
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
  const search = navigation.getParam('search');

  return {
    headerTitle: (
      <NavSearchBar search={search} navigation={navigation} />
    ),
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
