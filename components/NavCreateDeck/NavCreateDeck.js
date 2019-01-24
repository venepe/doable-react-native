  import React, { Component } from 'react';
  import PropTypes from 'prop-types';
  import {
    Button,
    StyleSheet,
    TouchableOpacity,
    View,
  } from 'react-native';
  import { MaterialIcons } from '@expo/vector-icons/index';
  import { getHeaderButtonColor } from '../../utilities';

  class NavCreateDeck extends Component {
    static propTypes = {}

    constructor(props) {
      super(props);
      this.onPress = this.onPress.bind(this);
    }

    onPress() {
      const { navigation } = this.props;
      const { navigate } = navigation;
      navigate('CreateDeckModal');
    }

    render() {
      return (
        <TouchableOpacity style={styles.create} onPress={this.onPress}>
          <MaterialIcons name="add" size={40} color={getHeaderButtonColor()} />
        </TouchableOpacity>
      );
    }
  }

  const styles = StyleSheet.create({
    create: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlButton: {
      backgroundColor: 'transparent',
    },
  });

  NavCreateDeck.defaultProps = {
  };

  NavCreateDeck.propTypes = {
  }

  export default NavCreateDeck;
