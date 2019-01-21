import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class ProductModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.productModel = {
      request: this.buildActionName('request', 'product'),
      response: this.buildActionName('response', 'product'),
      error: this.buildActionName('error', 'product'),
    };

    this.initialState = {
      data: {},
      isLoading: false,
      isLogged: false,
      error: false,
      errorMessage: '',
      modules: [],
    };
  }

  productList = () => asyncFn({
    url: '/mn/api/product/filter', method: 'GET', model: this.productModel,
  })

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case this.productModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.productModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.productModel.response:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      default:
        return state;
    }
  }
}

export default ProductModel;
