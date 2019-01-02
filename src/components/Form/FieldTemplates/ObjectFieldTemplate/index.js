import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

const ObjectFieldTemplate = (props) => {
  const {
    description, properties, schema,
  } = props;
  // console.log('ObjectFieldTemplate: ', props);
  if (schema.root) {
    return (
      <div className={`${s.form} ant-row`}>
        {description}
        {properties.map(prop => prop.content)}
      </div>
    );
  }
  return (
    <div className={`ant-row ant-col-md-24 mb-3`}>
      <div className={`ant-row`}>
        {schema.label}
        {description}
      </div>
      <div className={`ant-row ${s.fieldset}`}>
        {properties.map(prop => prop.content)}
      </div>
    </div>
  );
};

ObjectFieldTemplate.defaultProps = {
  description: '',
  properties: [],
};

ObjectFieldTemplate.propTypes = {
  description: PropTypes.string,
  properties: PropTypes.array,
  schema: PropTypes.object.isRequired,
};

export default ObjectFieldTemplate;

