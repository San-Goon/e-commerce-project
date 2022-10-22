import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import {
  PostReviewBodyType,
  PostReviewReturnType,
} from '@apis/review/ReviewApi.type';

export class ReviewApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  postReview = async (
    body: PostReviewBodyType,
  ): Promise<PostReviewReturnType> => {
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
