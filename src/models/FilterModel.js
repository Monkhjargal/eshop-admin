import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class FilterModel extends BaseModel {
  get = ({ model }) => asyncFn({
    url: `${this.url}/${model}`, method: 'GET', model: this.model, name: model,
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
          if (object.type === 'id') {
            object.type = 'string';
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

        recursive(tempData, uiSchema);

        return {
          ...state,
          isLoading: false,
          filters: Object.assign({}, state.filters, {
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

export default FilterModel;
