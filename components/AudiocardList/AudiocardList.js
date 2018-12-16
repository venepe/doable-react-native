import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AudiocardItem from '../AudiocardItem';
import Placeholder from '../Placeholder';
import Player from '../Player';
import Query from '../Query';
import { ALL_AUDIOCARDS } from '../../queries';

class AudiocardList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Audiocards',
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
    this.renderItem = this.renderItem.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
  }

  renderItem({ item }) {
    console.log(item);
    return (
      <AudiocardItem audiocardItem={item} />
    )
  }

  onPressRow(item) {
    console.log('did press item ', item);
    this.props.navigation.navigate('FlashcardDetail');
  }

  renderPlaceholder() {
    return (
      <Placeholder text={'Record an Audiocard and Start Learning!'}></Placeholder>
    );
  }

  render() {
    return (
      <View style={styles.root}>
        <Query
        query={ALL_AUDIOCARDS}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { allAudiocards }, fetchMore, networkStatus}) => {

          if (allAudiocards.edges.length < 1) {
            return (
              <Placeholder text={'Record an Audiocard and Start Learning!'}></Placeholder>
            );
          }
          let list = allAudiocards.edges.map(({ node }) => {
            return { ...node };
          });
          console.log(list);
          return (
            <FlatList
              data={list}
              keyExtractor={(node) => node.nodeId}
              renderItem={this.renderItem}
            />
          )
        }}
        </Query>
        <Player />
      </View>
    )
  }
}

AudiocardList.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: 'Audiocards',
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

AudiocardList.defaultProps = {};

AudiocardList.propTypes = {}

export default AudiocardList;
