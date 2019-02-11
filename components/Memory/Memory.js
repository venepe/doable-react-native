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
import { getActiveCard, getActiveCards, getPotentialCards } from '../../reducers';
import { getHeaderButtonColor, getRandomIndex, getRandomInt, getThreeRandomIndexes } from '../../utilities';
import styles from './styles';
const THREE = 3;

class Memory extends Component {

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
    this.goToFlashcardGame = this.goToFlashcardGame.bind(this);
    this.onGuess = this.onGuess.bind(this);
    this.onCorrect = this.onCorrect.bind(this);
    this.onWrong = this.onWrong.bind(this);
    this.randomize = this.randomize.bind(this);
    this.getCurrentCardIndex = this.getCurrentCardIndex.bind(this);

    const potentialCards = props.potentialCards;
    this.state = {
      activeCard: props.activeCard,
      activeCards: props.activeCards,
      potentialCards: potentialCards,
      randomIndexes: getThreeRandomIndexes(potentialCards.length),
      randomIndex: getRandomIndex(-1, THREE),
      availableAnswers: potentialCards.length,
    };
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeCard !== prevProps.activeCard) {
      this.setState({
        activeCard: props.activeCard,
      });
    }
    if (props.activeCards !== prevProps.activeCards) {
      this.setState({
        activeCards: props.activeCards,
      });
    }
  }

  randomize() {
    const { availableAnswers } = this.state;
    this.setState({
      randomIndexes: getThreeRandomIndexes(availableAnswers),
      randomIndex: getRandomIndex(-1, THREE),
    });

  }

  goBack() {
    this.props.navigation.goBack();
  }

  goToFlashcardGame() {
    this.props.navigation.replace('DisplayModal');
  }

  onGuess(guess) {
    const { activeCard } = this.state;
    if (guess === activeCard.backText) {
      this.onCorrect();
    } else {
      this.onWrong();
    }
  }

  onCorrect() {
    const { activeCard, activeCards } = this.state;
    if (activeCards.length > 1) {
      const index = this.getCurrentCardIndex();

      this.randomize();
      this.props.removeActiveCardAtIndexAndSetActiveCard({ payload: { index } });
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
    Alert.alert(
      activeCard.frontText,
      activeCard.backText,
      [
        { text: 'Okay', onPress: () => {
          const idx = this.getCurrentCardIndex();

          let nextIdx = getRandomIndex(idx, activeCards.length);
          let nextCard = activeCards[nextIdx];
          this.randomize();
          this.props.setActiveCard({ payload: { activeCard: nextCard } });
        }},
      ],
      { cancelable: false }
    );
  }

  render() {
    const { navigation } = this.props;
    const { randomIndexes, randomIndex, potentialCards, activeCard } = this.state;
    console.log(potentialCards.length);
    let buttonValues = [];
    randomIndexes.map((val, ind) => {
      if (potentialCards[val]) {
        buttonValues.push(potentialCards[val].backText);
      } else {
        buttonValues.push(ind);
      }
    });
    buttonValues.splice(randomIndex, 0, activeCard.backText);

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.topButtonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
              <MaterialIcons name="keyboard-arrow-down" size={40} color="#FAFAFA" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.gameButton} onPress={this.goToFlashcardGame}>
              <MaterialIcons name="games" size={40} color="#FAFAFA" />
            </TouchableOpacity>
          </View>
            <Text style={styles.title}>{this.state.activeCard.frontText}</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <TouchableOpacity style={[styles.topButton, {backgroundColor: '#7C4DFF'}]} onPress={() => this.onGuess(buttonValues[0])}>
              <Text style={styles.text}>{buttonValues[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.topButton, {backgroundColor: '#3D5AFE'}]} onPress={() => this.onGuess(buttonValues[1])}>
              <Text style={styles.text}>{buttonValues[1]}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.columnContainer}>
            <TouchableOpacity style={[styles.topButton, {backgroundColor: '#00B0FF'}]} onPress={() => this.onGuess(buttonValues[2])}>
              <Text style={styles.text}>{buttonValues[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.topButton, {backgroundColor: '#00B8D4'}]} onPress={() => this.onGuess(buttonValues[3])}>
              <Text style={styles.text}>{buttonValues[3]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

Memory.navigationOptions = (props) => {
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

Memory.defaultProps = {
  activeCard: {},
};

const mapStateToProps = state => ({
  activeCard: getActiveCard(state),
  activeCards: getActiveCards(state),
  potentialCards: getPotentialCards(state),
});

export default connect(
  mapStateToProps,
  { setActiveCard, removeActiveCardAtIndexAndSetActiveCard },
)(Memory);
