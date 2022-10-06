import productApi from '@apis/product/ProductApi';
import { ProductParamGetType } from '@apis/product/ProductApi.type';
import { QueryHookParams } from '@apis/type';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const PRODUCT_API_QUERY_KEY = {
  GET: (param?: ProductParamGetType) => ['products-list', param],
  GET_BY_ID: (id: string) => ['product-by-id', id],
};

export function useGetProductListQuery(
  params?: QueryHookParams<typeof productApi.getProductList>,
) {
  const queryKey = PRODUCT_API_QUERY_KEY.GET(params?.variables);
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
  const queryKey = PRODUCT_API_QUERY_KEY.GET_BY_ID(params?.variables);
  const query = useQuery(
    queryKey,
    () => productApi.getProductById(params?.variables),
    params?.options,
  );
  return { ...query, queryKey };
}
