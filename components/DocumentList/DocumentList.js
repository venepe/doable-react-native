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
import { setActiveDeckId } from '../../actions';
import DocumentItem from '../DocumentItem';
import NavAddButton from '../NavAddButton';
import Placeholder from '../Placeholder';
import Query from '../Query';
import { DOCUMENT_BY_CARD_NODEID } from '../../queries';

class DocumentList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
  }

  renderItem({ item }) {
    return (
      <DocumentItem documentItem={item} onPress={this.onPressRow} />
    )
  }

  onPressRow({ id }) {
    const { navigation } = this.props;
    this.props.navigation.navigate('DisplayModal');
  }

  renderPlaceholder() {
    return (
      <Placeholder text={'Record an Document and Start Learning!'}></Placeholder>
    );
  }

  render() {
    const { navigation } = this.props;
    const deckId = navigation.getParam('deckId');

    return (
      <View style={styles.root}>
        <Query
        query={DOCUMENT_BY_CARD_NODEID}
        variables={{ id: deckId }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { deckById }, fetchMore, networkStatus}) => {
          if (deckById && deckById.documentsByDeckId.edges.length > 0) {
            let list = deckById.documentsByDeckId.edges.map(({ node }) => {
              return { ...node };
            });
            return (
              <View style={styles.container}>
                <FlatList
                  data={list}
                  keyExtractor={(node) => node.nodeId}
                  renderItem={this.renderItem}
                />
              </View>
            )
          } else {
            return (
              <Placeholder text={'Record an Document and Start Learning!'}></Placeholder>
            );
          }
        }}
        </Query>
      </View>
    )
  }
}

DocumentList.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate, state } = navigation;
  const deckId = navigation.getParam('deckId');

  return {
    title: 'Documents',
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
    headerRight: (
     <NavAddButton deckId={deckId} />
   ),
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#212121',
  },
  container: {
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

DocumentList.defaultProps = {};

DocumentList.propTypes = {}

export default DocumentList;
