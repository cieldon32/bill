import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { crypto } from '@huameow/utils';
import * as D3Dsv from 'd3-dsv';
import ENV from './env';

enum CodeType {
  STATUS_CODE_SUCCESS = 200,
}

const instance = axios.create({
  baseURL: ENV.API_BASE,
  withCredentials: true,
  timeout: 10 * 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(config => {
  const extraParams = { time: new Date().getTime() };
  const configData = config;
  const { data, method } = configData;
  const isFormData =
    config.headers['Content-Type'] &&
    config.headers['Content-Type'].indexOf('multipart/form-data') !== -1;
  if (method === 'get') {
    configData.headers['Content-Type'] = 'application/json';
    configData.params = { ...data, ...extraParams };
  } else {
    configData.headers.Accept = 'application/json';
    configData.params = extraParams;
  }
  const { params } = config;
  if (data && !isFormData) {
    const { time } = params;
    params.sign = crypto(JSON.stringify(data) + time);
  } else if (params) {
    configData.params.sign = crypto(params, true);
  }
  // const userInfoLocal = JSON.parse(localStorage.getItem("userInfo")) || {};
  // config.headers["x-web-auth-token"] = userInfoLocal.token;
  return config;
});

instance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    const { config, data } = res;
    if (config.url.indexOf('.csv') > 0) {
      const result = D3Dsv.csvParse(data);
      return result;
    } else {
      const { code, success, message: mes } = data;
      if (code === CodeType.STATUS_CODE_SUCCESS && success) {
        return res.data;
      }
      if (res.data && mes) {
        // todo: add alert
        // console.log(mes);
      }
    }
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default class Request {
  static get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url);
  }

  static post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data);
  }
}
