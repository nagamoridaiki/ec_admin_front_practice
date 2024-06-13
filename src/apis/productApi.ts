import { AxiosResponse } from 'axios';
import globalAxios, { ResponseType, isAxiosError } from './config';
import { ProductType, RegisterProductParams, CategoryType, listProductParams } from '../interfaces/product';

export const registerProductApi = async (params: RegisterProductParams) => {
  try {
    const { data } = await globalAxios.post('/products', params);
    const res: ResponseType<ProductType> = {
      code: 201,
      data
    };
    return res
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: ''
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
}


export const fetchCategoriesListApi = async () => {
  try {
    const { data } = await globalAxios.get('/products/category');

    const res: ResponseType<Array<CategoryType>> = {
      code: 200,
      data
    };
    return res
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: ''
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
}

export const fetchProductListApi = async () => {
  try {
    const { data } = await globalAxios.get('/products', {
      params: {
        product_ids: [],
        titles: '',
        limit: 100,
        offset: 0
      }
    });

    const res: ResponseType<Array<ProductType>> = {
      code: 200,
      data
    };
    return res
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: ''
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
}

export const fetchProductDetailApi = async(id: number) => {
  try {
    const { data }: AxiosResponse<ProductType> = await globalAxios.get(`/products/${id}`);
    const res: ResponseType<ProductType> = {
      code: 200,
      data
    }
    return res
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: ''
    }
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status
      res.message = axiosError.response.data.message
    }
    return res
  }
}

export const updateQuantitiesApi = async (params: { product_id: number, rank: string, new_price?: number, old_num?: number, new_num?: number, inventory_id?: number }) => {
  try {
    const { data } = await globalAxios.post('/inventory', params);
    const res: ResponseType = {
      code: 201,
      data
    };
    return res;
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: ''
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};

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