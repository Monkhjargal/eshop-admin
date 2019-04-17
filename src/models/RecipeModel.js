import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class RecipeModel extends BaseModel {
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
        createStepOne: {
          request: this.buildActionName('request', data.model, 'createStepOne'),
          response: this.buildActionName('response', data.model, 'createStepOne'),
          error: this.buildActionName('error', data.model, 'createStepOne'),
        },
        getStepOne: {
          request: this.buildActionName('request', data.model, 'getStepOne'),
          response: this.buildActionName('response', data.model, 'getStepOne'),
          error: this.buildActionName('error', data.model, 'getStepOne'),
        },
        delete: {
          request: this.buildActionName('request', data.model, 'delete'),
          response: this.buildActionName('response', data.model, 'delete'),
          error: this.buildActionName('error', data.model, 'delete'),
        },
        getStepTwo: {
          request: this.buildActionName('request', data.model, 'getStepTwo'),
          response: this.buildActionName('response', data.model, 'getStepTwo'),
          error: this.buildActionName('error', data.model, 'getStepTwo'),
        },
        createStepTwo: {
          request: this.buildActionName('request', data.model, 'createStepTwo'),
          response: this.buildActionName('response', data.model, 'createStepTwo'),
          error: this.buildActionName('error', data.model, 'createStepTwo'),
        },
        getProduct: {
          request: this.buildActionName('request', data.model, 'getProduct'),
          response: this.buildActionName('response', data.model, 'getProduct'),
          error: this.buildActionName('error', data.model, 'getProduct'),
        },
        updateStepOne: {
          request: this.buildActionName('request', data.model, 'updateStepOne'),
          response: this.buildActionName('response', data.model, 'updateStepOne'),
          error: this.buildActionName('error', data.model, 'updateStepOne'),
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
        total: 0,
      },
      current: {
        error: false,
        errorMessage: '',
        isLoading: false,
        data: {},
      },
      filter: [],
      crecipe: [],
      isdelete: [],
      stepTwoData: [],
      isCreateStepTwo: [],
      product: [],
      stepOne: [],
      isUpdateStepOne: [],
      isUpdateProduct: [],
    };
  }

  all = ({ body } = {}) => asyncFn({
    body, url: `${this.url}/all`, method: 'POST', model: this.model.all,
  });
  filter = ({ body } = {}) => asyncFn({
    body, url: `/mn/api/filter/recipe`, method: 'GET', model: this.model.filter,
  });
  createStepOne = ({ body, isfiles } = {}) => asyncFn({
    body, url: this.url, method: 'POST', model: this.model.createStepOne, isfiles,
  });
  delete = ({ id }) => asyncFn({
    url: `${this.url}/${id}`, method: 'DELETE', model: this.model.delete,
  });
  getStepTwo = ({ id }) => asyncFn({
    url: `${this.url}/step/${id}`, method: 'GET', model: this.model.getStepTwo,
  }, console.log(id));
  createStepTwo = ({ body, id, isfiles } = {}) => asyncFn({
    body, url: `${this.url}/step/${id}`, method: 'POST', model: this.model.createStepTwo, isfiles,
  });
  getProduct = ({ id }) => asyncFn({
    url: `${this.url}/skus/${id}`, method: 'GET', model: this.model.getProduct,
  });
  getStepOne = ({ id }) => asyncFn({
    url: `${this.url}/${id}`, method: 'GET', model: this.model.getStepOne,
  });
  updateStepOne = ({ body, id, isfiles } = {}) => asyncFn({
    body, url: `${this.url}/${id}`, method: 'PUT', model: this.model.updateStepOne, isfiles,
  });
  updateProduct = ({ body, id } = {}) => asyncFn({
    body, url: `${this.url}/skus/${id}`, method: 'POST', model: this.model.updateProduct,
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
          },
        };
      // FILTER
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
            data: action.payload.value,
          },
        };
      // CREATE
      case this.model.createStepOne.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.createStepOne.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.createStepOne.response:
        return {
          ...state,
          crecipe: {
            isLoading: false,
            data: action.payload.value,
          },
        };
      // DELETE
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
          isdelete: {
            isLoading: false,
            data: action.payload.value,
          },
        };
      // GET STEP TWO DATA
      case this.model.getStepTwo.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.getStepTwo.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.getStepTwo.response:
        return {
          ...state,
          stepTwoData: {
            isLoading: false,
            data: action.payload.value,
          },
        };
      // CRETAE STEP TWO DATA
      case this.model.createStepTwo.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.createStepTwo.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.createStepTwo.response:
        return {
          ...state,
          isCreateStepTwo: {
            isLoading: false,
            data: action.payload.value,
          },
        };
      // GET PRODUCT
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
            data: action.payload.value,
          },
        };
      // GET STEP ONE DATA
      case this.model.getStepOne.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.getStepOne.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.getStepOne.response:
        return {
          ...state,
          stepOne: {
            isLoading: false,
            data: action.payload.value,
          },
        };
      // updateStepOne
      case this.model.updateStepOne.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.updateStepOne.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.updateStepOne.response:
        return {
          ...state,
          isUpdateStepOne: {
            isLoading: false,
            data: action.payload.value,
          },
        };
        // updateProduct
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
          isUpdateProduct: {
            isLoading: false,
            data: action.payload.value,
          },
        };
      default:
        return state;
    }
  }
}

export default RecipeModel;
