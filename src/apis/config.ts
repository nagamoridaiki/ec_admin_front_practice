import axios, { AxiosError } from 'axios';

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3001';

export interface ResponseType<T = undefined> {
  code: number;
  data?: T;
  message?: string;
}

export interface IErrorResponse {
  code: string;
  config: any;
  message: string;
  request: any;
  response: {
    config: any;
    data: {
      error: string;
      message: string;
      statusCode: string;
    };
    headers: any;
    request: any;
    status: number;
    statusText: string;
  };
}

const globalAxios = axios.create({
  baseURL: `${BASE_API_URL}`,
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  },
});


export default globalAxios;

export const isAxiosError = (error: any): error is AxiosError => !!error.isAxiosError;
