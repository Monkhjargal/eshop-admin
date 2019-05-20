import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  4: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  },
  6: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  },
  12: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  },
};
const tailFormItemLayout = {
  4: {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 8,
      },
    },
  },
  6: {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 8,
      },
    },
  },
  12: {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 8,
      },
    },
  },
};

const FieldTemplate = (props) => {
  const {
    classNames,
    description,
    rawErrors,
    children,
    errors,
    required,
    schema,
    type,
    // label,
    // id,
    // help,
  } = props;
  // console.log('errors: ', rawErrors);
  // console.log('errors: ', props);
  // ant-col-xl-${schema.column * 2};
  return ((type === 'object') || (type === undefined && schema.type === 'object')) ?
    children
    : (schema.widget === 'checkbox' ?
      <Col span={schema.column * 2}>
        <FormItem
          formItemLayout={null}
          className={`${classNames} ant-form-item-sm ant-col-xl-24 floating-label customz`}
          help={errors}
          required={required}
        >
          <div className="justify-content-center" style={{ width: '100%' }}>
            {children}
          </div>
        </FormItem>
      </Col>
      :
      <Col span={schema.column * 2} >
        <FormItem
          formItemLayout={null}
          className={`${classNames} ant-form-item-sm ant-col-xl-24 floating-label customz`}
          hasFeedback
          label={schema.label}
          help={rawErrors}
          extra={description}
          validateStatus={rawErrors.length ? 'error' : ''}
          required={required}
        >
          <div className="justify-content-center" style={{ width: '100%' }}>
            {children}
          </div>
        </FormItem>
      </Col>
    );
};

FieldTemplate.defaultProps = {
  errors: [],
  rawErrors: [],
  help: [],
  description: '',
  classNames: '',
  required: false,
  type: undefined,
  label: '',
};

FieldTemplate.propTypes = {
  classNames: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  description: PropTypes.object,
  children: PropTypes.array.isRequired,
  errors: PropTypes.object,
  help: PropTypes.object,
  required: PropTypes.bool,
  schema: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default FieldTemplate;
