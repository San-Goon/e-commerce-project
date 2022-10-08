import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

export class ReviewApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  postReview = async (body: any): Promise<any> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/v1/review/',
      data: body,
    });
    return data;
  };
}

const reviewApi = new ReviewApi();

export default reviewApi;
