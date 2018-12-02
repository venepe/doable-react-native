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
import FlashcardItem from '../FlashcardItem';
import { getFlashcards } from '../../reducers';

class FlashcardList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Flashcards',
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
          flashcards: nextProps.flashcards,
        }
      }

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
    this.state = {
      flashcards: props.flashcards,
    }
  }

  componentDidMount() {
    // this.props.findContacts();
    // console.log('find!');
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.flashcards !== prevProps.flashcards) {
      this.setState({
        flashcards: props.flashcards,
      });
    }
  }

  renderItem({ item, index }) {
    return (
      <FlashcardItem flashcard={item} key={index} rowID={index} onPress={this.onPressRow} />
    )
  }

  onPressRow(item) {
    console.log('did press item ', item);
  }

  render() {
    return (
      <View style={styles.root}>
        <FlatList
          data={this.state.flashcards}
          keyExtractor={(flashcard) => flashcard.index}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

FlashcardList.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: 'Flashcards',
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
  rowItemContainer: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowItemHeader: {
    color: '#212121',
    fontSize: 22,
    fontWeight: '400',
  },
});

FlashcardList.defaultProps = {};

FlashcardList.propTypes = {}

const mapStateToProps = state => ({
  flashcards: getFlashcards(state),
});

export default connect(
  mapStateToProps,
  { },
)(FlashcardList);
