import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class BannerModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.bannerModel = {
      request: this.buildActionName('request', 'banner'),
      response: this.buildActionName('response', 'banner'),
      error: this.buildActionName('error', 'banner'),
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

  bannerList = () => asyncFn({
    url: '/api/general/banner/0/1/mn', method: 'GET', model: this.bannerModel,
  })

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case this.bannerModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.bannerModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.bannerModel.response:
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

export default BannerModel;
