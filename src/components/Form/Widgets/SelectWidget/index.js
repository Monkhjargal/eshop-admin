import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

class SelectWidget extends Component {
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value === 'number') {
      nextProps.onChange(nextProps.value.toString());
    }
  }

  render() {
    return (
      <Select
        defaultValue={this.props.placeholder}
        size="small"
        allowClear
        placeholder={`${this.props.schema.label} сонгох`}
        value={this.props.value ? (typeof this.props.value === 'number') ? this.props.value.toString() : this.props.value : this.props.value}
        required={this.props.required}
        disabled={this.props.disabled}
        onChange={value => this.props.onChange(value)}
      >
        {this.props.schema.options.map(({ id, catnm, parent }, i) => {
          let returnObject;
          if (this.props.schema.parent && this.props.schema.parent.length) {
            let parentValue;
            try {
              parentValue = this.props.schema.parent.reduce((result, key) => {
                if (result) return result[key];
                throw new Error('Object not found');
              }, this.props.formContext);
            } catch (error) {
              parentValue = false;
            }
            returnObject = (parent === parentValue) ? (
              <Option key={i} value={id}>
                {catnm}
              </Option>
            ) : undefined;
          } else {
            returnObject = (
              <Option key={i} value={id}>
                {catnm}
              </Option>
            );
          }
          return returnObject;
        })}
      </Select>
    );
  }
}

SelectWidget.defaultProps = {
  value: undefined,
  placeholder: '',
  options: {},
  formContext: {},
  disabled: false,
};

SelectWidget.propTypes = {
  value: PropTypes.any,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.object,
  formContext: PropTypes.object,
  disabled: PropTypes.bool,
};

export default SelectWidget;
