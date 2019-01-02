import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

const RadioGroupWidget = props => (
  <RadioGroup
    onChange={e => props.onChange(e.target.value)}
    value={props.value}
    required={props.required}
    disabled={props.disabled}
  >
    {
      props.schema.options.map(({ label, value }, index) => <Radio key={`rg_${index}`} value={value}>{label}</Radio>)
    }
  </RadioGroup>
);

RadioGroupWidget.defaultProps = {
  value: '',
  disabled: false,
};

RadioGroupWidget.propTypes = {
  value: PropTypes.string,
  schema: PropTypes.object.isRequired,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default RadioGroupWidget;
