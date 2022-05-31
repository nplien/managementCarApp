import axios from 'axios';
import {API_END_POINT} from 'env';
import MyNavigator from 'utils/MyNavigator';
import MyStaticLocal from 'utils/MyStaticLocal';

const instance = axios.create({
  baseURL: API_END_POINT,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface IResponse<T, S = undefined | null> {
  data: T;
  code?: number;
  count?: number;
  message?: any;
  sum?: S;
}

const IResponseError: IResponse<null> = {
  data: null,
  code: -999,
  count: 0,
  message: 'Not Service',
  sum: null
};

async function GET<T>(url: string, params: object, header: object = {}) {
  const access_expired_at = (MyStaticLocal.USER_TOKEN?.access_expired_at || 0) * 1000;
  const now = new Date().getTime();

  if (access_expired_at < now) {
    MyNavigator.reset('Login');
    return IResponseError;
  }

  const response = await instance.get<T>(url, {
    params,
    headers: {...instance.defaults.headers, Authorization: 'Bearer ', ...header}
  });

  return response.status === 200 ? response.data : IResponseError;
}

async function POST<T>(url: string, data: object, header: object = {}) {
  const access_expired_at = (MyStaticLocal.USER_TOKEN?.access_expired_at || 0) * 1000;
  const now = new Date().getTime();

  if (access_expired_at < now) {
    MyNavigator.reset('Login');
    return IResponseError;
  }

  const response = await instance.post<T>(url, data, {
    headers: {...instance.defaults.headers, Authorization: 'Bearer ', ...header}
  });
  return response.status === 200 ? response.data : IResponseError;
}

async function POST_LOGIN<T>(url: string, data: object, header: object = {}) {
  const response = await instance.post<T>(url, data, {
    headers: {...instance.defaults.headers, Authorization: 'Bearer ', ...header}
  });
  return response.status === 200 ? response.data : IResponseError;
}

async function PUT<T>(url: string, data: object, header: object = {}) {
  const access_expired_at = (MyStaticLocal.USER_TOKEN?.access_expired_at || 0) * 1000;
  const now = new Date().getTime();

  if (access_expired_at < now) {
    MyNavigator.reset('Login');
    return IResponseError;
  }

  const response = await instance.put<T>(url, data, {
    headers: {...instance.defaults.headers, Authorization: 'Bearer ', ...header}
  });
  return response.status === 200 ? response.data : IResponseError;
}

async function DELETE<T>(url: string, header: object = {}) {
  const access_expired_at = (MyStaticLocal.USER_TOKEN?.access_expired_at || 0) * 1000;
  const now = new Date().getTime();

  if (access_expired_at < now) {
    MyNavigator.reset('Login');
    return IResponseError;
  }

  const response = await instance.delete<T>(url, {
    headers: {...instance.defaults.headers, Authorization: 'Bearer ', ...header}
  });
  return response.status === 200 ? response.data : IResponseError;
}

export default {GET, POST, POST_LOGIN, PUT, DELETE};
