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
    this.onPressRowItem = this.onPressRowItem.bind(this);
    this.state = {
      decks: props.decks,
    }
  }

  componentDidMount() {
    // this.props.findContacts();
    // console.log('find!');
  }

  renderItem({ item, index }) {
    return (
      <DeckItem deck={item} rowID={index} onPress={this.onPressRow} />
    )
  }

  onPressRowItem(item) {
    console.log('did press item ', item.title);
  }

  render() {
    return (
      <View style={styles.root}>
        <FlatList
          data={this.state.decks}
          keyExtractor={(deck) => deck.index}
          renderItem={this.renderItem}
        />
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
      backgroundColor: '#0086C3',
    },
    headerTitleStyle: {
      color: '#FFFFFF',
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

DeckList.defaultProps = {};

DeckList.propTypes = {}

const mapStateToProps = state => ({
  decks: getDecks(state),
});

export default connect(
  mapStateToProps,
  { },
)(DeckList);
