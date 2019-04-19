import React from 'react';
import { Form, Input, Icon, Modal, Button, Popconfirm, Table, Upload, Row } from "antd";
import CreateModal from "../CStepTwoC"; // Create step Modal
import UpdateModal from "../CStepTwoU"; // Update step Modal
import tableStyle from "../../../../components/StandardTable/index.less";
import styles from "../../../../components/List/style.less";


const picserver = 'http://202.55.180.199:8877/';
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

class StepTwo extends React.Component {
  state = {
    loading: false,
    iscreate: false,
    isupdate: false,
    previewVisible: false,
    data: [],
    selectedRow: [],
    fileList: [],
    file: [],
    previewImage: '',
    updateStep: [],
  }

  componentWillMount() {
    if (this.props.crecipe !== null) {
      this.props.getStepTwo({ id: this.props.crecipe })
        .then((res) => {
          this.setState({ loading: false, data: this.props.stepTwoData.data });
        });
    }
  }

  handleDelete = () => {
    this.setState({ loading: true });
    const { selectedRow, data } = this.state;
    // console.log(selectedRow);

    data.map((i, index) => {
      if (i.seq === selectedRow.seq) { return data.splice(index, 1); } return null;
    });

    data.map((i, index) => i.seq = index + 1);

    this.setState({ data, loading: false });
  }

  handleCreateModal = () => { this.setState({ iscreate: !this.state.iscreate }); }
  handleUpdateModal = () => { this.setState({ isupdate: !this.state.isupdate, updateStep: this.state.selectedRow }); }
  renderButton = () => {
    try {
      return (
        <div style={{ marginTop: 20, marginBottom: 10, float: 'right' }}>
          <Button
            size="small"
            icon="plus"
            type="primary"
            style={{ zIndex: 1 }}
            onClick={this.handleCreateModal}
          >
            {`Алхам нэмэх`}
          </Button>{' '}
          <Button
            icon="edit"
            size="small"
            type="dashed"
            style={{ zIndex: 1 }}
            onClick={this.handleUpdateModal}
            disabled={this.state.selectedRow.length === 0}
          >
            {`Алхам засах`}
          </Button>{' '}
          <Popconfirm
            title="Та устгахдаа итгэлтэй байна уу?"
            onConfirm={this.handleDelete}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button
              icon="delete"
              type="danger"
              size="small"
              style={{ zIndex: 1 }}
              disabled={this.state.selectedRow.length === 0}
            >
              {`Алхам устгах`}
            </Button>
          </Popconfirm>
        </div>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  handleRowClick = (record) => { this.setState({ selectedRow: record }); }
  handleRowClass = record => (record.seq === this.state.selectedRow.seq ? tableStyle.selected : '');
  renderTable = () => {
    try {
      const { data, loading } = this.state;

      return (
        <div>
          <Table
            bordered
            loading={loading}
            dataSource={data}
            columns={headers}
            footer={null}
            rowKey={record => record.seq}
            rowClassName={this.handleRowClass}
            onRow={record => ({
              onClick: () => this.handleRowClick(record),
            })}
          />
        </div>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // add recipe step
  addStep = (value) => {
    const { data } = this.state;
    data.push(value);
    this.setState({ data });
  }

  renderCreate = () => {
    try {
      const { iscreate, data } = this.state;

      return (
        <CreateModal
          visible={iscreate}
          onCancel={this.handleCreateModal}
          step={data.length + 1}
          handleSubmit={this.addStep}
        />
      );
    } catch (error) {
      return console.log(error);
    }
  }

  handleUpdateImg = ({ fileList }) => {
    const { updateStep } = this.state;
    this.props.form.setFields({
      file: {
        value: fileList,
        errors: [new Error('.')],
      },
    });

    updateStep.file = fileList;
    this.setState({ updateStep });
  };

  handleSubmitUpdateStep = (value) => {
    console.log(value);
    // if (!isprev) { e.preventDefault(); }
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     values.file = values.file.fileList;
    //     const { data } = this.state;

    //     data.map((i) => {
    //       if (i.seq === parseInt(values.seq, 10)) {
    //         i.description = values.description;
    //         i.file = values.file;
    //       }

    //       return null;
    //     });

    //     this.setState({ data });
    //     this.handleUpdateModal();
    //   }
    // });
  }

  renderUpdate = () => {
    try {
      const {
        isupdate, updateStep,
      } = this.state;
      return (
        <UpdateModal
          visible={isupdate}
          onCancel={this.handleUpdateModal}
          data={updateStep}
          handleSubmit={this.handleSubmitUpdateStep}
        />
      );
    } catch (error) {
      return null;
    }
  }

  handleSave = () => {
    // console.log(this.state.data);
    const { data } = this.state;
    let formData = new FormData();

    data.map((i) => {
      formData.append("description", i.description);

      if (Array.isArray(i.file)) {
        formData.append("imgnm", '');
        i.file.map(file => formData.append("file", file.originFileObj, file.name));
        return null;
      }
      // if (Array.isArray(i.file)) {
      //   formData.append("imgnm", '');
      //   i.file.map(file => formData.append("file", file.originFileObj, file.name));
      // }
      formData.append("file", '');
      formData.append("imgnm", i.file);
      return null;
    });

    let isfiles = true;
    this.props.createStepTwo({ body: formData, id: this.props.crecipe, isfiles });
    this.props.nextStep();
  }

  render() {
    console.log(this.state);
    return (
      <Row style={{ marginTop: 20 }}>
        {this.renderButton()}
        {this.renderTable()}
        {this.renderCreate()}
        {this.renderUpdate()}

        <div style={{ float: "right", marginTop: 10 }}>
          <Button type="primary" onClick={this.handleSave} ><Icon type="save" />Хадгалах</Button>
        </div>
      </Row>
    );
  }
}

const headers = [{
  title: '№',
  dataIndex: 'seq',
  width: 70,
}, {
  title: 'Алхмын тайлбар',
  dataIndex: 'description',
}, {
  title: 'Зураг',
  dataIndex: 'file',
  width: 150,
  render: url => (
    Array.isArray(url) ? (
      url.map((i, key) => (<div
        key={key}
        style={{
      background: `url(${i.thumbUrl})`,
      width: '100px',
      height: '40px',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
      />))
    )
      :
      <div
        style={{
      background: `url(${picserver + url})`,
      width: '100px',
      height: '40px',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
      />
  ),
}];

export default Form.create({ name: 'recipe' })(StepTwo);
