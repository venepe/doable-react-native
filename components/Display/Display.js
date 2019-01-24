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
import { getActiveCard } from '../../reducers';
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

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          activeCard: nextProps.activeCard,
        }
      }

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.onAnswer = this.onAnswer.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);

    this.state = {
      activeCard: props.activeCard,
      show: false,
    };

  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeCard !== prevProps.activeCard) {
      this.setState({
        activeCard: props.activeCard,
      });
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderAnswer() {
    const { activeCard, show } = this.state;
    if (show) {
      return (
        <Text style={styles.title}>{this.state.activeCard.backText}</Text>
      );
    }
  }

  onAnswer() {
    this.setState({
      show: true,
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.onAnswer}>
        <View style={styles.subContainer}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={this.goBack}>
              <MaterialIcons name="keyboard-arrow-down" size={40} color="#FAFAFA" />
            </TouchableOpacity>
            <Text style={styles.title}>{this.state.activeCard.frontText}</Text>
            { this.renderAnswer() }
        </View>
        <View style={styles.controlGroup}>
          <View style={styles.controlTopGroup}>
            <TouchableOpacity style={styles.topButton} onPress={this.onPressSubmit}>
              <MaterialIcons name="cancel" size={90} color={'#FF5252'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topButton} onPress={this.onPressSubmit}>
              <MaterialIcons name="check-circle" size={90} color={'#69F0AE'} />
            </TouchableOpacity>
          </View>
          <View style={styles.controlBottomGroup}>
            <View></View>
            <TouchableOpacity style={styles.bottomButton} onPress={this.onPressSubmit}>
              <MaterialIcons name="shuffle" size={40} color={'#FF5252'} />
            </TouchableOpacity>
            <View></View>
            <TouchableOpacity style={styles.bottomButton} onPress={this.onPressSubmit}>
              <MaterialIcons name="repeat" size={40} color={'#FF5252'} />
            </TouchableOpacity>
            <View></View>
          </View>
        </View>
      </TouchableOpacity>
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

const mapStateToProps = state => ({
  activeCard: getActiveCard(state),
});

export default connect(
  mapStateToProps,
  null,
)(Display);
