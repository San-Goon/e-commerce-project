import orderApi from '@apis/order/OrderApi';
import { QueryHookParams } from '@apis/type';

import { QueryKey, useQuery } from '@tanstack/react-query';

export const ORDER_API_QUERY_KEY = {
  GET_STATUS: (page: number): QueryKey => ['get-status', page],
  GET_BY_ID: (id: string): QueryKey => ['get-by-id', id],
};

export function useGetOrderStatusQuery(
  params: QueryHookParams<typeof orderApi.getOrderStatus>,
) {
  const queryKey = ORDER_API_QUERY_KEY.GET_STATUS(params.variables.page);
  const query = useQuery(
    queryKey,
    () => orderApi.getOrderStatus(params.variables),
    params.options,
  );
  return { ...query, queryKey };
}

export function useGetOrderByIdQuery(
  params: QueryHookParams<typeof orderApi.getOrderById>,
) {
  const queryKey = ORDER_API_QUERY_KEY.GET_BY_ID(params.variables);
  const query = useQuery(
    queryKey,
    () => orderApi.getOrderById(params.variables),
    params.options,
  );
  return { ...query, queryKey };
}
