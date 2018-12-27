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
import { getActiveAudiocard, getActiveUri } from '../../reducers';
import Player from '../Player';
import InteractiveButton from '../InteractiveButton';
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

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          activeAudiocard: nextProps.activeAudiocard,
          activeUri: nextProps.activeUri,
        }
      }

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);

    this.state = {
      activeAudiocard: props.activeAudiocard,
      activeUri: props.activeUri,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeAudiocard !== prevProps.activeAudiocard) {
      this.setState({
        activeAudiocard: props.activeAudiocard,
      });
    }
    if (props.activeUri !== prevProps.activeUri) {
      this.setState({
        activeUri: props.activeUri,
      });
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderAnswer() {
    const { activeUri, activeAudiocard } = this.state;
    if (activeUri === activeAudiocard.answerAudioUri) {
      return (
        <Text style={styles.title}>{this.state.activeAudiocard.answerText}</Text>
      );
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={this.goBack}>
              <MaterialIcons name="keyboard-arrow-down" size={40} color="#FAFAFA" />
            </TouchableOpacity>
            <Text style={styles.title}>{this.state.activeAudiocard.questionText}</Text>
            {this.renderAnswer()}
        </View>
        <View style={styles.interactiveContainer}>
          <InteractiveButton />
        </View>
        <View style={styles.playerContainer}>
          <Player />
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
  activeAudiocard: {},
};

const mapStateToProps = state => ({
  activeAudiocard: getActiveAudiocard(state),
  activeUri: getActiveUri(state),
});

export default connect(
  mapStateToProps,
)(Display);
