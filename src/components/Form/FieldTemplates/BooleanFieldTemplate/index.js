import React from 'react';
import PropTypes from 'prop-types';

const BooleanFieldTemplate = (props) => {
  const {
    children, description, properties,
  } = props;
  console.log('BooleanFieldTemplate: ', props);
  return (
    <div>
      {children}
      {description}
      {properties.map(prop => prop.content)}
    </div>
  );
};

BooleanFieldTemplate.defaultProps = {
  description: '',
  properties: [],
};

BooleanFieldTemplate.propTypes = {
  description: PropTypes.string,
  properties: PropTypes.array,
  children: PropTypes.object.isRequired,
};

export default BooleanFieldTemplate;

