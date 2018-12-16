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

export const QueryWrapper = ({ children, ...rest }) => (
  <Query {...rest}>
    {({ loading, error, data, fetchMore, networkStatus, refetch }) => {
      if (loading && networkStatus !== 3) {
        return <ActivityIndicator size="large" color="#0000ff" />
      }

      if (error) {
        return (
            <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Text type="error">{`Error! ${error.message}`}</Text>
              <Button onClick={() => {refetch()}} title={'Retry?'}></Button>
            </View>
        )
      }

      return children({ loading, error, data, fetchMore, networkStatus })
    }}
  </Query>
)

QueryWrapper.propTypes = {
  children: PropTypes.func.isRequired,
}

export default QueryWrapper
