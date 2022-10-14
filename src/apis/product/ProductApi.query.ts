import productApi from '@apis/product/ProductApi';
import { InfiniteQueryHookParams, QueryHookParams } from '@apis/type';

import {
  QueryKey,
  useInfiniteQuery,
  useQueries,
  useQuery,
} from '@tanstack/react-query';

export const PRODUCT_API_QUERY_KEY = {
  GET: (): QueryKey => ['products-list'],
  GET_BY_ID: (id: string) => ['product-by-id', id],
};

export function useGetProductListQuery(
  params?: InfiniteQueryHookParams<typeof productApi.getProductList>,
) {
  const queryKey = PRODUCT_API_QUERY_KEY.GET();
  const query = useInfiniteQuery(
    queryKey,
    ({ pageParam = undefined }) => productApi.getProductList(pageParam),
    params?.options,
  );
  return { ...query, queryKey };
}

export function useGetProductByIdQuery(
  params: QueryHookParams<typeof productApi.getProductById>,
) {
  const queryKey = PRODUCT_API_QUERY_KEY.GET_BY_ID(params.variables);
  const query = useQuery(
    queryKey,
    () => productApi.getProductById(params.variables),
    params.options,
  );
  return { ...query, queryKey };
}

export function useGetProductsByIdQueries(
  ids: string[],
  params?: QueryHookParams<typeof productApi.getProductById>,
) {
  const queries = ids.map((id) => {
    return {
      queryKey: PRODUCT_API_QUERY_KEY.GET_BY_ID(id),
      queryFn: () => productApi.getProductById(id),
      staleTime: Infinity,
    };
  });
  const query = useQueries({
    queries,
  });
  return { ...query };
}
