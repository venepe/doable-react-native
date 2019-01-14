import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import App from '../App';
import { generateUID } from '../../actions';

class Base extends Component {

  componentDidMount() {
    this.props.generateUID();
  }

  render() {
    return (
      <App />
    )
  }
}

export default connect(
  null,
  { generateUID },
)(Base);
