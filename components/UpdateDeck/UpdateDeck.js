import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import Mutation from '../Mutation';
import Query from '../Query';
import { UPDATE_DECK } from '../../mutations';
import { DECK_BY_ID, DECKS_BY_USER_UID } from '../../queries';
import GraphQLValues from '../../constants/GraphQLValues';
import { getUID } from '../../reducers';

class UpdateDeck extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Update Deck',
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
    this.goBack = this.goBack.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.setTitle = this.setTitle.bind(this);
    const deckId = props.navigation.getParam('deckId');
    this.state = {
      text: props.text,
      uid: props.uid,
      deckId,
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  isDisabled() {
    const { text = '' } = this.state;
    if (text.trim().length > 0) {
      return false;
    } else {
      return true;
    }
  }

  setTitle(title) {
    if (!this.state.didSetTitle) {
      this.setState({
        didSetTitle: true,
        text: title,
      });
    }
  }

  render() {
    const { deckId, uid } = this.state;
    let checkCircleColor = this.isDisabled() ? '#616161' : '#FAFAFA'
    return (
      <Query
      query={DECK_BY_ID}
      variables={{ id: deckId }}
      notifyOnNetworkStatusChange={true}
    >
      {({ data: { deckById: { title } } }) => {
        this.setTitle(title);
        return (
          <Mutation
              mutation={UPDATE_DECK}
              refetchQueries={[{
                query: DECKS_BY_USER_UID,
                variables: {
                  uid,
                  first: GraphQLValues.FIRST,
                  after: null,
                }
              }]}
              update={(cache, { data: { updateDeckById } }) => {
                const { userByUid } = cache.readQuery({ query: DECKS_BY_USER_UID, variables: {
                  uid,
                  first: GraphQLValues.FIRST,
                  after: null,
                } });
                const idx = userByUid.decksByUserUid.edges.findIndex(({ node }) => {
                  return node.id === deckId;
                });
                userByUid.decksByUserUid.edges[idx].node = updateDeckById.deck;
                cache.writeQuery({
                  query: DECKS_BY_USER_UID,
                  data: { userByUid },
                });

                const { deckById } = cache.readQuery({ query: DECK_BY_ID, variables: {
                  id: deckId,
                } });
                cache.writeQuery({
                  query: DECK_BY_ID,
                  variables: { id: deckId },
                  data: { deckById: updateDeckById.deck },
                });
              }}
              onCompleted={({ updateDeckById: { deck: { title }}}) => this.goBack()}
            >
              {mutate => (
                <Fragment>
                  <View style={styles.root}>
                    <View style={styles.topContainer}>
                      <TouchableOpacity style={styles.buttonContainerLeft} onPress={this.goBack}>
                        <MaterialIcons name="keyboard-arrow-down" size={40} color="#F5F5F5" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonContainerRight} onPress={() => {
                          if (!this.isDisabled()) {
                            mutate({ variables: {
                              input: {
                                id: deckId, deckPatch: { title: this.state.text }}
                              },
                            });
                          }
                        }
                      }>
                        <MaterialIcons name="check-circle" size={40} color={checkCircleColor} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.textContainer}>
                      <TextField
                        label='Title'
                        textColor={'rgba(255,138,128,1.0)'}
                        tintColor={'rgba(0,176,255,1.0)'}
                        baseColor={'rgba(0,176,255,1.0)'}
                        fontSize={28}
                        labelFontSize={20}
                        autoFocus={true}
                        keyboardType={'default'}
                        multiline={true}
                        returnKeyType={'done'}
                        value={this.state.text}
                        maxLength={150}
                        onChangeText={(text) => this.setState({text})}
                    />
                    </View>
                  </View>
                </Fragment>
              )}
            </Mutation>
        )
      }}
      </Query>
    )
  }
}

UpdateDeck.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: 'Create Deck',
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
    padding: 10,
  },
  topContainer: {
    flex: 1,
    marginTop: 15,
    maxHeight:  60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    margin: 0,
  },
  buttonContainerLeft: {
    backgroundColor: 'transparent',
    width: 58,
  },
  buttonContainerRight: {
    backgroundColor: 'transparent',
    width: 58,
    marginTop: 5,
    alignItems: 'flex-end',
  },
});

UpdateDeck.defaultProps = {
  text: '',
};

UpdateDeck.propTypes = {}

const mapStateToProps = state => ({
  uid: getUID(state),
});

export default connect(
  mapStateToProps,
  null,
)(UpdateDeck);
