import { MutationHookParams } from '@apis/type';
import userApi from '@apis/user/UserApi';

import { useMutation } from '@tanstack/react-query';

export const USER_API_MUTATION_KEY = {
  POST: (param?: any) => ['user-post', param],
  PATCH: (param?: any) => ['user-patch', param],
  DELETE: (id: string) => ['user-delete', id],
};

export const usePostRefreshTokenMutation = (
  params?: MutationHookParams<typeof userApi.postRefreshToken>,
) => {
  return useMutation(userApi.postRefreshToken, {
    ...params?.options,
  });
};

export const usePatchMeMutation = (
  params?: MutationHookParams<typeof userApi.patchMe>,
) => {
  return useMutation(userApi.patchMe, {
    ...params?.options,
  });
};

export const useDeleteMeMutation = (
  params?: MutationHookParams<typeof userApi.deleteMe>,
) => {
  return useMutation(userApi.deleteMe, {
    ...params?.options,
  });
};

export const usePostSocialLoginMutation = (
  params?: MutationHookParams<typeof userApi.postSocialLogin>,
) => {
  return useMutation(userApi.postSocialLogin, {
    ...params?.options,
  });
};
export const usePostRegisterMutation = (
  params?: MutationHookParams<typeof userApi.postRegister>,
) => {
  return useMutation(userApi.postRegister, {
    ...params?.options,
  });
};

export const usePostWithdrawReasonMutation = (
  params?: MutationHookParams<typeof userApi.postWithdrawReason>,
) => {
  return useMutation(userApi.postWithdrawReason, {
    ...params?.options,
  });
};
