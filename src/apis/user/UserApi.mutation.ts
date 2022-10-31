import { MutationHookParams } from '@apis/type';
import userApi from '@apis/user/UserApi';

import { useMutation } from '@tanstack/react-query';

// export const usePostRefreshTokenMutation = (
//   params?: MutationHookParams<typeof userApi.postRefreshToken>,
// ) => {
//   return useMutation(userApi.postRefreshToken, {
//     ...params?.options,
//   });
// };

export const usePutMeMutation = (
  params?: MutationHookParams<typeof userApi.putMe>,
) => {
  return useMutation(userApi.putMe, {
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
