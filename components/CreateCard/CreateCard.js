import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import Query from '../Query';
import WordButton from '../WordButton';
import BackText from '../BackText';
import FrontText from '../FrontText';
import { CREATE_CARD } from '../../mutations';
import { DOCUMENT_BY_ID, CARDS_BY_DECK_NODEID, DOCUMENT_BY_CARD_NODEID } from '../../queries';
import {
  getBackText,
  getFrontText,
  getUID,
  getFrontTextIndexesOnDocument,
  getBackTextIndexesOnDocument,
  getCardEditingStatus,
} from '../../reducers';
import { clearCardEditing, setCardEditingStatus } from '../../actions';
import { getDisplayText } from '../../utilities';
import { EDITING } from '../../constants/Enums';

class CreateCard extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Create Card',
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
            backText: nextProps.backText,
            frontText: nextProps.frontText,
            cardEditingStatus: nextProps.cardEditingStatus,
          }
      }

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.setEditingText = this.setEditingText.bind(this);
    this.state = {
      uid: props.uid,
      backText: props.backText,
      frontText: props.frontText,
      cardEditingStatus: props.cardEditingStatus,
      documentId: props.navigation.getParam('documentId')
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.backText !== prevProps.backText) {
      this.setState({
        backText: props.backText,
      });
    }
    if (props.frontText !== prevProps.frontText) {
      this.setState({
        frontText: props.frontText,
      });
    }
    if (props.cardEditingStatus !== prevProps.cardEditingStatus) {
      this.setState({
        cardEditingStatus: props.cardEditingStatus,
      });
    }
  }

  goBack() {
    this.props.clearCardEditing();
    this.props.navigation.goBack();
  }

  onNext() {
    const { navigation } = this.props;
    const { documentId } = this.state;
    const deckId = navigation.getParam('deckId');
    const { deckById } = this.props.client.readQuery({ query: DOCUMENT_BY_CARD_NODEID, variables: {
      id: deckId,
    } });
    const documentEdges = deckById.documentsByDeckId.edges;
    if (documentEdges.length > 0) {
      let currentDocumentIndex = documentEdges.findIndex(({ node }) => {
        return node.id === documentId;
      });
      let nextDocumentIndex = currentDocumentIndex + 1;
      if (nextDocumentIndex >= documentEdges.length) {
        nextDocumentIndex = 0;
      }
      let nextDocumentId = documentEdges[nextDocumentIndex].node.id;
      this.setState({
        documentId: nextDocumentId,
      });
    }
  }

  onPrevious() {
    const { navigation } = this.props;
    const { documentId } = this.state;
    const deckId = navigation.getParam('deckId');
    const { deckById } = this.props.client.readQuery({ query: DOCUMENT_BY_CARD_NODEID, variables: {
      id: deckId,
    } });
    const documentEdges = deckById.documentsByDeckId.edges;
    if (documentEdges.length > 0) {
      let currentDocumentIndex = documentEdges.findIndex(({ node }) => {
        return node.id === documentId;
      });
      let previousDocumentIndex = currentDocumentIndex + -1;
      if (previousDocumentIndex <= 0) {
        previousDocumentIndex = documentEdges.length - 1;
      }
      let previousDocumentId = documentEdges[previousDocumentIndex].node.id;
      this.setState({
        documentId: previousDocumentId,
      });
    }
  }


  onPressSubmit() {
    if (!this.isDisabled()) {
      const { navigation, frontTextIndexesOnDocument, backTextIndexesOnDocument } = this.props;
      const { backText, frontText, documentId } = this.state;
      const deckId = navigation.getParam('deckId');

      this.props.client.mutate({
        mutation: CREATE_CARD,
        variables: { input: { card: {
          deckId,
          frontText: getDisplayText(frontText),
          backText: getDisplayText(backText),
          frontTextIndexes: JSON.stringify(frontTextIndexesOnDocument),
          backTextIndexes: JSON.stringify(backTextIndexesOnDocument),
        }}},
        update: ((cache, { data: { createCard } }) => {
          const { deckById } = cache.readQuery({ query: CARDS_BY_DECK_NODEID, variables: {
            id: deckId,
          } });
          deckById.cardsByDeckId.edges.unshift({ __typename: 'CardsEdge', node: createCard.card })
          cache.writeQuery({
            query: CARDS_BY_DECK_NODEID,
            data: { deckById },
          });
        }),
      })
      .then(() => {
        this.goBack();
      });
    }
  }

  isDisabled() {
    const { backText, frontText } = this.state;
    if (backText.length > 0 && frontText.length > 0) {
      return false;
    }
    return true;
  }

  setEditingText(cardEditingStatus) {
    this.props.setCardEditingStatus({ payload: { cardEditingStatus } });
  }

  render() {
    const { documentId, cardEditingStatus, backText, frontText } = this.state;
    const { navigation } = this.props;
    let checkCircleColor = this.isDisabled() ? '#616161' : '#FAFAFA';
    let isFrontLabelActive = cardEditingStatus === EDITING.FRONT_TEXT;
    let isBackLabelActive = cardEditingStatus === EDITING.BACK_TEXT;

    return (
      <View style={styles.root}>
        <View style={styles.topBottomContainer}>
          <TouchableOpacity style={styles.backButtonContainer} onPress={this.goBack}>
            <MaterialIcons name="keyboard-arrow-down" size={40} color="#FAFAFA" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButtonContainer} onPress={this.onPressSubmit}>
            <MaterialIcons name="check-circle" size={40} color={checkCircleColor} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.setEditingText(EDITING.FRONT_TEXT)}>
          <FrontText isActive={isFrontLabelActive} style={styles.frontContainer} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setEditingText(EDITING.BACK_TEXT)}>
          <BackText isActive={isBackLabelActive} style={styles.backContainer} />
        </TouchableOpacity>
      <View style={styles.rowContainer}>
        <Query
        query={DOCUMENT_BY_ID}
        variables={{ id: documentId }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { documentById: { text } } }) => {
          let words = text.split(/\s+/);
          return (
            <ScrollView contentContainerStyle={styles.container}>
            {
              words.map((word, idx) => {
                return (
                  <WordButton
                    key={idx}
                    documentId={documentId}
                    word={word}
                    index={idx}
                    />
                )
              })
            }
            </ScrollView>
          )
        }}
        </Query>
      </View>
      <View style={styles.leftButtonContainer}>
        <TouchableOpacity style={styles.fetchButton} onPress={this.onPrevious}>
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#FAFAFA" />
        </TouchableOpacity>
      </View>
      <View style={styles.rightButtonContainer}>
        <TouchableOpacity style={styles.fetchButton} onPress={this.onNext}>
          <MaterialIcons name="keyboard-arrow-right" size={40} color="#FAFAFA" />
        </TouchableOpacity>
      </View>
      </View>
    )
  }
}

