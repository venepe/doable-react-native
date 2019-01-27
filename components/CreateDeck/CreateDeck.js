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
import { CREATE_DECK } from '../../mutations';
import { DECKS_BY_USER_UID } from '../../queries';
import { getUID } from '../../reducers';

class CreateDeck extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Create Deck',
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
    this.state = {
      text: props.text,
      uid: this.props.uid,
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

  render() {
    const uid = this.state.uid;
    let checkCircleColor = this.isDisabled() ? '#616161' : '#FAFAFA'
    return (
      <Mutation
          mutation={CREATE_DECK}
          update={(cache, { data: { createDeck } }) => {
            const { userByUid } = cache.readQuery({ query: DECKS_BY_USER_UID, variables: {
              uid,
            } });
            userByUid.decksByUserUid.edges.unshift({ __typename: 'DecksEdge', node: createDeck.deck });
            cache.writeQuery({
              query: DECKS_BY_USER_UID,
              data: { userByUid },
              variables: {
                uid,
              },
            });
          }}
          onCompleted={({ createDeck: { deck: { id }}}) => this.goBack()}
        >
          {mutate => (
            <Fragment>
              <View style={styles.root}>
                <View style={styles.topContainer}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.goBack}>
                    <MaterialIcons name="keyboard-arrow-down" size={40} color="#F5F5F5" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                      if (!this.isDisabled()) {
                        mutate({ variables: { input: { deck: { title: this.state.text, userUid: uid}}}});
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
  }
}

CreateDeck.navigationOptions = (props) => {
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
  buttonContainer: {
    backgroundColor: 'transparent',
    width: 58,
  },
});

CreateDeck.defaultProps = {
  text: '',
};

CreateDeck.propTypes = {}

const mapStateToProps = state => ({
  uid: getUID(state),
});

export default connect(
  mapStateToProps,
  null,
)(CreateDeck);
