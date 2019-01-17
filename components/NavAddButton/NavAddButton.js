import React, { Component } from 'react';
import { ImagePicker, Permissions } from 'expo';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { connect } from 'react-redux';
import { getIsLoading } from '../../reducers';
import { uploadImage } from '../../actions';
import { getHeaderButtonColor } from '../../utilities';

class NavAddButton extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.add = this.add.bind(this);

    this.state = {
      deckId: props.deckId,
    }
  }

  add() {
    const permissions = Permissions.CAMERA_ROLL;
    Permissions.askAsync(permissions).then(({ status }) => {
      if (status === 'granted') {
        ImagePicker.launchImageLibraryAsync({ mediaTypes: 'Images', allowsEditing: false })
          .then((result) => {
            if (!result.cancelled) {
              const { uri } = result;
              const { deckId } = this.state;
              this.props.uploadImage({ payload: { uri, deckId } });
            }
          });
      }
    });
  }

  render() {
    return (
      <View style={styles.play}>
        <Button title={'Add'} color={getHeaderButtonColor()} onPress={this.add} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  play: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: 'transparent',
  },
});

NavAddButton.defaultProps = {
};

NavAddButton.propTypes = {

}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(
  mapStateToProps,
  { uploadImage },
)(NavAddButton);
