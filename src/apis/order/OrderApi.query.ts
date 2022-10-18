import orderApi from '@apis/order/OrderApi';
import { InfiniteQueryHookParams } from '@apis/type';

import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

export const ORDER_API_QUERY_KEY = {
  GET_STATUS: (): QueryKey => ['get-status'],
};

export function useGetOrderStatusQuery(
  params: InfiniteQueryHookParams<typeof orderApi.getOrderStatus>,
) {
  const queryKey = ORDER_API_QUERY_KEY.GET_STATUS();
  const query = useInfiniteQuery(
    queryKey,
    ({ pageParam = undefined }) =>
      orderApi.getOrderStatus(params?.variables, pageParam),
    params.options,
  );
  return { ...query, queryKey };
}
