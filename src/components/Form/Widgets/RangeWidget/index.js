import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

class SelectWidget extends Component {
  constructor(props) {
    super(props);
    this.startDate = undefined;
    this.endDate = undefined;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && typeof nextProps.value === 'string' && nextProps.value.indexOf('-') !== -1) {
      const [startDate, endDate] = nextProps.value.split('-');
      this.startDate = startDate;
      this.endDate = endDate;
    }
    if (typeof nextProps.value === 'number') {
      nextProps.onChange(nextProps.value.toString());
    }
  }

  changeHandler = (s, e) => {
    this.props.onChange(`${s} - ${e}`);
    this.startDate = s;
    this.endDate = e;
  }

  render() {
    return (
      <div className="ant-row">
        <div className="ant-col-sm-12" style={{ paddingRight: '10px' }}>
          <Select
            className="ant-col-sm-12"
            allowClear
            placeholder="Эхлэх он сонгох"
            value={this.startDate}
            required={this.props.required}
            disabled={this.props.disabled}
            onChange={value => this.changeHandler(value, this.endDate)}
          >
            {this.props.schema.options.map(({ _id, name }, i) => (
              <Option key={i} value={_id}>
                {name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="ant-col-sm-12" style={{ paddingLeft: '10px' }}>
          <Select
            allowClear
            placeholder="Дуусах он сонгох"
            value={this.endDate}
            required={this.props.required}
            disabled={this.props.disabled}
            onChange={value => this.changeHandler(this.startDate, value)}
          >
            {this.props.schema.options.map(({ _id, name }, i) => (
              <Option key={i} value={_id}>
                {name}
              </Option>
              ))}
          </Select>
        </div>
      </div>
    );
  }
}

SelectWidget.defaultProps = {
  value: undefined,
  options: {},
  disabled: false,
};

SelectWidget.propTypes = {
  value: PropTypes.any,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  options: PropTypes.object,
  disabled: PropTypes.bool,
};

export default SelectWidget;
