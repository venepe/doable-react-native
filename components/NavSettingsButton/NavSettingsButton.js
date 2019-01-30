import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { connect } from 'react-redux';
import { getUID } from '../../reducers';
import { getHeaderButtonColor } from '../../utilities';

class NavSettingsButton extends Component {
  static propTypes = {}

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          uid: nextProps.uid,
        }
      }

  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.uid !== prevProps.uid) {
      this.setState({
        uid: props.uid,
      });
    }
  }

  render() {
    const { uid } = this.state;
    if (uid && uid.length > 0) {
      return (
        <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
          <MaterialIcons name='settings' size={28} color={getHeaderButtonColor()} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

NavSettingsButton.defaultProps = {
  onPress: () => {},
};

NavSettingsButton.propTypes = {

}

const mapStateToProps = state => ({
  uid: getUID(state),
});

export default connect(
  mapStateToProps,
)(NavSettingsButton);
