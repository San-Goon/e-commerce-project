import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import {
  GetOrderByIdReturnType,
  GetOrderStatusReqType,
  GetOrderStatusReturnType,
  OrderByIdReturnType,
  PatchOrderByIdReqType,
  PostOrderBodyType,
  PostOrderReturnType,
  PostOrderStatusBodyType,
  PostOrderStatusReturnType,
  PutOrderShippingStatusReqType,
  PutOrderShippingStatusReturnType,
} from '@apis/order/OrderApi.type';

export class OrderApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getOrderById = async (id: string): Promise<GetOrderByIdReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/order/${id}/`,
    });
    return data;
  };

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
  putOrderShippingStatus = async (
    req: PutOrderShippingStatusReqType,
  ): Promise<PutOrderShippingStatusReturnType> => {
    const { data } = await this.axios({
      method: 'PUT',
      url: `/v1/order/status/${req.orderId}/`,
      data: req.body,
    });
    return data;
  };
}

const orderApi = new OrderApi();

export default orderApi;
