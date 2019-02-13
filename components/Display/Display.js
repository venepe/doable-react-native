import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons/index';
import Query from '../Query';
import { connect } from 'react-redux';
import { removeActiveCardAtIndexAndSetActiveCard, setActiveCard } from '../../actions'
import { getActiveCard, getActiveCards } from '../../reducers';
import { getHeaderButtonColor, getRandomIndex, getRandomInt } from '../../utilities';
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
          activeCards: nextProps.activeCards,
        }
      }

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.goToMemoryGame = this.goToMemoryGame.bind(this);
    this.onShow = this.onShow.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
    this.onCorrect = this.onCorrect.bind(this);
    this.onWrong = this.onWrong.bind(this);
    this.getCurrentCardIndex = this.getCurrentCardIndex.bind(this);

    this.state = {
      activeCard: props.activeCard,
      activeCards: props.activeCards,
      show: false,
    };
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeCard !== prevProps.activeCard) {
      // hidden logic... look at show
      this.setState({
        activeCard: props.activeCard,
        show: false,
      });
    }
    if (props.activeCards !== prevProps.activeCards) {
      this.setState({
        activeCards: props.activeCards,
      });
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  goToMemoryGame() {
    this.props.navigation.replace('MemoryModal');
  }

  renderAnswer() {
    const { activeCard, show } = this.state;
    if (show) {
      return (
        <Text style={styles.title}>{this.state.activeCard.backText}</Text>
      );
    }
  }

  onShow() {
    let { show } = this.state;
    show = !show;
    this.setState({
      show,
    });
  }

  onCorrect() {
    const { activeCard, activeCards } = this.state;
    if (activeCards.length > 1) {
      const index = this.getCurrentCardIndex();
      this.props.removeActiveCardAtIndexAndSetActiveCard({ payload: { index } });
      this.setState({
        show: false,
      });
    } else {
      Alert.alert(
        'Congrats!',
        'You finished this deck.',
        [
          { text: 'Okay', onPress: () => this.goBack() },
        ],
        { cancelable: false }
      );
    }
  }

  getCurrentCardIndex() {
    const { activeCard, activeCards } = this.state;
    let id = activeCard.id;
    const idx = activeCards.findIndex((card) => {
      return card.id === id;
    });
    return idx;
  }

  onWrong() {
    const { activeCard, activeCards } = this.state;
    const idx = this.getCurrentCardIndex();

    let nextIdx = getRandomIndex(idx, activeCards.length);
    let nextCard = activeCards[nextIdx];
    this.props.setActiveCard({ payload: { activeCard: nextCard, activeIndex: nextIdx } });
    this.setState({
      show: false,
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.onShow}>
        <View style={styles.subContainer}>
          <View style={styles.topButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.goBack}>
              <MaterialIcons name="keyboard-arrow-down" size={40} color="#FAFAFA" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.goToMemoryGame}>
              <MaterialIcons name="games" size={40} color="#FAFAFA" />
            </TouchableOpacity>
          </View>
            <Text style={styles.title}>{this.state.activeCard.frontText}</Text>
            { this.renderAnswer() }
        </View>
        <View style={styles.controlGroup}>
          <View style={styles.controlTopGroup}>
            <TouchableOpacity style={styles.topButton} onPress={this.onWrong}>
              <MaterialIcons name="cancel" size={90} color={'#FF5252'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topButton} onPress={this.onCorrect}>
              <MaterialIcons name="check-circle" size={90} color={'#69F0AE'} />
            </TouchableOpacity>
          </View>
          <View style={styles.controlBottomGroup}>

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
  activeCards: getActiveCards(state),
});

export default connect(
  mapStateToProps,
  { setActiveCard, removeActiveCardAtIndexAndSetActiveCard },
)(Display);
