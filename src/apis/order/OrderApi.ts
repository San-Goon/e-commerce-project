import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import {
  PostOrderBodyType,
  PostOrderReturnType,
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
}

const orderApi = new OrderApi();

export default orderApi;
