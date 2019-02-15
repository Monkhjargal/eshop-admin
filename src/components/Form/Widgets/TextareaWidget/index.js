import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { TextArea } = Input;

const TextareaWidget = props => (<TextArea
  value={(typeof props.value === "undefined" || !props.value) ? "" : props.value}
  size="small"
  autosize={{ minRows: 3, maxRows: 10 }}
  required={props.required}
  onChange={event => props.onChange(event.target.value)}
// value="ssss............."
// defaultValue="ssss"
/>);

TextareaWidget.defaultProps = {
  value: '',
};

TextareaWidget.propTypes = {
  value: PropTypes.string,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextareaWidget;
