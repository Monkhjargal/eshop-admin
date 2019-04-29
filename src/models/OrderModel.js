import BaseModel from "./BaseModel";
import { asyncFn } from "./utils";

class PackageModel extends BaseModel {
  constructor(data = {}) {
    super(data);

    if (data.model) {
      this.model = {
        all: {
          request: this.buildActionName("request", data.model, "all"),
          response: this.buildActionName("response", data.model, "all"),
          error: this.buildActionName("error", data.model, "all"),
        },
        filter: {
          request: this.buildActionName("request", data.model, "filter"),
          response: this.buildActionName("response", data.model, "filter"),
          error: this.buildActionName("error", data.model, "filter"),
        },
        detail: {
          request: this.buildActionName("request", data.model, "detail"),
          response: this.buildActionName("response", data.model, "detail"),
          error: this.buildActionName("error", data.model, "detail"),
        },
        addAmount: {
          request: this.buildActionName("request", data.model, "addAmount"),
          response: this.buildActionName("response", data.model, "addAmount"),
          error: this.buildActionName("error", data.model, "addAmount"),
        },
        amountHistory: {
          request: this.buildActionName("request", data.model, "amountHistory"),
          response: this.buildActionName(
            "response",
            data.model,
            "amountHistory",
          ),
          error: this.buildActionName("error", data.model, "amountHistory"),
        },
      };
    }

    this.initialState = {
      all: {
        error: false,
        errorMessage: "",
        isLoading: false,
        data: [],
        category: [],
        headers: [],
        formcreateByServer: {},
        total: 0,
      },
      current: {
        error: false,
        errorMessage: "",
        isLoading: false,
        formcreateByServer: {},
        data: {},
      },
      filter: [],
      detail: [],
      isAdd: [],
      amountHistory: [],
    };
  }

  all = ({ body, url }) =>
    asyncFn({
      body,
      url: `${url || this.url}/all`,
      method: "POST",
      model: this.model.all,
    });
  filter = ({ body }) =>
    asyncFn({
      body,
      url: `/mn/api/filter/order`,
      method: "GET",
      model: this.model.filter,
    });
  detail = ({ id }) =>
    asyncFn({
      url: `${this.url}/${id}`,
      method: "GET",
      model: this.model.detail,
    });
  addAmount = ({ id }) =>
    asyncFn({
      url: `/mn/api/orderresidual/${id}`,
      method: "POST",
      model: this.model.addAmount,
    });
  amountHistory = ({ id }) =>
    asyncFn({
      url: `/mn/api/orderresidual/${id}`,
      method: "GET",
      model: this.model.amountHistory,
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
          filter: { ...action.payload.value },
        };
      // DETAIL
      case this.model.detail.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.detail.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.detail.response:
        return {
          ...state,
          detail: { ...action.payload.value[0] },
        };
      // ADD AMOUNT
      case this.model.addAmount.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.addAmount.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.addAmount.response:
        return {
          ...state,
          isAdd: { ...action.payload.value },
        };
      // GET AMOUNT HISTORY
      case this.model.amountHistory.request:
        return {
          ...state,
          current: this.requestCase(state.current, action),
        };
      case this.model.amountHistory.error:
        return {
          ...state,
          current: this.errorCase(state.current, action),
        };
      case this.model.amountHistory.response:
        return {
          ...state,
          amountHistory: { ...action.payload.value },
        };
      // DEFUALT
      default:
        return state;
    }
  };
}

export default PackageModel;
