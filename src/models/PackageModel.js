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
        product: {
          request: this.buildActionName('request', data.model, 'product'),
          response: this.buildActionName('response', data.model, 'product'),
          error: this.buildActionName('error', data.model, 'product'),
        },
        create: {
          request: this.buildActionName('request', data.model, 'create'),
          response: this.buildActionName('response', data.model, 'create'),
          error: this.buildActionName('error', data.model, 'create'),
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
      product: [],
      iscreate: [],
    };
  }

  all = ({ body, url }) => asyncFn({
    body, url: `${url || this.url}/all`, method: 'POST', model: this.model.all,
  });
  product = ({ id }) => asyncFn({
    url: `${this.url}/skus/${id}`, method: 'GET', model: this.model.product,
  });
  create = ({ body, isfiles }) => asyncFn({
    body, url: `${this.url}`, method: 'POST', model: this.model.create, isfiles,
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
      // PACKAGE'S PRODUCT
      case this.model.product.request:
        return {
          ...state,
          all: this.requestCase(state.all, action),
        };
      case this.model.product.error:
        return {
          ...state,
          all: this.errorCase(state.all, action),
        };
      case this.model.product.response:
        return {
          ...state,
          product: {
            isLoading: false,
            data: action.payload.value,
          },
        };
      // CREATE PACKAGE
      case this.model.create.request:
        return {
          ...state,
          all: this.requestCase(state.all, action),
        };
      case this.model.create.error:
        return {
          ...state,
          all: this.errorCase(state.all, action),
        };
      case this.model.create.response:
        return {
          ...state,
          iscreate: {
            isLoading: false,
            data: action.payload.value,
          },
        };

      // DEFUALT
      default:
        return state;
    }
  }
}

export default PackageModel;
