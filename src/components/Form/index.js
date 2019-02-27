/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { Button } from "antd";
import style from "./style.less";
import * as Models from '../../models';

import {
  InputWidget,
  TextareaWidget,
  CheckboxWidget,
  CheckboxesWidget,
  SelectWidget,
  ExtraSelectWidget,
  RadioGroupWidget,
  PhoneWidget,
  DatePickerWidget,
  TreeWidget,
  CodeWidget,
  EmailWidget,
  NumberWidget,
  RangeWidget,
  ImageWidget,
  SketchPickerWidget,
  CkEditorWidget,
  SelectTreeWidget,
  MultiSelect,
} from './Widgets';

import {
  ErrorList,
  FieldTemplate,
  ObjectFieldTemplate,
} from './FieldTemplates';
// import { studentData } from './mockjs';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      parentList: [],
      isSubmitted: false,
    };
  }

  componentDidMount() {
    // console.log('>>>>>>>>>>>>');
    this.fetchForm();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.parentList && this.state.parentList.length) {
      try {
        let arrayOfChanges = [];

        let clonedParentList = JSON.parse(JSON.stringify(this.state.parentList));

        clonedParentList.forEach((entry) => {
          // console.log(entry);
          let before;
          let after;
          if (entry.parentRoute.length === 1) {
            const {
              [entry.parentRoute[0]]: value,
            } = this.state.formData;
            before = value;
            const {
              [entry.parentRoute[0]]: nextValue,
            } = nextState.formData;
            after = nextValue;
          } else if (entry.parentRoute.length === 2) {
            const {
              [entry.parentRoute[0]]: {
                [entry.parentRoute[1]]: value,
              },
            } = this.state.formData;
            before = value;
            const {
              [entry.parentRoute[0]]: {
                [entry.parentRoute[1]]: nextValue,
              },
            } = nextState.formData;
            after = nextValue;
          } else if (entry.parentRoute.length === 3) {
            const {
              [entry.parentRoute[0]]: {
                [entry.parentRoute[1]]: {
                  [entry.parentRoute[2]]: value,
                },
              },
            } = this.state.formData;
            before = value;
            const {
              [entry.parentRoute[0]]: {
                [entry.parentRoute[1]]: {
                  [entry.parentRoute[2]]: nextValue,
                },
              },
            } = nextState.formData;
            after = nextValue;
          }

          if (before !== after) {
            console.log({ after, before });
            arrayOfChanges.push(entry.route);
            const recursiveFn = (array, route) => {
              let found = array.find(i => JSON.stringify(i.parentRoute) === JSON.stringify(route));
              if (found) {
                arrayOfChanges.push(found.route);
                recursiveFn(array, found.route);
              }
            };
            recursiveFn(clonedParentList, entry.route);
          }

          console.log(clonedParentList);
        });

        let tempFormData = nextState.formData;
        // console.log(tempFormData);
        let t = JSON.parse(JSON.stringify(tempFormData));

        arrayOfChanges.forEach((entry) => {
          let e = JSON.parse(JSON.stringify(entry));

          const recursive = (object, array) => {
            if (array.length === 1) {
              object[array[0]] = undefined;
              return;
            }

            recursive(object[array.shift()], array);
          };
          recursive(t, e);
        });

        // console.log('ssssssss', arrayOfChanges);

        if (arrayOfChanges.length && t && Object.keys(t).length) {
          this.setState({
            formData: t,
          });
        }
      } catch (error) { }
    }
  }

  onChangeHandler = (formObject) => {
    // console.log('data', formObject);
    this.setState({
      formData: formObject.formData,
    });
  }

  onSubmitHandler = async () => {
    let submitObject = {};
    submitObject = { ...{ formData: this.state.formData } };

    if (this.props.dataParams && this.props.dataParams._id) {
      submitObject = { ...submitObject, ...{ _id: this.props.dataParams._id } };
    }

    if (this.props.url) {
      submitObject = { ...submitObject, ...{ url: this.props.url } };
    }
    // console.log(submitObject);
    // const submitResult = this.props.submitAction(submitObject);
    await this.props.submitAction(submitObject);
    if (this.props.error) {
      this.setState({
        isSubmitted: true,
      });
      // console.log(this.props.error, this.props.errorMessage);
    } else if (this.props.afterSubmit) {
      this.props.afterSubmit();
    }

    // if (submitResult && submitResult.then) {
    //   submitResult.then(() => {
    //     if (this.props.afterSubmit) {
    //       this.props.afterSubmit();
    //     }
    //   });
    // } else if (this.props.afterSubmit) {
    //   this.props.afterSubmit();
    // }
  }

  onErrorHandler = (formObject, a, b, c) => {
    console.log('!!!!', formObject, a, b, c);
    this.setState({
      isSubmitted: true,
    });
  }

  setParents = (formData) => {
    let tempParentList = [];
    const recursive = (object, route) => {
      // console.log(object);
      if (object && object.parent && object.parent.length) {
        // console.log(typeof object.parent[0]);
        if (typeof object.parent[0] === 'string') {
          tempParentList.push({
            route,
            parentRoute: object.parent,
          });
        } else {
          object.parent.forEach((entry) => {
            tempParentList.push({
              route,
              parentRoute: entry,
            });
          });
        }
      }
      if (!object.properties) {
        return true;
      }
      Object.keys(object.properties).forEach((key) => {
        recursive(object.properties[key], [...route, key]);
      });
      return true;
    };

    recursive(formData.schema, []);
    this.setState({
      parentList: tempParentList,
    });

    return true;
  }

  fetchForm = async () => {
    if (!this.props.form || !Object.keys(this.props.form).length) {
      await this.props.fetchForm({ model: [this.props.modelName], data: this.props.createFormData });
    }
    this.setParents(this.props.form);
    if (this.props.setLoading) {
      this.props.setLoading(false);
    }
    await this.fetchData();
  }

  fetchData = async () => {
    if (this.props.fetchData) {
      let sendObject = this.props.dataParams || {};
      if (this.props.url) {
        sendObject = { ...sendObject, url: this.props.url };
      }
      await this.props.fetchData(sendObject);
      this.setState({ formData: {} }, () => {
        if (this.props.data && !this.props.data.description) {
          this.props.data.description = "";
        }
        if (this.props.data && !this.props.data.isenable) {
          this.props.data.isenable = Boolean(this.props.data.isenable);
        }
        if (this.props.data && !this.props.data.twitter) {
          this.props.data.twitter = "";
        }
        if (this.props.data && !this.props.data.facebook) {
          this.props.data.facebook = "";
        }
        if (this.props.data && !this.props.data.gmail) {
          this.props.data.gmail = "";
        }
        this.setState({ formData: this.props.data });
      });
      // console.log(this.props.data.value);
    }
    return true;
  }

  transformErrors = errors => errors.map((error) => {
    if (error.name === "required") {
      error.message = "Заавал бѳглѳх ёстой";
    }
    if (error.name === "pattern") {
      error.message = "Утасны дугаар 11 оронгоос бага байх ёстой";
    }
    return error;
  })

  clear = () => {
    this.setState({
      formData: {},
    });
  }

  widgets = {
    input: InputWidget,
    textarea: TextareaWidget,
    select: SelectWidget,
    "extra-select": ExtraSelectWidget,
    "radio-group": RadioGroupWidget,
    phone: PhoneWidget,
    date: DatePickerWidget,
    year: InputWidget,
    checkbox: CheckboxWidget,
    checkboxes: CheckboxesWidget,
    tree: TreeWidget,
    code: CodeWidget,
    email: EmailWidget,
    image: ImageWidget,
    number: NumberWidget,
    range: RangeWidget,
    sketchpicker: SketchPickerWidget,
    ckeditor: CkEditorWidget,
    selecttree: SelectTreeWidget,
    multiselect: MultiSelect,
  }

  FieldTemplate = FieldTemplate
  ErrorList = ErrorList
  ObjectFieldTemplate = ObjectFieldTemplate

  render() {
    const onChange = this.props.onChange ? this.props.onChange : this.onChangeHandler;
    const onError = this.props.onError ? this.props.onError : this.onErrorHandler;
    const onSubmit = this.props.onSubmit ? this.props.onSubmit : this.onSubmitHandler;
    const liveValidate = this.props.liveValidate ? this.props.liveValidate : this.state.isSubmitted;
    // console.log('live', liveValidate);
    // console.log('live', onError);
    console.log('live', this.props.form);
    return (
      <Form
        schema={(this.props.form && Object.keys(this.props.form).length) ? this.props.form.schema : {}}
        uiSchema={(this.props.form && Object.keys(this.props.form).length) ? this.props.form.uiSchema : {}}
        formData={this.state.formData}
        formContext={this.state.formData}
        noHtml5Validate
        fields={this.fields}
        FieldTemplate={this.FieldTemplate}
        ObjectFieldTemplate={this.ObjectFieldTemplate}
        ErrorList={this.ErrorList}
        widgets={this.widgets}
        transformErrors={this.transformErrors}
        liveValidate={liveValidate}
        className={`${style.otForm} ant-row`}
        onChange={(formObject) => { onChange(formObject); }}
        onSubmit={(formObject) => { onSubmit(formObject); }}
        onError={(formObject) => { onError(formObject); }}
      >
        <div className="ant-modal-footer">
          {this.props.clearButton ?
            <Button size="small" type="button" onClick={() => this.clear()}>{this.props.cancelButtonName || 'Цэвэрлэх'}</Button> :
            <Button size="small" type="button" onClick={() => this.props.onCancel()}>{this.props.cancelButtonName || 'Болих'}</Button>
          }
          <Button size="small" htmlType="submit" loading={this.props.dataIsLoading} type="primary">{this.props.submitButtonName || 'Бүртгэх'}</Button>
        </div>
      </Form>
    );
  }
}

