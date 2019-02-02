import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { logoutUser } from '../../helpers/logout';
class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.navigateToWelcome = this.navigateToWelcome.bind(this);
  }

  onPress() {
    logoutUser().then(() => {
      this.props.navigation.closeDrawer();
      this.navigateToWelcome();
    });
  }

  navigateToWelcome() {
    const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Welcome'})
    ] })
    this.props.navigation.dispatch(resetAction);
  }

  render () {
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPress()}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#FF1744',
  },
  text: {
    color: '#FAFAFA',
    fontSize: 18,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
    textAlign: 'center',
  },
});

export default SideMenu;
