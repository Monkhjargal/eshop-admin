import BaseModel from './BaseModel';
import { asyncFn } from './utils';

const asyncFromDataFn = ({
  model, name, data,
}) => async (dispatch) => {
  const payload = {};

  dispatch({
    type: model.request,
    payload,
    name,
  });
  try {
    if (!data) {
      throw new Error('no data provided');
    }

    dispatch({
      type: model.response,
      payload: data,
      name,
    });
  } catch (error) {
    dispatch({
      type: model.error,
      message: error.message,
      name,
    });
  }
};

class FormModel extends BaseModel {
  get = ({ model, data }) => asyncFromDataFn({
    model: this.model, name: model, data,
  })

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case this.model.request:
        return this.requestCase(state, action);
      case this.model.error:
        return this.errorCase(state, action);
      case this.model.response:
        let uiSchema = {};
        const recursive = (object, toObject) => {
          // console.log(toObject);
          if (object.type === 'id') {
            object.type = 'string';
          }

          if (object.type === 'Decimal') {
            object.type = 'string';
          }

          if (object.type === 'String') {
            object.type = 'string';
          }

          if (object.widget === 'input ') {
            object.widget = 'input';
          }

          if (object.type === 'DateTime') {
            object.type = 'string';
          }

          if (object.widget === 'range') {
            object.widget = 'date';
          }

          if (object.widget) {
            toObject['ui:widget'] = object.widget;
          }

          if (object.type === 'number' && object.widget === 'input') {
            toObject['ui:widget'] = 'number';
          }

          if (object.disabled) {
            toObject['ui:disabled'] = object.disabled;
          }

          if (object.readonly) {
            toObject['ui:readonly'] = object.readonly;
          }

          if (object.placeholder) {
            toObject['ui:placeholder'] = object.placeholder;
          }

          if (!object.properties) {
            return true;
          }

          Object.keys(object.properties).forEach((key) => {
            toObject[key] = {};
            recursive(object.properties[key], toObject[key]);
          });
          return true;
        };
        let tempData = action.payload;
        // let tempData = formData;
        recursive(tempData, uiSchema);
        tempData.type = 'object';

        return {
          ...state,
          isLoading: false,
          forms: Object.assign({}, state.forms, {
            [action.name]: {
              schema: tempData,
              uiSchema,
            },
          }),
        };
      default:
        return state;
    }
  }
}

export default FormModel;
