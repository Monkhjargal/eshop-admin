import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal, message } from 'antd';

class MultiUploadWidget extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  onUploadPreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  onUploadChange = ({ fileList }) => this.setState({ fileList });

  onModalCancel = () => { this.setState({ previewVisible: false }); };

  beforeUpload = (file) => {
    const fileSizeByMB = file.size / 1024 / 1024;

    if (fileSizeByMB < 10) {
      message.error('Уучлаарай. Зурагны хэмжээ 10MB-с хэтрэхгүй байх ёстой.');
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Зураг нэмэх</div>
      </div>
    );

    return (
      <div className="clearfix">
        <Upload
          headers={{ Authorization: `Bearer ${this.props.auth.data.value.access_token}` }}
          action="http://202.55.180.200:8881/api/image/banner"
          listType="picture-card"
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.onUploadPreview}
          onChange={this.onUploadChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.onModalCancel}>
          <img alt="example" src={previewImage} style={{ width: '100%' }} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("MultiUploadWidget=>mapStateToProps", state);
  const { auth } = state;
  return { auth };
};

MultiUploadWidget.defaultProps = {
  fileList: [],
};

MultiUploadWidget.propTypes = {
  fileList: PropTypes.array,
};

export default connect(mapStateToProps)(MultiUploadWidget);
