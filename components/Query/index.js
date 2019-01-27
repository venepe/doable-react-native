import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const IS_FETCHING_MORE = 3;

export const QueryWrapper = ({ children, ...rest }) => (
  <Query {...rest}>
    {({ loading, error, data, fetchMore, networkStatus, refetch }) => {
      if (loading && networkStatus !== 3) {
        return (
          <ActivityIndicator style={styles.spinner} size='large' color='#FAFAFA' />
        );
      }

      if (error) {
        return (
          <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={styles.error} type='error'>{`Error! ${error.message}`}</Text>
            <Button color={'#9E9E9E'} onPress={() => {refetch()}} title={'Retry?'}></Button>
          </View>
        );
      }

      return children({ loading, error, data, fetchMore, networkStatus })
    }}
  </Query>
)

const styles = StyleSheet.create({
  error: {
    color: '#FAFAFA',
    padding: 10,
  },
  spinner: {
    padding: 15,
  },
});

QueryWrapper.propTypes = {
  children: PropTypes.func.isRequired,
}

export default QueryWrapper
