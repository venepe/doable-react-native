import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import styles from './styles';

class DocumentItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    onPress: PropTypes.func,
    deleteDocument: PropTypes.func,
  }

  static defaultProps = {
    rowID: 0,
    onPress: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      rowID: props.rowID,
      documentItem: props.documentItem,
    };
  }

  render() {
    let color = '#FF8A80';

    const documentItem = this.state.documentItem || {};
    const opacity = 1.0;

    console.log(documentItem.text);

    return (
        <TouchableOpacity onPress={() => this.props.onPress({ id: documentItem.id })}>
          <View style={[styles.document, styles.container, { opacity }]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title]}>{documentItem.text}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}

DocumentItem.fragments = {
  documentItem: gql`
    fragment DocumentItem on Document {
      nodeId
      id
      imageUri
      text
      createdAt
    }
  `,
};

DocumentItem.propTypes = {
  documentItem: propType(DocumentItem.fragments.documentItem).isRequired,
};

export default DocumentItem;
