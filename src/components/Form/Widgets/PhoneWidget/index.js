import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const PhoneWidget = props => (<Input
  type="number"
  size="small"
  value={props.value}
  required={props.required}
  disabled={props.disabled}
  onChange={event => props.onChange(event.target.value)}
/>);

PhoneWidget.defaultProps = {
  value: undefined,
  disabled: false,
};

PhoneWidget.propTypes = {
  value: PropTypes.number,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default PhoneWidget;
