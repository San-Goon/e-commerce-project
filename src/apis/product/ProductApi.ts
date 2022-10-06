import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import { ProductParamGetType } from '@apis/product/ProductApi.type';

export class ProductApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getProductList = async (params?: any): Promise<any> => {
    const { data } = await this.axios({
      method: 'GET',
      url: params
        ? `/v1/product/?cursor=${params}&page_size=10`
        : '/v1/product/?page_size=10',
      params,
    });
    return data;
  };

  getProductById = async (id: string): Promise<any> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/product/${id}/`,
    });
    return data;
  };
}

const productApi = new ProductApi();

export default productApi;
