import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import Query from '../Query';
import CreateCardWordButton from '../CreateCardWordButton';
import { DOCUMENT_BY_ID } from '../../queries';
import { getUID } from '../../reducers';

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

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.state = {
      text: props.text,
      label: props.label,
      uid: this.props.uid,
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  onPressSubmit() {
    console.log('did press answer');
  }

  render() {
    const { navigation } = this.props;
    const documentId = navigation.getParam('documentId');
    return (
      <View style={styles.root}>
        <Query
        query={DOCUMENT_BY_ID}
        variables={{ id: documentId }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { documentById: { text } } }) => {
          let words = text.split(' ');
          return (
            <View style={styles.container}>
            {
              words.map((word, idx) => {
                return (
                  <CreateCardWordButton word={word} />
                )
              })
            }
            </View>
          )
        }}
        </Query>
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
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

CreateCard.defaultProps = {
  label: 'Create Card',
};

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
  uid: getUID(state),
});

export default connect(
  mapStateToProps,
  null,
)(CreateCard);
