import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Upload, Icon, message } from 'antd';
import styles from './style.css';

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

const beforeUpload = (file) => {
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Зурагны хэмжээ 10MB ээс бага байх ёстой');
  }
  return isLt10M;
};


const ImageWidget = (props) => {
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      console.log('sss', info);
      props.onChange(info.file.response.value);
    }
  };
  // const imghost = 'http://10.0.10.30:8881/api/image/banner';
  const imghost = 'http://202.55.180.199:8881/api/image/banner';
  const imgfetch = 'http://202.55.180.199:8877';
  return (
    <Upload
      className={`avatar-uploader ${styles.avatarUploader}`}
      accept="image/*"
      name="image"
      // listType="picture-card"
      // fileList={fileList}
      showUploadList={false}
      // action="/api/core/images"
      headers={{ Authorization: `Bearer ${props.auth.data.value.access_token}` }}
      action={imghost}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {/* {console.log(props)} */}
      {/* {fileList.length >= 3 ? null : uploadButton} */}
      {
        props.value ?
          // <div style={{ backgroundImage: `url(${props.value})` }} className={`avatar ${styles.avatar}`} />
          <div style={{ backgroundImage: `url(${imgfetch}/${props.value})` }} className={`avatar ${styles.avatar}`} /> :
          <Icon type="upload" className={`avatar-uploader-trigger ${styles.avatarUploaderTrigger}`} />
      }
    </Upload>
  );
};

ImageWidget.defaultProps = {
  value: '',
};

ImageWidget.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
ImageWidget.propTypes = {
  auth: PropTypes.object.isRequired,
};

// export default ImageWidget;
export default connect(mapStateToProps)(ImageWidget);
