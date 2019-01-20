import React, { Component } from 'react';
import { AuthSession, SecureStore } from 'expo';
import PropTypes from 'prop-types';
import jwtDecoder from 'jwt-decode';
import Auth0 from 'react-native-auth0';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import App from '../App';
import { getUID } from '../../reducers';
import { generateUID } from '../../actions';
import { randomString } from '../../utilities';
import { LOGON_USER } from '../../mutations';
import client from '../../apolloClient';
const auth0ClientId = 'Z1nFXf7pX2wRyf5Ps4ArqYTyJ6fs5eE9';
const auth0Domain = 'https://d0able.auth0.com';
const TOKEN_KEY = 'TOKEN_KEY';

function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  }


class Base extends Component {

  componentDidMount() {
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + toQueryString({
        client_id: auth0ClientId,
        response_type: 'id_token',
        scope: 'openid profile email',
        redirect_uri: redirectUrl,
        nonce: randomString(),
      }),
      returnUrl: 'com.venepe.doable://d0able.auth0.com/ios/com.venepe.doable/callback',
    }).then((result) => {
      console.log(result);
      const { params = {} } = result;
      const { id_token = '' } = params;
      const decodedToken = jwtDecoder(id_token);
      const uid = decodedToken.sub;
      const email = decodedToken.email;
      this.props.client.mutate({
        mutation: LOGON_USER,
        variables: { input: { uid, email } },
      });
      return SecureStore.setItemAsync(TOKEN_KEY, id_token)
    })
    .then(() => {
      console.log('reload');
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
  { generateUID },
)(Base));
