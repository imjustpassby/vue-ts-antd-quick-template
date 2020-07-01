import axios, { AxiosError, AxiosResponse } from 'ts-axios-new';

const url = {
  dev: 'http://localhost:3000',
  production: ''
};

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? url.production : url.dev
});

request.interceptors.request.use(config => {
  config.withCredentials = true;
  // your config
  return config;
});

request.interceptors.response.use(
  (res: AxiosResponse) => {
    return Promise.resolve(res);
  },
  (err: AxiosError) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default request;
