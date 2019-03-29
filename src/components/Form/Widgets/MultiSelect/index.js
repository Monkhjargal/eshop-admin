import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class MultiSelect extends Component {
  state = {
    children: [],
    val: [],
  }
  componentDidMount() {
    const { items } = this.props.schema;
    console.log(items);
    // for (let i = 0; i < this.options.enum.length; i++) {
    //   console.log(options[i]);
    // }
    this.setState({
      val: this.props.value,
    });
    // console.log(this.props.schema.items.enum);
    for (let i = 0; i < this.props.schema.items.enum.length; i++) {
      const opt = this.props.schema.items.enum[i].split(',');
      // console.log(opt[1]);
      this.state.children.push(<Select.Option key={this.props.schema.items.enum[i]}> {opt[1]}</Select.Option>);
    }
    // for (let i = 0; i < options.length; i++) {
    //   // console.log(options[i].id);
    //   this.state.children.push(<Select.Option key={options[i].id}> {options[i].name}</Select.Option>);
    // }
  }
  componentDidUpdate(prevProps) {
    const { value } = this.props;
    // console.log(value);
    // console.log('prev....', prevProps.value);
    // console.log(this.props.value);
    if (value !== prevProps.value) {
      this.setState({
        val: this.props.value,
      });
    }
  }
  handleChange = (selectedItems) => {
    const arr = selectedItems;
    console.log(arr);
    this.props.onChange(selectedItems);
    // this.props.onChange(selectedItems.join(','));
  };

  onSelect(sel) {
    console.log(sel);
  }

  render() {
    // console.log(this.state.val);
    return (
      <Select
        size="small"
        mode="multiple"
        placeholder={this.props.placeholder}
        value={this.state.val}
        style={{ width: '100%' }}
        onChange={this.handleChange}
      >
        {this.state.children}
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
