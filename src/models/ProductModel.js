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
        update: {
          request: this.buildActionName('request', data.model, 'update'),
          response: this.buildActionName('response', data.model, 'update'),
          error: this.buildActionName('error', data.model, 'update'),
        },
        detail: {
          request: this.buildActionName('request', data.model, 'detail'),
          response: this.buildActionName('response', data.model, 'detail'),
          error: this.buildActionName('error', data.model, 'detail'),
        },
        attribute: {
          request: this.buildActionName('request', data.model, 'attribute'),
          response: this.buildActionName('response', data.model, 'attribute'),
          error: this.buildActionName('error', data.model, 'attribute'),
        },
        upattribute: {
          request: this.buildActionName('request', data.model, 'upattribute'),
          response: this.buildActionName('response', data.model, 'upattribute'),
          error: this.buildActionName('error', data.model, 'upattribute'),
        },
        relational: {
          request: this.buildActionName('request', data.model, 'relational'),
          response: this.buildActionName('response', data.model, 'relational'),
          error: this.buildActionName('error', data.model, 'relational'),
        },
        uprelational: {
          request: this.buildActionName('request', data.model, 'uprelational'),
          response: this.buildActionName('response', data.model, 'uprelational'),
          error: this.buildActionName('error', data.model, 'uprelational'),
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
  update = ({ body, skucd } = {}) => asyncFn({
    body, url: `/mn/api/product/${skucd}`, method: 'PUT', model: this.model.update,
  });
  detail = ({ skucd } = {}) => asyncFn({
    url: `/mn/api/product/${skucd}`, method: 'GET', model: this.model.detail,
  });
  attribute = ({ skucd } = {}) => asyncFn({
    url: `/mn/api/product/attr/${skucd}`, method: 'GET', model: this.model.attribute,
  });
  upattribute = ({ body, skucd } = {}) => asyncFn({
    body, url: `/mn/api/product/attr/${skucd}`, method: 'POST', model: this.model.upattribute,
  });
  relational = ({ skucd } = {}) => asyncFn({
    url: `/mn/api/product/relational/${skucd}`, method: 'GET', model: this.model.relational,
  });
  uprelational = ({ body, parentskucd } = {}) => asyncFn({
    body, url: `/mn/api/product/relational/${parentskucd}`, method: 'POST', model: this.model.uprelational,
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

      // FILTER
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

      // UPDATE
      case this.model.update.request:
        return {
          ...state,
          all: this.requestCase(state.all, action),
        };
      case this.model.update.error:
        return {
          ...state,
          all: this.errorCase(state.category, action),
        };
      case this.model.update.response:
        return {
          ...state,
          update: {
            isLoading: false,
            filter: action.payload.value,
          },
        };

      // DETAIL
      case this.model.detail.request:
        return {
          ...state,
          all: this.requestCase(state.all, action),
        };
      case this.model.detail.error:
        return {
          ...state,
          all: this.errorCase(state.category, action),
        };
      case this.model.detail.response:
        return {
          ...state,
          detail: { ...action.payload.value },
        };

      // ATTRIBUTE
      case this.model.attribute.request:
        return {
          ...state,
          all: this.requestCase(state.all, action),
        };
      case this.model.attribute.error:
        return {
          ...state,
          all: this.errorCase(state.category, action),
        };
      case this.model.attribute.response:
        return {
          ...state,
          attribute: { ...action.payload.value },
        };

      // UPDATE ATTRIBUTE
      case this.model.upattribute.request:
        return {
          ...state,
          upattribute: this.requestCase(state.all, action),
        };
      case this.model.upattribute.error:
        return {
          ...state,
          upattribute: this.errorCase(state.category, action),
        };
      case this.model.upattribute.response:
        return {
          ...state,
          upattribute: { ...action.payload.value },
        };
      // RELATIONAL
      case this.model.relational.request:
        return {
          ...state,
          relational: this.requestCase(state.all, action),
        };
      case this.model.relational.error:
        return {
          ...state,
          relational: this.errorCase(state.category, action),
        };
      case this.model.relational.response:
        // console.log(action.payload.value);
        return {
          ...state,
          relational: action.payload.value,
        };
      // UPDATE RELATIONAL
      case this.model.uprelational.request:
        return {
          ...state,
          uprelational: this.requestCase(state.all, action),
        };
      case this.model.uprelational.error:
        return {
          ...state,
          uprelational: this.errorCase(state.category, action),
        };
      case this.model.uprelational.response:
        return {
          ...state,
          uprelational: action.payload.value,
        };
      // DEFUALT
      default:
        return state;
    }
  }
}

export default ProductModel;
