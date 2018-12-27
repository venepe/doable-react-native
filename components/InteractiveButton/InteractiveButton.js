import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/index';
import { connect } from 'react-redux';
import { setIsInteractive } from '../../actions';
import { getIsInteractive } from '../../reducers';

class InteractiveButton extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          isInteractive: nextProps.isInteractive,
        }
      }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      isInteractive: props.isInteractive,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.isInteractive !== prevProps.isInteractive) {
      this.setState({
        isInteractive: props.isInteractive,
      });
    }
  }

  onPress() {
    let { isInteractive } = this.state;
    isInteractive = !isInteractive;
    this.props.setIsInteractive({ payload: { isInteractive } });
  }

  render() {
    const { isInteractive } = this.state;
    const icon = isInteractive === true ? 'mic' : 'mic-off';
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.inter} onPress={this.onPress}>
          <MaterialIcons name={icon} size={55} color="#FAFAFA" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
});

InteractiveButton.defaultProps = {
  label: 'Create Deck',
};

InteractiveButton.propTypes = {}

const mapStateToProps = state => ({
  isInteractive: getIsInteractive(state),
});

export default connect(
  mapStateToProps,
  { setIsInteractive },
)(InteractiveButton);
