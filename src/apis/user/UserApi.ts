import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';
import {
  GetMeReturnType, // PostRefreshTokenType,
  PostRegisterBodyType,
  PostRegisterReturnType,
  PostSocialLoginBodyType,
  PostSocialLoginReturnType,
  PostWithdrawReasonType,
  PutMeBodyType,
  PutMeReturnType,
} from '@apis/user/UserApi.type';

export class UserApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getMe = async (): Promise<GetMeReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: '/v1/user/me/',
    });
    return data;
  };

  putMe = async (body: PutMeBodyType): Promise<PutMeReturnType> => {
    const { data } = await this.axios({
      method: 'PUT',
      url: '/v1/user/me/',
      data: body,
    });
    return data;
  };

  deleteMe = async (id: number): Promise<void> => {
    await this.axios({
      method: 'DELETE',
      url: `/v1/user/withdrawal/${id}/`,
    });
  };

  // postRefreshToken = async (refresh: string): Promise<PostRefreshTokenType> => {
  //   const { data } = await this.axios({
  //     method: 'POST',
  //     url: '/v1/user/refresh/',
  //     data: { refresh },
  //   });
  //   return data;
  // };

  postSocialLogin = async (
    body: PostSocialLoginBodyType,
  ): Promise<PostSocialLoginReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/v1/user/social_login/',
      data: body,
    });
    return data;
  };

  postRegister = async (
    body: PostRegisterBodyType,
  ): Promise<PostRegisterReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/v1/user/register/',
      data: body,
    });
    return data;
  };

  postWithdrawReason = async (
    body: PostWithdrawReasonType,
  ): Promise<PostWithdrawReasonType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/v1/user/withdrawal/reason/',
      data: body,
    });
    return data;
  };
}

const userApi = new UserApi();

export default userApi;
