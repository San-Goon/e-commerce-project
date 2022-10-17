import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import {
  GetOrderStatusReturnType,
  OrderByIdReturnType,
  PatchOrderByIdReqType,
  PostOrderBodyType,
  PostOrderReturnType,
  PostOrderStatusBodyType,
  PostOrderStatusReturnType,
} from '@apis/order/OrderApi.type';

export class OrderApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // 	getOrder = async () => Promise<GetOrderReturnType> => {
  //
  // }

  postOrder = async (body: PostOrderBodyType): Promise<PostOrderReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/v1/order/',
      data: body,
    });
    return data;
  };

  getOrderStatus = async (
    userId?: string,
    pageParam?: string,
  ): Promise<GetOrderStatusReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: pageParam ? pageParam : `/v1/order/status/?user_id=${userId}`,
    });
    return data;
  };

  patchOrderById = async (
    req: PatchOrderByIdReqType,
  ): Promise<OrderByIdReturnType> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/v1/order/${req.id}/`,
      data: req.body,
    });
    return data;
  };

  postOrderStatus = async (
    body: PostOrderStatusBodyType,
  ): Promise<PostOrderStatusReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/v1/order/status/',
      data: body,
    });
    return data;
  };
}

const orderApi = new OrderApi();

export default orderApi;
