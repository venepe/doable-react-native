import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { getHeaderButtonColor } from '../../utilities';

class NavSettingsButton extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
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