FormComponent.defaultProps = {
  error: undefined,
  errorMessage: undefined,
  fetchData: undefined,
  form: undefined,
  dataIsLoading: undefined,
  onCancel: undefined,
  dataParams: {},
  data: undefined,
  // refresh: undefined,
  modelName: '',
  onChange: undefined,
  onError: undefined,
  onSubmit: undefined,
  liveValidate: undefined,
  cancelButtonName: '',
  submitButtonName: '',
  clearButton: undefined,
  setLoading: undefined,
  afterSubmit: undefined,
  url: '',
};

FormComponent.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  form: PropTypes.object,
  fetchForm: PropTypes.func.isRequired,
  fetchData: PropTypes.func,
  onCancel: PropTypes.func,
  dataIsLoading: PropTypes.bool,
  setLoading: PropTypes.func,
  submitAction: PropTypes.func.isRequired,
  dataParams: PropTypes.object,
  // refresh: PropTypes.func,
  data: PropTypes.object,
  modelName: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onSubmit: PropTypes.func,
  liveValidate: PropTypes.bool,
  cancelButtonName: PropTypes.string,
  submitButtonName: PropTypes.string,
  clearButton: PropTypes.bool,
  afterSubmit: PropTypes.func,
  url: PropTypes.string,
};

export default FormComponent;
