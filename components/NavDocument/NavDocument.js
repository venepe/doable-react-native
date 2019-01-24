import React, { Component } from 'react';
import { ImagePicker, Permissions } from 'expo';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { connect } from 'react-redux';
import { getIsLoading } from '../../reducers';
import { uploadImage } from '../../actions';
import { getHeaderButtonColor } from '../../utilities';

class NavDocument extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);

    this.state = {
      deckId: props.deckId,
    }
  }

  onPress() {
    const { navigation } = this.props;
    const { deckId } = this.state;
    this.props.navigation.navigate('DocumentList', {
      deckId,
    });
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <MaterialIcons name="add" size={40} color={getHeaderButtonColor()} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: 'transparent',
  },
});

NavDocument.defaultProps = {
};

NavDocument.propTypes = {

}

export default NavDocument;
