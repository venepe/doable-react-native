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
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import DeckItem from '../DeckItem';
import Placeholder from '../Placeholder';
import Query, { IS_FETCHING_MORE } from '../Query';
import NavSearchBar from '../NavSearchBar';
import NavCreateDeck from '../NavCreateDeck';
import LogonButton from '../LogonButton';
import DocumentUploadIndicator from '../DocumentUploadIndicator';
import NavSettingsButton from '../NavSettingsButton';
import { ARCHIVE_DECK } from '../../mutations';
import { DECKS_BY_USER_UID } from '../../queries';
import { getUID, getIsLoading } from '../../reducers';
import { getHeaderButtonColor } from '../../utilities';
import GraphQLValues from '../../constants/GraphQLValues';

class DeckList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          uid: nextProps.uid,
          isLoading: nextProps.isLoading,
        }
      }

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.renderActivityIndicator = this.renderActivityIndicator.bind(this);
    this.navigateToWelcome = this.navigateToWelcome.bind(this);

    this.state = {
      uid: props.uid,
      isLoading: props.isLoading,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.uid !== prevProps.uid) {
      this.setState({
        uid: props.uid,
      });
    }
    if (props.isLoading !== prevProps.isLoading) {
      this.setState({
        isLoading: props.isLoading,
      });
    }
  }

  renderItem({ item, index }) {
    return (
      <DeckItem deckItem={item} key={index} rowID={index} onPress={this.onPressRow} onDelete={this.onDelete} />
    )
  }

  onPressRow(item) {
    this.props.navigation.navigate('CardList', {
      deckId: item.id,
    });
  }

  onDelete(item) {
    const deckId = item.id;
    let uid = this.state.uid
    this.props.client.mutate({
      mutation: ARCHIVE_DECK,
      variables: { input: {
        id: deckId,
        deckPatch: {
          isArchived: true,
        }
      }},
      update: ((cache, { data: { deckPatch } }) => {
        const { userByUid } = cache.readQuery({ query: DECKS_BY_USER_UID, variables: {
          uid,
          first: GraphQLValues.FIRST,
          after: null,
        } });
        const idx = userByUid.decksByUserUid.edges.findIndex(({ node }) => {
          return node.id === deckId;
        });
        userByUid.decksByUserUid.edges.splice(idx, 1);
        cache.writeQuery({
          query: DECKS_BY_USER_UID,
          data: { userByUid },
          variables: {
            uid,
            first: GraphQLValues.FIRST,
            after: null,
          },
        });
      }),
    })
  }

  navigateToWelcome() {
    const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Welcome'})
    ] })
    this.props.navigation.dispatch(resetAction);
  }

  renderActivityIndicator() {
    if (this.state.isLoading) {
      return (
        <DocumentUploadIndicator />
      );
    } else {
      return null;
    }
  }

  render() {
    let uid = this.state.uid
    if (!uid || uid.length < 1) {
      this.navigateToWelcome();
    }
    return (
      <View style={styles.root}>
        {this.renderActivityIndicator()}
        <Query
        query={DECKS_BY_USER_UID}
        variables={{ uid, first: GraphQLValues.FIRST, after: null }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { userByUid: { decksByUserUid } }, fetchMore, networkStatus}) => {

          if (decksByUserUid.edges.length < 1) {
            return (
              <Placeholder text={'Learn with Doable \n Create Unlimited Decks'}></Placeholder>
            );
          }
          let list = decksByUserUid.edges.map(({ node }) => {
            return { ...node };
          });

          return (
            <View style={styles.container}>
              <FlatList
                data={list}
                keyExtractor={(node) => node.nodeId}
                renderItem={this.renderItem}
                ListFooterComponent={() => {
                  if (decksByUserUid.pageInfo.hasNextPage && networkStatus !== IS_FETCHING_MORE) {
                      return (
                        <TouchableOpacity style={styles.moreContainer} onPress={() => {
                        fetchMore({
                            variables: { first: GraphQLValues.FIRST, after: decksByUserUid.pageInfo.endCursor},
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                              return {
                                userByUid: {
                                  __typename: previousResult.userByUid.__typename,
                                  decksByUserUid: {
                                    edges: [
                                      ...previousResult.userByUid.decksByUserUid.edges,
                                      ...fetchMoreResult.userByUid.decksByUserUid.edges,
                                    ],
                                    pageInfo: fetchMoreResult.userByUid.decksByUserUid.pageInfo,
                                    __typename: decksByUserUid.__typename,
                                  }
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
    headerTitle: 'Decks',
    headerTitleStyle: {
      color: '#F5F5F5',
    },
    headerBackTitle: 'Back',
    headerBackTitleStyle: {
      color: '#FFFFFF',
    },
    headerLeft: (
      <NavSettingsButton onPress={navigation.toggleDrawer} />
    ),
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

const mapStateToProps = state => ({
  uid: getUID(state),
  isLoading: getIsLoading(state),
});

export default withApollo(connect(
  mapStateToProps,
  null,
)(DeckList));
