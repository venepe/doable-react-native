import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
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
import { DOCUMENT_BY_ID, CARDS_BY_DECK_NODEID } from '../../queries';
import { getBackText, getFrontText, getUID } from '../../reducers';
import {
  addFrontTextWord,
  addBackTextWord,
  clearFrontText,
  clearBackText,
  removeFrontTextWordAtIndex,
  removeBackTextWordAtIndex,
  } from '../../actions';
const EDITING = {
  FRONT_TEXT: 'FRONT_TEXT',
  BACK_TEXT: 'BACK_TEXT',
};

let STATUSES = {
  FRONT_TEXT: {},
  BACK_TEXT: {},
};

const WORDS_TO_INDEX = {
  FRONT_TEXT: [],
  BACK_TEXT: [],
};

let BACKGROUND_COLOR = {
  FRONT_TEXT: '#00B0FF',
  BACK_TEXT: '#FF8A80',
};

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
          }
      }

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.onPressWord = this.onPressWord.bind(this);
    this.setEditingText = this.setEditingText.bind(this);
    this.state = {
      uid: props.uid,
      backText: props.backText,
      frontText: props.frontText,
      editingText: EDITING.FRONT_TEXT,
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
  }

  onPressWord({ index, word, isActive }) {
    const { frontText, backText } = this.props;
    const { editingText } = this.state;
    STATUSES[editingText][index] = isActive;
    const indexToRemove = WORDS_TO_INDEX[editingText].findIndex((elm) => {
      return elm === index;
    });
    console.log(indexToRemove);
    if (editingText === EDITING.FRONT_TEXT) {
      if (isActive) {
        WORDS_TO_INDEX[editingText].push(index);
        this.props.addFrontTextWord( { payload: { frontTextWord: word } });
      } else {
        WORDS_TO_INDEX[editingText].splice(indexToRemove, 1);
        this.props.removeFrontTextWordAtIndex( { payload: { index: indexToRemove } });
      }
    } else {
      if (isActive) {
        WORDS_TO_INDEX[editingText].push(index);
        this.props.addBackTextWord( { payload: { backTextWord: word } });
      } else {
        WORDS_TO_INDEX[editingText].splice(indexToRemove, 1);
        this.props.removeBackTextWordAtIndex( { payload: { index: indexToRemove } });
      }
    }
  }

  goBack() {
    this.props.clearBackText();
    this.props.clearFrontText();
    this.props.navigation.goBack();
  }

  onPressSubmit() {
    if (!this.isDisabled()) {
      const { navigation } = this.props;
      const { backText, frontText } = this.state;
      const documentId = navigation.getParam('documentId');
      const deckId = navigation.getParam('deckId');
      this.props.client.mutate({
        mutation: CREATE_CARD,
        variables: { input: { card: {
          deckId,
          documentId,
          frontText,
          backText,
        }}},
        update: ((cache, { data: { createCard } }) => {
          const { deckById } = cache.readQuery({ query: CARDS_BY_DECK_NODEID, variables: {
            id: deckId,
          } });
          deckById.cardsByDeckId.edges.push({ node: createCard.card })
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

  setEditingText(editingText) {
    this.setState({
      editingText,
    });
  }

  render() {
    const { navigation, backText, frontText } = this.props;
    let { editingText } = this.state;
    const documentId = navigation.getParam('documentId');
    let checkCircleColor = this.isDisabled() ? '#616161' : '#FAFAFA'
    let isFrontLabelActive = editingText === EDITING.FRONT_TEXT;
    let isBackLabelActive = editingText === EDITING.BACK_TEXT;

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
            <View style={styles.container}>
            {
              words.map((word, idx) => {
                return (
                  <WordButton key={idx}
                    isActive={STATUSES[editingText][idx] === true}
                    backgroundColor={BACKGROUND_COLOR[editingText]}
                    word={word} index={idx}
                    onPress={this.onPressWord}
                    />
                )
              })
            }
            </View>
          )
        }}
        </Query>
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
    flex: 1,
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
    maxHeight:  72,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
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
});

export default withApollo(connect(
  mapStateToProps,
  {
    addFrontTextWord,
    addBackTextWord,
    clearBackText,
    clearFrontText,
    removeFrontTextWordAtIndex,
    removeBackTextWordAtIndex,
  },
)(CreateCard));
