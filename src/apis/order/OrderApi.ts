import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import {
  GetOrderStatusReqType,
  GetOrderStatusReturnType,
  OrderByIdReturnType,
  PatchOrderByIdReqType,
  PatchOrderShippingStatusReqType,
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

  postOrder = async (body: PostOrderBodyType): Promise<PostOrderReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/v1/order/',
      data: body,
    });
    return data;
  };

  getOrderStatus = async ({
    userId,
    page,
  }: GetOrderStatusReqType): Promise<GetOrderStatusReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/order/status/?page=${page}&user_id=${userId}`,
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
  patchOrderShippingStatus = async (
    req: PatchOrderShippingStatusReqType,
  ): Promise<PostOrderStatusReturnType> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/v1/order/status/${req.userId}/`,
      data: req.body,
    });
    return data;
  };
}

const orderApi = new OrderApi();

export default orderApi;
