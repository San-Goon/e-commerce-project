import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import { GetCartReturnType } from '@apis/cart/CartApi.type';

export class CartApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getCart = async (id: string): Promise<GetCartReturnType[]> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `v1/cart/?user_id=${id}`,
    });
    return data;
  };

  postCart = async (body: any): Promise<any> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/v1/cart/',
      data: body,
    });
    return data;
  };

  postCartItem = async (body: any): Promise<any> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/v1/cart/item/',
      data: body,
    });
    return data;
  };

  patchCartItem = async (req: any): Promise<any> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/v1/cart/item/${req.id}/`,
      data: { count: req.count },
    });
    return data;
  };

  deleteCartItem = async (id: any): Promise<any> => {
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/v1/cart/item/${id}/`,
    });
    return data;
  };
}

const cartApi = new CartApi();

export default cartApi;
