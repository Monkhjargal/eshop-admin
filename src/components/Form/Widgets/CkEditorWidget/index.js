import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from "react-ckeditor-component";

let defurl = 'https://cdn.ckeditor.com/4.6.2/full/ckeditor.js';

const CkEditorWidget = (props) => {
  const onChange = (evt) => {
    props.onChange(evt.editor.getData());
  };

  return (<CKEditor
    activeClass="p10"
    content={props.value}
    scriptUrl={defurl}
    config={{
      toolbar: [
        { name: 'document', items: ['Source', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
        { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
        '/',
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
        '/',
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
        { name: 'about', items: ['About'] },
      ],
    }}
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
