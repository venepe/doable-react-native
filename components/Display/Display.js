import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons/index';
import Query from '../Query';
import { connect } from 'react-redux';
import { getHeaderButtonColor } from '../../utilities';
import styles from './styles';


class Display extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: '',
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
    this.renderAnswer = this.renderAnswer.bind(this);

  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderAnswer() {
    // const { activeUri, activeCard } = this.state;
    // if (activeUri === activeCard.answerAudioUri) {
    //   return (
    //     <Text style={styles.title}>{this.state.activeCard.answerText}</Text>
    //   );
    // }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={this.goBack}>
              <MaterialIcons name="keyboard-arrow-down" size={40} color="#FAFAFA" />
            </TouchableOpacity>
            <Text style={styles.title}>{'this.state.activeCard.questionText'}</Text>
            { this.renderAnswer() }
        </View>
      </View>
    )
  }
}

Display.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: '',
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

Display.defaultProps = {
  activeCard: {},
};

export default Display;