CreateCard.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: 'Create Deck',
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
    backgroundColor: '#212121',
  },
  frontDropContainer: {
    backgroundColor: '#1DE9B6',
    width: 50,
  },
  backDropContainer: {
    backgroundColor: '#00B0FF',
    width: 50,
  },
  frontContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  backContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  backButtonContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: 15,
    width: 58,
  },
  addButtonContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: 15,
    width: 58,
  },
  topBottomContainer: {
    flex: 1,
    marginTop: 5,
    maxHeight:  72,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '55%',
  },
  leftButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-start',
    top: '55%',
  },
  fetchButton: {
    height:60,
    width: 60,
    borderRadius: 40,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

CreateCard.defaultProps = {};

CreateCard.fragments = {
  document: gql`
    fragment CreateCard on Document {
      nodeId
      id
      imageUri
      text
      createdAt
    }
  `,
};

CreateCard.propTypes = {
  document: propType(CreateCard.fragments.document).isRequired,
};

const mapStateToProps = state => ({
  backText: getBackText(state),
  frontText: getFrontText(state),
  uid: getUID(state),
  frontTextIndexesOnDocument: getFrontTextIndexesOnDocument(state),
  backTextIndexesOnDocument: getBackTextIndexesOnDocument(state),
  cardEditingStatus: getCardEditingStatus(state),
});

export default withApollo(connect(
  mapStateToProps,
  {
    clearCardEditing,
    setCardEditingStatus,
  },
)(CreateCard));
