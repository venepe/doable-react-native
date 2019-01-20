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
import { connect } from 'react-redux';
import Mutation from '../Mutation';
import { CREATE_DECK } from '../../mutations';
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
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.state = {
      text: props.text,
      label: props.label,
      uid: this.props.uid,
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  onPressSubmit() {
    console.log('did press answer');
  }

  render() {
    const uid = this.state.uid;
    return (
      <Mutation
          mutation={CREATE_DECK}
          onCompleted={({ createDeck: { deck: { id }}}) => this.goBack()}
        >
          {mutate => (
            <Fragment>
              <View style={styles.root}>
                <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
                  <MaterialIcons name="close" size={50} color="#F5F5F5" />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{this.state.label}</Text>
                  <TextInput
                    style={[styles.textInput, {margin: 5}]}
                    placeholder={'State Capitals'}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.email}
                    autoFocus={true}
                    keyboardType={'default'}
                    returnKeyType={'done'}
                    maxLength={150}
                    autoCapitalize={'words'}
                  />
                </View>
                <TouchableOpacity style={styles.submitButtonContiner} onPress={() => mutate({ variables: { input: { deck: { title: this.state.text, userUid: uid}}}})}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
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
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#000000',
    shadowColor: '#FAFAFA',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  textContainer: {
    margin: 0,
  },
  text: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
  },
  textInput: {
    padding: 20,
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '400',
    backgroundColor: '#9E9E9E',
  },
  submitButtonContiner: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#FFFFFF',
    fontSize: 28,
    fontWeight: '400',
    backgroundColor: '#9E9E9E',
  },
  submitButtonText: {
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    fontWeight: '400',
    backgroundColor: '#9E9E9E',
  },
});

CreateDeck.defaultProps = {
  label: 'Create Deck',
};

CreateDeck.propTypes = {}

const mapStateToProps = state => ({
  uid: getUID(state),
});

export default connect(
  mapStateToProps,
  null,
)(CreateDeck);
