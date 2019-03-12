import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class ProductModel extends BaseModel {
  constructor(data = {}) {
    super(data);

    if (data.model) {
      this.model = {
        all: {
          request: this.buildActionName('request', data.model, 'all'),
          response: this.buildActionName('response', data.model, 'all'),
          error: this.buildActionName('error', data.model, 'all'),
        },
        filter: {
          request: this.buildActionName('request', data.model, 'filter'),
          response: this.buildActionName('response', data.model, 'filter'),
          error: this.buildActionName('error', data.model, 'filter'),
        },
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
  filter = ({ body, url } = {}) => asyncFn({
    body, url: `/mn/api/filter/product`, method: 'GET', model: this.model.filter,
  });

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
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
      case this.model.filter.request:
        return {
          ...state,
          all: this.requestCase(state.all, action),
        };
      case this.model.filter.error:
        return {
          ...state,
          all: this.errorCase(state.category, action),
        };
      case this.model.filter.response:
        return {
          ...state,
          all: {
            ...state.all,
            isLoading: false,
            filter: action.payload.value,
            total: action.payload.rowCount,
            headers: action.payload.headers,
            formcreateByServer: action.payload.data,
          },
        };
      default:
        return state;
    }
  }
}

export default ProductModel;
