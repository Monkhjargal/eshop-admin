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
          // console.log(object);
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
          if (object.widget === 'array') {
            object.widget = 'multiselect';
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
            // console.log(object.properties[key]);
            recursive(object.properties[key], toObject[key]);
          });
          return true;
        };

        let tempData = action.payload;
        // const tempData = {
        //   label: 'CATALOG_ATTRIBUTE',
        //   type: 'object',
        //   root: true,
        //   properties: {
        //     attrnm: {
        //       label: 'Аттрибут нэр111111',
        //       placeholder: 'Аттрибут нэр',
        //       type: 'string',
        //       widget: 'input',
        //       column: 12,
        //       key: 'attrnm',
        //       name: 'attrnm',
        //       disabled: false,
        //     },
        //     isenable: {
        //       label: 'Идэвхтэй эсэх111',
        //       placeholder: 'Идэвхтэй эсэх',
        //       type: 'boolean',
        //       widget: 'checkbox',
        //       column: 12,
        //       key: 'isenable',
        //       name: 'isenable',
        //       disabled: false,
        //     },
        //     description: {
        //       label: 'Тайлбар',
        //       placeholder: 'Тайлбар',
        //       type: 'string',
        //       widget: 'textarea',
        //       column: 12,
        //       key: 'description',
        //       name: 'description',
        //       disabled: false,
        //     },
        //     attrvalues: {
        //       label: 'Аттрибутын утга',
        //       placeholder: 'Аттрибутын утга',
        //       type: "array",
        //       widget: 'multiselect',
        //       column: 12,
        //       key: 'attrvalues',
        //       name: 'attrvalues',
        //       items: [
        //         {
        //           widget: 'select',
        //           type: 'integer',
        //           id: 47,
        //           name: '128GB',
        //         },
        //         {
        //           widget: 'select',
        //           type: 'integer',
        //           id: 46,
        //           name: '256GB',
        //         },
        //         {
        //           widget: 'select',
        //           type: 'integer',
        //           id: 61,
        //           name: '512GB',
        //         },
        //       ],
        //     },
        //   },
        //   required: [
        //     'attrnm',
        //   ],
        // };
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
