import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const CheckboxWidget = props => (
  <Checkbox
    value={props.value}
    checked={typeof props.value === "undefined" ? false : props.value}
    required={props.required}
    onChange={event => props.onChange(event.target.checked)}
    disabled={props.disabled}
  >
    {props.schema.label}
  </Checkbox>);

CheckboxWidget.defaultProps = {
  value: undefined,
  disabled: false,
};

CheckboxWidget.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  schema: PropTypes.object.isRequired,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxWidget;
