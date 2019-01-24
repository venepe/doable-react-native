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

  onPress() {
    logonUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPress()}>
          <Text style={styles.text}>Log In</Text>
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
  buttonContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#FF8A80',
  },
  text: {
    color: '#00B0FF',
    fontSize: 18,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
    textAlign: 'center',
  },
});

export default LogonButton;
