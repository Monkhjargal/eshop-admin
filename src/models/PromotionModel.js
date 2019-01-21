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
        get: {
          request: this.buildActionName('request', data.model, 'get'),
          response: this.buildActionName('response', data.model, 'get'),
          error: this.buildActionName('error', data.model, 'get'),
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
    };
  }

  get = ({ _id, url }) => asyncFn({
    url: `${url || this.url}/${_id}`, method: 'GET', model: this.model.get,
  });
  all = ({ body, url } = {}) => asyncFn({
    body, url: `${url || this.url}/all`, method: 'GET', model: this.model.all,
  });
  create = ({ body, url }) => asyncFn({
    body, url: url || this.url, method: 'POST', model: this.model.create,
  })
  delete = ({ _id, url }) => asyncFn({
    url: `${url || this.url}/${_id}`, method: 'DELETE', model: this.model.delete,
  });
  update = ({ body, url }) => asyncFn({
    body, url: `${url || this.url}`, method: 'PUT', model: this.model.update,
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
      case this.model.get.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.get.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.get.response:
        return {
          ...state,
          current: {
            ...state.current,
            isLoading: false,
            data: action.payload.value,
          },
        };
      case this.model.create.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.create.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.create.response:
        return {
          ...state,
          current: {
            ...state.current,
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
      default:
        return state;
    }
  }
}

export default PromotionModel;
