import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import {
  GetReviewByIdReturnType,
  GetReviewReqType,
  GetReviewReturnType,
  PostReviewBodyType,
  PostReviewReturnType,
  PutReviewReqType,
  PutReviewReturnType,
} from '@apis/review/ReviewApi.type';

export class ReviewApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  getReview = async ({
    userId,
    page,
  }: GetReviewReqType): Promise<GetReviewReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/review/?page=${page}&user_id=${userId}`,
    });
    return data;
  };

  getReviewById = async (id: number): Promise<GetReviewByIdReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/review/${id}/`,
    });
    return data;
  };

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

  putReview = async (req: PutReviewReqType): Promise<PutReviewReturnType> => {
    const { data } = await this.axios({
      method: 'PUT',
      url: `/v1/review/${req.id}/`,
      data: req.body,
    });
    return data;
  };
}

const reviewApi = new ReviewApi();

export default reviewApi;
