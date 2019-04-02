import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class PromotionModel extends BaseModel {
  constructor(data = {}) {
    super(data);

    if (data.model) {
      this.model = {
        all: {
          request: this.buildActionName('request', data.model, 'all'),
          response: this.buildActionName('response', data.model, 'all'),
          error: this.buildActionName('error', data.model, 'all'),
        },
        create: {
          request: this.buildActionName('request', data.model, 'create'),
          response: this.buildActionName('response', data.model, 'create'),
          error: this.buildActionName('error', data.model, 'create'),
        },
        delete: {
          request: this.buildActionName('request', data.model, 'delete'),
          response: this.buildActionName('response', data.model, 'delete'),
          error: this.buildActionName('error', data.model, 'delete'),
        },
        update: {
          request: this.buildActionName('request', data.model, 'update'),
          response: this.buildActionName('response', data.model, 'update'),
          error: this.buildActionName('error', data.model, 'update'),
        },
        getProduct: {
          request: this.buildActionName('request', data.model, 'getProduct'),
          response: this.buildActionName('response', data.model, 'getProduct'),
          error: this.buildActionName('error', data.model, 'getProduct'),
        },
        updateProduct: {
          request: this.buildActionName('request', data.model, 'updateProduct'),
          response: this.buildActionName('response', data.model, 'updateProduct'),
          error: this.buildActionName('error', data.model, 'updateProduct'),
        },
      };
    }

    this.initialState = {
      all: {
        error: false,
        errorMessage: '',
        isLoading: false,
        data: [],
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
      createRes: [],
      product: [],
      updateProduct: [],
    };
  }

  all = ({ body, url } = {}) => asyncFn({
    body, url: `${url || this.url}/all`, method: 'GET', model: this.model.all,
  });
  create = ({ body, url }) => asyncFn({
    body, url: url || this.url, method: 'POST', model: this.model.create,
  });
  delete = ({ id, url }) => asyncFn({
    url: `${url || this.url}/${id}`, method: 'DELETE', model: this.model.delete,
  });
  update = ({ body, id }) => asyncFn({
    body, url: `${this.url}/${id}`, method: 'PUT', model: this.model.update,
  });
  getProduct = ({ id }) => asyncFn({
    url: `${this.url}/skus/${id}`, method: 'GET', model: this.model.getProduct,
  });
  updateProduct = ({ body, id }) => asyncFn({
    body, url: `${this.url}/${id}`, method: 'PUT', model: this.model.updateProduct,
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
            isLoading: false,
            data: action.payload.value,
            headers: action.payload.headers,
          },
        };
      case this.model.create.request:
        return {
          ...state,
          createRes: this.requestCase(state.current, action),
        };
      case this.model.create.error:
        return {
          ...state,
          createRes: this.errorCase(state.current, action),
        };
      case this.model.create.response:
        return {
          ...state,
          createRes: {
            isLoading: false,
            data: action.payload,
          },
        };
      case this.model.delete.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.delete.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.delete.response:
        return {
          ...state,
          current: {
            ...state.current,
            isLoading: false,
            data: {},
          },
        };
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
          current: {
            ...state.current,
            isLoading: false,
            data: action.payload,
          },
        };
      // PROMOTION GET PRODUCT
      case this.model.getProduct.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.getProduct.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.getProduct.response:
        return {
          ...state,
          product: {
            isLoading: false,
            data: action.payload,
          },
        };
      // PROMOTION UPDATE PRODUCT
      case this.model.updateProduct.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.updateProduct.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.updateProduct.response:
        return {
          ...state,
          updateProduct: {
            isLoading: false,
            data: action.payload,
          },
        };

      default:
        return state;
    }
  }
}

export default PromotionModel;
