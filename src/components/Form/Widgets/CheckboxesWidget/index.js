import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Row, Col } from 'antd';

const CheckboxsWidget = props => (
  <Checkbox.Group onChange={props.onChange} value={props.value}>
    <Row>
      {props.options.enumOptions.map(({ label, value }) => <Col key={value} span={8}><Checkbox value={value}>{label}</Checkbox></Col>)}
    </Row>
  </Checkbox.Group>
);

CheckboxsWidget.defaultProps = {
  value: [],
  // disabled: false,
};

CheckboxsWidget.propTypes = {
  value: PropTypes.array,
  // disabled: PropTypes.bool,
  // required: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxsWidget;
