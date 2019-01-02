import React from 'react';
import PropTypes from 'prop-types';

const EmailWidget = props => (<input
  type="email"
  size="small"
  value={props.value}
  disabled={props.disabled}
  required={props.required}
  className="ant-input"
  onChange={event => props.onChange(event.target.value)}
/>);

EmailWidget.defaultProps = {
  value: '',
  disabled: false,
};

EmailWidget.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EmailWidget;
