import reviewApi from '@apis/review/ReviewApi';
import { QueryHookParams } from '@apis/type';

import { QueryKey, useQuery } from '@tanstack/react-query';

export const REVIEW_API_QUERY_KEY = {
  GET_REVIEW: (page: number): QueryKey => ['get-review', page],
  GET_REVIEW_BY_ID: (id: number): QueryKey => ['get-review-by-id', id],
};

export function useGetReviewQuery(
  params: QueryHookParams<typeof reviewApi.getReview>,
) {
  const queryKey = REVIEW_API_QUERY_KEY.GET_REVIEW(params.variables.page);
  const query = useQuery(
    queryKey,
    () => reviewApi.getReview(params.variables),
    params.options,
  );
  return { ...query, queryKey };
}

export function useGetReviewByIdQuery(
  params: QueryHookParams<typeof reviewApi.getReviewById>,
) {
  const queryKey = REVIEW_API_QUERY_KEY.GET_REVIEW_BY_ID(params.variables);
  const query = useQuery(
    queryKey,
    () => reviewApi.getReviewById(params.variables),
    params.options,
  );
  return { ...query, queryKey };
}
