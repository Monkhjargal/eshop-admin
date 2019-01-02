import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from "react-ckeditor-component";

const CkEditorWidget = (props) => {
  const onChange = (evt) => {
    props.onChange(evt.editor.getData());
  };

  return (<CKEditor
    activeClass="p10"
    content={props.value}
    events={{
      change: onChange,
    }}
  />
  );
};

CkEditorWidget.defaultProps = {
  value: '',
};

CkEditorWidget.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CkEditorWidget;
