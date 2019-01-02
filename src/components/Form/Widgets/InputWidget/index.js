import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const InputWidget = props => (<Input
  type="text"
  size="small"
  placeholder={props.placeholder}
  value={props.value}
  required={props.required}
  disabled={props.disabled}
  onChange={event => props.onChange(event.target.value)}
/>);

InputWidget.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
};

InputWidget.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default InputWidget;
