import React, { Component } from 'react';
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
import { uploadDocument } from '../../actions';
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
    const { deckId } = this.state;
    this.props.uploadDocument({ payload: { deckId } });
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.add}>
        <MaterialIcons name="add" size={40} color={getHeaderButtonColor()} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  { uploadDocument },
)(NavAddButton);
