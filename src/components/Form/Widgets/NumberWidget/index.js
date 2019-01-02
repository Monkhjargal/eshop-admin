import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const NumberWidget = props => (<Input
  type="number"
  size="small"
  placeholder={props.placeholder}
  value={props.value}
  required={props.required}
  disabled={props.disabled}
  onChange={event => props.onChange(event.target.value)}
/>);

NumberWidget.defaultProps = {
  value: undefined,
  placeholder: '',
  disabled: false,
};

NumberWidget.propTypes = {
  value: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default NumberWidget;
