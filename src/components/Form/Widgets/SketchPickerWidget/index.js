import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

class SketchPickerWidget extends Component {
  state = {
    background: '#fff',
  };

  handleChange = (color, event) => {
    console.log(color);
    this.props.onChange(color.hex);
  };

  handleChangeComplete = (color) => {
    this.setState({ background: this.props.value });
  };

  render() {
    return (
      <SketchPicker
        color={this.props.value}
        onChange={this.handleChange}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  }
}

SketchPickerWidget.defaultProps = {
  value: undefined,
};

SketchPickerWidget.propTypes = {
  value: PropTypes.any,
};

export default SketchPickerWidget;
