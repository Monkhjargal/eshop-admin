import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Steps, Button, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageWidget from '../Form/Widgets/ImageWidget';
import ModalLayout from "../../layouts/ModalLayout";
import { List } from '../../components';
import style from "./style.less";

class ModalStepsComponent extends Component {
  constructor(props) {
    console.log('ModalForm=>hasSteps', props.hasSteps);
    super(props);
    this.state = {
      isLoading: true,
      current: 0,
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({ isLoading: true });
    }
  }

  setLoading = (value) => {
    this.setState({ isLoading: value });
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

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

    const steps = [{
      title: 'Алхам 1',
      content: (
        <div style={{ padding: '20px 0' }}>
          <div className="images-upload">
            <h4>Зураг</h4>
            <ImageWidget />
            <ImageWidget />
            <ImageWidget />
            <ImageWidget />
            <ImageWidget />
          </div>

          <h4>Агуулга</h4>
          <div style={{ paddingTop: '10px' }}>
            <ReactQuill
              theme="snow"
              value={this.state.text}
              onChange={this.handleChange}
              modules={this.modules}
              formats={this.formats}
            />
          </div>
        </div>
      ),
    }, {
      title: 'Алхам 2',
      content: (
        <List
          actions={[]}
          model={'Brandlist'}
          name={'Brand'}
        />
      ),
    }];

    const { Step } = Steps;
    const { current } = this.state;

    return (
      <Modal
        title={title}
        width={'70%'}
        visible={visible}
        footer={false}
        className={style.otModalForm}
        maskClosable={false}
        onCancel={onCancel}
        {...restProps}
      >
        <ModalLayout>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          <div className="steps-content">
            {steps[current].content}
            {/* <Form
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
            /> */}
          </div>
          <div className="steps-action">
            {
              current < steps.length - 1
              && <Button type="primary" onClick={() => this.next()}>Дараагийнх</Button>
            }
            {
              current === steps.length - 1
              && <Button type="primary" onClick={() => message.success('Амжилттай дууслаа!')}>Дуусах</Button>
            }
            {
              current > 0
              && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Өмнөх
              </Button>
              )
            }
          </div>
        </ModalLayout>
      </Modal>
    );
  }
}

ModalStepsComponent.defaultProps = {
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

ModalStepsComponent.propTypes = {
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

export default ModalStepsComponent;
