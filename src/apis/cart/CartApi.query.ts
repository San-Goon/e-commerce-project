import cartApi from '@apis/cart/CartApi';
import { QueryHookParams } from '@apis/type';

import { QueryKey, useQuery } from '@tanstack/react-query';

export const CART_API_QUERY_KEY = {
  GET: (): QueryKey => ['get-cart'],
};

export function useGetCartQuery(
  params: QueryHookParams<typeof cartApi.getCart>,
) {
  const queryKey = CART_API_QUERY_KEY.GET();
  const query = useQuery(
    queryKey,
    () => cartApi.getCart(params.variables),
    params.options,
  );
  return { ...query, queryKey };
}
