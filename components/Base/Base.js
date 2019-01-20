import React, { Component } from 'react';
import { AuthSession, SecureStore } from 'expo';
import PropTypes from 'prop-types';
import jwtDecoder from 'jwt-decode';
import Auth0 from 'react-native-auth0';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import App from '../App';
import { getUID } from '../../reducers';
import { setUID } from '../../actions';
const TOKEN_KEY = 'TOKEN_KEY';


class Base extends Component {

  componentDidMount() {
    SecureStore.getItemAsync(TOKEN_KEY)
      .then((id_token) => {
        const decodedToken = jwtDecoder(id_token);
        const uid = decodedToken.sub;
        this.props.setUID({ payload: { uid  } })
      });
  }

  render() {
    return (
      <App />
    )
  }
}

const mapStateToProps = state => ({
  uid: getUID(state),
});

export default withApollo(connect(
  null,
  { setUID },
)(Base));
