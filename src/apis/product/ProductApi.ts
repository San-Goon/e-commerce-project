import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import {
  GetProductByIdReturnType,
  GetProductListReturnType,
} from '@apis/product/ProductApi.type';

export class ProductApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getProductList = async (
    pageParam?: string,
  ): Promise<GetProductListReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: pageParam
        ? `/v1/product/?cursor=${pageParam}&page_size=10`
        : '/v1/product/?page_size=10',
    });
    return data;
  };

  getProductById = async (id: number): Promise<GetProductByIdReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/product/${id}/`,
    });
    return data;
  };
}

const productApi = new ProductApi();

export default productApi;
