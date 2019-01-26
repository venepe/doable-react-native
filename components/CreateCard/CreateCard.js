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
import Draggable from '../Draggable';
import WordButton from '../WordButton';
import BackText from '../BackText';
import FrontText from '../FrontText';
import { CREATE_CARD } from '../../mutations';
import { DOCUMENT_BY_ID, CARDS_BY_DECK_NODEID } from '../../queries';
import { getBackText, getFrontText, getUID } from '../../reducers';
import { clearFrontText, clearBackText } from '../../actions';

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
        if (nextProps.backText.length > 0) {
          return {
            backText: nextProps.backText,
          }
        }
        if (nextProps.frontText.length > 0) {
          return {
            frontText: nextProps.frontText,
          }
        }
      }

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.state = {
      uid: props.uid,
      backText: props.backText,
      frontText: props.frontText,
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

  goBack() {
    this.props.clearBackText();
    this.props.clearFrontText();
    this.props.navigation.goBack();
  }

  onPressSubmit() {
    console.log('onPressSubmit');
    console.log(this.isDisabled());
    if (!this.isDisabled()) {
      console.log('did press answer');
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
        console.log('yes');
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

  render() {
    const { navigation } = this.props;
    const documentId = navigation.getParam('documentId');
    const { backText, frontText } = this.props;
    let checkCircleColor = this.isDisabled() ? '#616161' : '#FAFAFA'
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
        <FrontText style={styles.frontContainer} />
        <Text>Back Text</Text>
        <BackText style={styles.backContainer} />
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
                  <WordButton word={word} />
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
  { clearBackText, clearFrontText },
)(CreateCard));
