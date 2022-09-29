import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

export class UserApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getMe = async (params?: any): Promise<any> => {
    const data = await this.axios({
      method: 'GET',
      url: '/v1/user/me/',
      params,
    });
    return data;
  };

  postRefreshToken = async (body: any): Promise<any> => {
    const data = await this.axios({
      method: 'POST',
      url: '/v1/user/refresh/',
      data: body,
    });
    return data;
  };

  postSocialLogin = async (body: any): Promise<any> => {
    const data = await this.axios({
      method: 'POST',
      url: '/v1/user/social_login/',
      data: body,
    });
    return data;
  };

  postRegister = async (body: any): Promise<any> => {
    const data = await this.axios({
      method: 'POST',
      url: '/v1/user/register/',
      data: body,
    });
    return data;
  };
}

const userApi = new UserApi();

export default userApi;
