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
        update: {
          request: this.buildActionName('request', data.model, 'update'),
          response: this.buildActionName('response', data.model, 'update'),
          error: this.buildActionName('error', data.model, 'update'),
        },
        delete: {
          request: this.buildActionName('request', data.model, 'delete'),
          response: this.buildActionName('response', data.model, 'delete'),
          error: this.buildActionName('error', data.model, 'delete'),
        },
        detail: {
          request: this.buildActionName('request', data.model, 'detail'),
          response: this.buildActionName('response', data.model, 'detail'),
          error: this.buildActionName('error', data.model, 'detail'),
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
      product: [],
      iscreate: [],
      detail: [],
      filter: [],
      isupdate: [],
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
  });
  update = ({ body, id, isfiles }) => asyncFn({
    body, url: `${this.url}/${id}`, method: 'PUT', model: this.model.update, isfiles,
  });
  delete = ({ id, url }) => asyncFn({
    url: `${url || this.url}/${id}`, method: 'DELETE', model: this.model.delete,
  });
  detail = ({ id, url }) => asyncFn({
    url: `${url || this.url}/${id}`, method: 'GET', model: this.model.detail,
  });
  filter = ({ body } = {}) => asyncFn({
    body, url: `/mn/api/filter/package`, method: 'GET', model: this.model.filter,
  });

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
      // DELETE PACKAGE
      case this.model.delete.request:
        return {
          ...state,
          all: this.requestCase(state.all, action),
        };
      case this.model.delete.error:
        return {
          ...state,
          all: this.errorCase(state.all, action),
        };
      case this.model.delete.response:
        return {
          ...state,
          isdelete: {
            isLoading: false,
            data: action.payload.value,
          },
        };

      // PACKAGE DETAIL
      case this.model.detail.request:
        return {
          ...state,
          all: this.requestCase(state.all, action),
        };
      case this.model.detail.error:
        return {
          ...state,
          all: this.errorCase(state.all, action),
        };
      case this.model.detail.response:
        return {
          ...state,
          detail: {
            isLoading: false,
            data: action.payload.value,
          },
        };
        // PACKAGE FILTER
      case this.model.filter.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.filter.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.filter.response:
        return {
          ...state,
          filter: {
            isLoading: false,
            data: action.payload,
          },
        };
      // PACKAGE UPDATE
      case this.model.update.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.update.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.update.response:
        return {
          ...state,
          isupdate: {
            isLoading: false,
            data: action.payload,
          },
        };
      // DEFUALT
      default:
        return state;
    }
  }
}

export default PackageModel;
