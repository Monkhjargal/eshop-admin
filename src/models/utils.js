import withQuery from 'with-query';
import { message } from 'antd';

const HOST = 'http://202.55.180.199:8881';
// const HOST = 'http://10.0.10.30:8881';

const request = ({
  url, method, body, isfiles,
}) => {
  // console.log(body);
  let bearerHeader = 'Bearer ';
  const localData = JSON.parse(localStorage.getItem('persist:root'));
  if (JSON.parse(localData.auth).data.value !== undefined) {
    bearerHeader += JSON.parse(localData.auth).data.value.access_token;
  }
  if (method === 'GET') {
    return fetch(withQuery(HOST + url, body), {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: bearerHeader,
        'Access-Control-Allow-Headers': '*',
      },
    }).then((response) => {
      if (response.status === 401 || response.status === 403) {
        // console.log('clear');
        localStorage.clear();
      }
      if (!response.ok) {
        // console.log(response.statusText);
        throw new Error(response.statusText);
        // props.history.push('/');
      }
      return response.json();
    });
  }

  if (isfiles) {
    const request = new Request(HOST + url, {
      method,
      headers: new Headers({ Authorization: bearerHeader }),
      body,
    });
    return fetch(request).then((response) => {
      if (!response.ok) { throw new Error(response.statusText); }
      return response.json();
    });
  }

  return fetch(HOST + url, {
    credentials: 'include',
    method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: bearerHeader,

    },
    body: JSON.stringify(body),
  }).then((response) => {
    // console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

const asyncFn = ({
  body, url, method = 'GET', model, name, isfiles = false,
}) => async (dispatch) => {
  // console.log(body);
  const payload = {};
  dispatch({
    type: model.request,
    payload,
    name,
  });
  try {
    // console.log(model.request, model.response);
    if (model.request === 'REQUEST_LOGOUT') {
      dispatch({
        type: model.response,
        name,
      });
    } else {
      // console.log(body);
      const data = await request({
        url, method, body, isfiles,
      });
      // console.log(data);
      if (data && data.success !== false) {
        if (model.response === 'RESPONSE_PRODUCTLIST_UPDATE') { message.success(data.message); }
        if (model.response === 'RESPONSE_PRODUCTLIST_UPATTRIBUTE') { message.success(data.message); }
        if (model.response === 'RESPONSE_PRODUCTLIST_UPRELATIONAL') { message.success(data.message); }
        if (model.response === 'RESPONSE_PRODUCTLIST_CHANGESTATUS') { message.success(data.message); }
        if (model.response === 'RESPONSE_RECIPE_CREATESTEPONE') { message.success(data.message); }
        if (model.response === 'RESPONSE_RECIPE_CREATESTEPTWO') { message.success(data.message); }
        if (model.response === 'RESPONSE_RECIPE_UPDATESTEPONE') { message.success(data.message); }
        if (model.response === 'RESPONSE_RECIPE_UPDATEPRODUCT') { message.success(data.message); }
        if (model.response === 'RESPONSE_PACKAGE_CREATE') { message.success(data.message); }
        if (model.response === 'RESPONSE_ORDER_ADDAMOUNT') { message.success(data.message); }

        // message.success(data.message);
        // console.log('success');
      } else {
        message.warning(data.message);
        // message.config({
        //   top: '50%',
        // });
        // console.log(data.message);
      }
      if (!data) {
        throw new Error('no data provided');
      }

      dispatch({
        type: model.response,
        payload: data,
        name,
      });
    }
  } catch (error) {
    dispatch({
      type: model.error,
      message: error.message,
      name,
    });
  }
};

export { request, asyncFn };
