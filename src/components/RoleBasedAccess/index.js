/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { auth: { modules } } = state;
  return {
    modules,
  };
};

const RoleBasedAccess = (props) => {
  const {
    children, required, modules, instead, dispatch, ...rest
  } = props;
  return (required !== "*" && modules.indexOf(required) === -1)
    ? ((instead === null)
      ? null
      : React.cloneElement(instead, { ...rest })
    )
    : React.cloneElement(children, { ...rest });
};

RoleBasedAccess.defaultProps = {
  required: '',
  instead: null,
};

RoleBasedAccess.propTypes = {
  required: PropTypes.string.isRequired,
  modules: PropTypes.array.isRequired,
  instead: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(RoleBasedAccess);
