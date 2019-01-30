import { Select } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MultiSelect extends Component {
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value === 'number') {
      nextProps.onChange(nextProps.value.toString());
    }
  }
  state = {
    selectedItems: [],
    defValue: [],
  };

  handleChange = (selectedItems) => {
    // console.log(selectedItems);
    this.setState({ selectedItems });
  };

  render() {
    const { options } = this.props.schema;
    this.props.value.map(i => this.state.defValue.push(parseInt(i, 10)));
    return (
      <Select
        mode="multiple"
        placeholder={this.props.placeholder}
        // defaultValue={this.state.defValue}
        style={{ width: '100%' }}
        onChange={value => this.props.onChange(value)}
      >
        {options.map(item => (
          <Select.Option key={item.id} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

MultiSelect.defaultProps = {
  placeholder: '',
  value: [],
  options: [],
  formContext: [],
  disabled: false,
};

MultiSelect.propTypes = {
  value: PropTypes.any,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.object,
  formContext: PropTypes.object,
  disabled: PropTypes.bool,
};


export default MultiSelect;
