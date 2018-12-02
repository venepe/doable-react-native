import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getFlashcard } from '../../reducers';

class FlashcardDetail extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Flashcard',
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
          flashcard: nextProps.flashcard,
        }
      }

  constructor(props) {
    super(props);
    this.onPressQuestion = this.onPressQuestion.bind(this);
    this.onPressAnswer = this.onPressAnswer.bind(this);
    this.state = {
      flashcard: props.flashcard,
    }
  }

  componentDidMount() {
    // this.props.findContacts();
    // console.log('find!');
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.flashcard !== prevProps.flashcard) {
      this.setState({
        flashcard: props.flashcard,
      });
    }
  }

  onPressQuestion() {
    console.log('did press question');
    this.props.navigation.navigate('RecordingModal')
  }

  onPressAnswer() {
    console.log('did press answer');
    this.props.navigation.navigate('RecordingModal')
  }

  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.rowContainer} onPress={() => this.onPressQuestion()}>
          <Text style={[styles.text, {color: '#FF4081'}]} >Question</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.rowContainer} onPress={() => this.onPressAnswer()}>
          <Text style={[styles.text, {color: '#18FFFF'}]}>Answer</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

FlashcardDetail.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: 'Flashcard',
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#212121',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#000000',
    shadowColor: '#FAFAFA',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  text: {
    color: '#EEFF41',
    fontSize: 28,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
  },
  divider: {
    flex: .01,
    backgroundColor: '#616161',
    height: 15,
  },
});

FlashcardDetail.defaultProps = {};

FlashcardDetail.propTypes = {}

const mapStateToProps = state => ({
  flashcard: getFlashcard(state),
});

export default connect(
  null,
  { },
)(FlashcardDetail);
