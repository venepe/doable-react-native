import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import { uploadDocument } from '../../actions';
import DocumentItem from '../DocumentItem';
import NavAddButton from '../NavAddButton';
import Placeholder from '../Placeholder';
import Query from '../Query';
import { getIsLoading } from '../../reducers';
import { DOCUMENT_BY_CARD_NODEID } from '../../queries';

class DocumentList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isLoading.length > 0) {
          return {
            isLoading: nextProps.isLoading,
          }
        }
      }

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
    this.onDone = this.onDone.bind(this);

    this.state = {
      isLoading: props.isLoading,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.isLoading !== prevProps.isLoading) {
      this.setState({
        isLoading: props.isLoading,
      });
    }
  }

  renderItem({ item }) {
    return (
      <DocumentItem documentItem={item} onPress={this.onPressRow} />
    )
  }

  onPressRow({ id }) {
    const { navigation } = this.props;
    const deckId = navigation.getParam('deckId');
    this.props.navigation.navigate('CreateCardModal', {
      documentId: id,
      deckId,
    });
  }

  onDone() {
    const { navigation } = this.props;
    const deckId = navigation.getParam('deckId');
    this.props.uploadDocument({ payload: { deckId } });
  }

  render() {
    const { navigation } = this.props;
    const deckId = navigation.getParam('deckId');

    return (
      <View style={styles.root}>
        <ActivityIndicator animating={this.state.isLoading} hidesWhenStopped={true} size="large" color="#FAFAFA" />
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
              <AppIntroSlider slides={slides} onDone={() => this.onDone()}/>
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
  image200: {
    width: 200,
    height: 200,
  },
  image320: {
    width: 320,
    height: 320,
  },
});

const slides = [
  {
    key: 'capture',
    title: 'Capture Your Card',
    text: 'Take a picture of what you are learning.',
    image: require('../../assets/camera.png'),
    imageStyle: styles.image200,
    backgroundColor: '#7E57C2',
  },
  {
    key: 'ai',
    title: 'Make Magic Happen',
    text: 'Wait while we we convert your image to text',
    image: require('../../assets/wand.png'),
    imageStyle: styles.image200,
    backgroundColor: '#FFB300',
  },
  {
    key: 'select',
    title: 'Make Your Card',
    text: 'Drag the text to the front or back',
    image: require('../../assets/list.png'),
    imageStyle: styles.image200,
    backgroundColor: '#26A69A',
  }
];

DocumentList.defaultProps = {};

DocumentList.propTypes = {}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(
  mapStateToProps,
  { uploadDocument },
)(DocumentList);
