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
import DeckItem from '../DeckItem';
import Placeholder from '../Placeholder';
import { getDecks } from '../../reducers';

class DeckList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Decks',
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
          decks: nextProps.decks,
        }
      }

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
    this.state = {
      decks: props.decks,
    }
  }

  componentDidMount() {
    // this.props.findContacts();
    // console.log('find!');
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.decks !== prevProps.decks) {
      this.setState({
        decks: props.decks,
      });
    }
  }

  renderItem({ item, index }) {
    return (
      <DeckItem deck={item} key={index} rowID={index} onPress={this.onPressRow} />
    )
  }

  onPressRow(item) {
    console.log('did press item ', item);
    this.props.navigation.navigate('FlashcardList');
  }

  renderPlaceholder() {
    return (
      <Placeholder text={'Create a Deck to Get Started!'}></Placeholder>
    );
  }

  renderList() {
    return (
      <FlatList
        data={this.state.decks}
        keyExtractor={(deck) => deck.index}
        renderItem={this.renderItem}
      />
    );
  }

  render() {
    let mainComponent = (this.state.decks && this.state.decks.length > 0) ? this.renderList() : this.renderPlaceholder();
    return (
      <View style={styles.root}>
        {mainComponent}
      </View>
    )
  }
}

DeckList.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: 'Decks',
    headerStyle: {
      backgroundColor: '#000D11',
    },
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
  placeholder: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '400',
  },
});

DeckList.defaultProps = {};

DeckList.propTypes = {}

const mapStateToProps = state => ({
  decks: getDecks(state),
});

export default connect(
  mapStateToProps,
  { },
)(DeckList);
