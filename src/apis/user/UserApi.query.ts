import { QueryHookParams } from '@apis/type';
import userApi from '@apis/user/UserApi';

import { QueryKey, useQuery } from '@tanstack/react-query';

import useCheckLogin from '../../hooks/useCheckLogin';

export const USER_API_QUERY_KEY = {
  GET_ME: (): QueryKey => ['get-me'],
};

export function useGetMeQuery(params?: QueryHookParams<typeof userApi.getMe>) {
  const { isLogIn } = useCheckLogin();
  const queryKey = USER_API_QUERY_KEY.GET_ME();
  const query = useQuery(queryKey, () => userApi.getMe(), {
    staleTime: 1000 * 60 * 120,
    cacheTime: 1000 * 60 * 120,
    enabled: !!isLogIn,
    ...params?.options,
  });
  return { ...query, queryKey };
}
