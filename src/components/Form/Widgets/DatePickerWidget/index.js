import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const DatePickerWidget = props => (<DatePicker
  style={{ width: '100%' }}
  size="small"
  value={props.value ? moment(props.value) : undefined}
  allowClear
  required={props.required}
  onChange={value => props.onChange(value ? value.format() : null)}
  disabled={props.disabled}
/>);

DatePickerWidget.defaultProps = {
  value: '',
  disabled: false,
};

DatePickerWidget.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePickerWidget;
