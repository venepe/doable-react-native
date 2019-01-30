import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logonUser } from '../../helpers/logon';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

class LogonButton extends Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    logonUser()
      .then(() => {
        this.props.didLogin();
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.loginButtonContainer} onPress={() => this.onPress()}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButtonContainer} onPress={() => this.onPress()}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  loginButtonContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#FF8A80',
  },
  signupButtonContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#00B0FF',
  },
  text: {
    color: '#FAFAFA',
    fontSize: 18,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
    textAlign: 'center',
  },
});

export default LogonButton;
