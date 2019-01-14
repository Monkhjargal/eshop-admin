import withQuery from 'with-query';

const HOST = 'http://202.55.180.200:8881';
// const HOST = 'http://10.0.10.30:8881';

const request = ({ url, method, body }) => {
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
      },
    }).then((response) => {
      if (response.status === 401 || response.status === 403) {
        // 401 || 403
      }
      if (!response.ok) {
        throw new Error(response.statusText);
      }
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
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

const asyncFn = ({
  body, url, method = 'GET', model, name,
}) => async (dispatch) => {
  const payload = {};
  dispatch({
    type: model.request,
    payload,
    name,
  });
  try {
    if (model.request === 'REQUEST_LOGOUT') {
      dispatch({
        type: model.response,
        name,
      });
    } else {
      const data = await request({ url, method, body });

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
