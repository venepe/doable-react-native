import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export const MutationWrapper = ({ children, ...rest }) => (
  <Mutation {...rest}>
    {(mutate, { loading, error, data }) => {
      if (loading) {
        return <ActivityIndicator size="large" color="#FAFAFA" />
      }

      if (error) {
        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={styles.error} type="error">{`Error! ${error.message}`}</Text>
        </View>      
      }

      return children(mutate, { loading, error, data })
    }}
  </Mutation>
)

const styles = StyleSheet.create({
  error: {
    color: '#FAFAFA',
    padding: 10,
  },
});

MutationWrapper.propTypes = {
  children: PropTypes.func.isRequired,
}

export default MutationWrapper
