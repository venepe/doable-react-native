import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { getIsLoading, getUploadProgress } from '../../reducers';

class DocumentUploadIndicator extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
          return {
            isLoading: nextProps.isLoading,
            uploadProgress: nextProps.uploadProgress,
          }
      }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: props.isLoading,
      uploadProgress: props.uploadProgress,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.isLoading !== prevProps.isLoading) {
      this.setState({
        isLoading: props.isLoading,
      });
    }
    if (props.uploadProgress !== prevProps.uploadProgress) {
      this.setState({
        uploadProgress: props.uploadProgress,
      });
    }
  }

  render() {
    const { isLoading, uploadProgress } = this.state;
    const isIndeterminate = uploadProgress === 1 ? true : false;
    const text = isIndeterminate ? 'Analyzing' : 'Uploading';
    return (
      <View style={styles.root}>
        <Progress.Pie
          indeterminate={isIndeterminate}
          progress={uploadProgress}
          size={50}
          color={'rgba(24,255,255, 1)'}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: '#FAFAFA',
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily: 'Roboto-Thin',
  },
});

DocumentUploadIndicator.defaultProps = {};

DocumentUploadIndicator.propTypes = {}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  uploadProgress: getUploadProgress(state),
});


export default connect(
  mapStateToProps,
  null,
)(DocumentUploadIndicator);
