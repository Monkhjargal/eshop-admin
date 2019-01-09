import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class EhowModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.ehowModel = {
      request: this.buildActionName('request', 'ehow'),
      response: this.buildActionName('response', 'ehow'),
      error: this.buildActionName('error', 'ehow'),
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

  ehowList = () => asyncFn({
    url: '/mn/api/recipe/all', method: 'GET', model: this.ehowModel,
  })

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case this.ehowModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.ehowModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.ehowModel.response:
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

export default EhowModel;
