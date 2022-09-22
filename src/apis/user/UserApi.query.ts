import userApi from '@apis/user/UserApi';

import { useQuery } from '@tanstack/react-query';

export const USER_API_QUERY_KEY = {
  GET: (param?: any) => ['me', param],
};

export function useGetMeQuery(params?: any) {
  const queryKey = USER_API_QUERY_KEY.GET(params?.variables);
  const query = useQuery(
    queryKey,
    () => userApi.getMe(params?.variables),
    params?.options,
  );
  return { ...query, queryKey };
}
