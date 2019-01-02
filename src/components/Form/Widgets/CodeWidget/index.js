import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const CodeWidget = props => (<Input
  type="text"
  size="small"
  placeholder={props.placeholder}
  value={props.value}
  required={props.required}
  onChange={event => props.onChange(event.target.value)}
  disabled={props.disabled}
/>);

CodeWidget.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
};

CodeWidget.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CodeWidget;
