import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class PackageModel extends BaseModel {
  constructor(data = {}) {
    super(data);

    if (data.model) {
      this.model = {
        all: {
          request: this.buildActionName('request', data.model, 'all'),
          response: this.buildActionName('response', data.model, 'all'),
          error: this.buildActionName('error', data.model, 'all'),
        },
        update: {
          request: this.buildActionName('request', data.model, 'update'),
          response: this.buildActionName('response', data.model, 'update'),
          error: this.buildActionName('error', data.model, 'update'),
        }
      };
    }

    this.initialState = {
      all: {
        error: false,
        errorMessage: '',
        isLoading: false,
        data: [],
        category: [],
        headers: [],
        formcreateByServer: {},
        total: 0,
      },
      current: {
        error: false,
        errorMessage: '',
        isLoading: false,
        formcreateByServer: {},
        data: {},
      },
    };
  }

  all = ({ body, url }) => asyncFn({
    body, url: `${url || this.url}/all`, method: 'POST', model: this.model.all,
  });

  update = ({ body, url, id }) => asyncFn({
    body, url: `${url || this.url}/${id}`, method: 'PUT', model: this.model.update,
  })

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      // ALL
      case this.model.all.request:
        return {
          ...state,
          all: this.requestCase(state.all, action),
        };
      case this.model.all.error:
        return {
          ...state,
          all: this.errorCase(state.all, action),
        };
      case this.model.all.response:
        return {
          ...state,
          all: {
            ...state.all,
            isLoading: false,
            data: action.payload.value,
            total: action.payload.rowCount,
            headers: action.payload.headers,
            formcreateByServer: action.payload.data,
          },
        };
      // DEFUALT
      default:
        return state;
    }
  }
}

export default PackageModel;
