import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Spin,
} from 'antd';
import { Form } from '../../components';
import ModalLayout from "../../layouts/ModalLayout";
import style from "./style.less";

class ModalFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({ isLoading: true });
    }
  }

  setLoading = (value) => {
    this.setState({ isLoading: value });
  }

  render() {
    const {
      title,
      visible,
      modelName,
      form,
      fetchForm,
      formIsLoading,
      data,
      dataParams,
      fetchData,
      createFormData,
      dataIsLoading,
      submitAction,
      onCancel,
      afterSubmit,
      url,
      error,
      errorMessage,
      ...restProps
    } = this.props;

    return (
      <Modal
        title={title}
        width={'55%'}
        visible={visible}
        footer={false}
        className={style.otModalForm}
        maskClosable={false}
        onCancel={onCancel}
        {...restProps}
      >
        <ModalLayout>
          {
            <Form
              modelName={modelName}
              isLoading={this.state.isLoading}
              setLoading={this.setLoading}
              form={form}
              fetchForm={fetchForm}
              formIsLoading={formIsLoading}
              data={data}
              createFormData={createFormData}
              dataParams={dataParams}
              fetchData={fetchData}
              dataIsLoading={dataIsLoading}
              submitAction={submitAction}
              onCancel={onCancel}
              afterSubmit={afterSubmit}
              url={url}
              error={error}
              errorMessage={errorMessage}
            />

          }
        </ModalLayout>
      </Modal>
    );
  }
}

ModalFormComponent.defaultProps = {
  error: undefined,
  errorMessage: '',
  title: '',
  form: undefined,
  formIsLoading: undefined,
  data: undefined,
  fetchData: undefined,
  dataParams: undefined,
  dataIsLoading: undefined,
  afterSubmit: undefined,
  url: '',
};

ModalFormComponent.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object,
  fetchForm: PropTypes.func.isRequired,
  formIsLoading: PropTypes.bool,
  modelName: PropTypes.string.isRequired,
  data: PropTypes.object,
  fetchData: PropTypes.func,
  dataIsLoading: PropTypes.bool,
  dataParams: PropTypes.object,
  submitAction: PropTypes.func.isRequired,
  afterSubmit: PropTypes.func,
  url: PropTypes.string,
};

export default ModalFormComponent;
