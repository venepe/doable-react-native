import React, { Component } from 'react';
import { SecureStore } from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecoder from 'jwt-decode';
import App from '../App';
import { setUID } from '../../actions';
import { logonUser } from '../../helpers/logon';
import Keys from '../../constants/Keys';

class Base extends Component {

  componentDidMount() {
    SecureStore.getItemAsync(Keys.TOKEN_KEY)
      .then((id_token) => {
        const decodedToken = jwtDecoder(id_token);
        const uid = decodedToken.sub;
        this.props.setUID({ payload: { uid  } })
      })
      .catch(() => {
        logonUser();
      });
  }

  render() {
    return (
      <App />
    )
  }
}

export default connect(
  null,
  { setUID },
)(Base);
