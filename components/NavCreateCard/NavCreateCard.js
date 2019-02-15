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
import { getHeaderButtonColor } from '../../utilities';

class NavCreateCard extends Component {
  static propTypes = {}

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          documentId: nextProps.documentId,
        }
      }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);

    this.state = {
      deckId: props.deckId,
      documentId: props.documentId,
    }
  }

  onPress() {
    const { navigation } = this.props;
    const { deckId, documentId } = this.state;
    this.props.navigation.navigate('CreateCardModal', {
      documentId,
      deckId,
    });
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.documentId !== prevProps.documentId) {
      this.setState({
        documentId: props.documentId,
      });
    }
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

NavCreateCard.defaultProps = {
  deckId: '',
  documentId: '',
};

NavCreateCard.propTypes = {

}

export default NavCreateCard;
