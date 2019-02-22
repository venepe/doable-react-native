import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { logoutUser } from '../../helpers/logout';
import { getHeaderButtonColor } from '../../utilities';

class NavSettingsButton extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onPressLogout = this.onPressLogout.bind(this);
  }

  onPress() {
    Alert.alert(
      'Log out?',
      'Do you want to log out?',
      [
        {text: 'Yes', onPress: () => this.onPressLogout()},
        {text: 'Cancel'},
      ],
      { cancelable: true }
    );
  }

  onPressLogout() {
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

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.onPress()}>
        <MaterialIcons name='settings' size={28} color={getHeaderButtonColor()} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

NavSettingsButton.defaultProps = {
  onPress: () => {},
};

NavSettingsButton.propTypes = {

}

export default NavSettingsButton;
