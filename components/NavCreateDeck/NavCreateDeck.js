import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { connect } from 'react-redux';
import { getHeaderButtonColor } from '../../utilities';
import { uploadDeck } from '../../actions';

class NavCreateDeck extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    DocumentPicker.show({
          filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
          const { uri, fileName, type } = res;
          // Android
          console.log(
             res.uri,
             res.type, // mime type
             res.fileName,
             res.fileSize
          );
          this.props.uploadDeck({ payload: { uri, type, name: fileName } });
        });
  }

  render() {
    return (
      <TouchableOpacity style={styles.create} onPress={this.onPress}>
        <MaterialIcons name="add" size={40} color={getHeaderButtonColor()} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  create: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: 'transparent',
  },
});

NavCreateDeck.defaultProps = {
};

NavCreateDeck.propTypes = {
}

export default connect(
  null,
  { uploadDeck },
)(NavCreateDeck);
