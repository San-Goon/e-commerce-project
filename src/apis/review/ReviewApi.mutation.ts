import reviewApi from '@apis/review/ReviewApi';
import { MutationHookParams } from '@apis/type';

import { useMutation } from '@tanstack/react-query';

export const REVIEW_API_MUTATION_KEY = {
  POST: (param?: any) => ['post-review', param],
};

export const usePostReviewMutation = (
  params?: MutationHookParams<typeof reviewApi.postReview>,
) => {
  return useMutation(reviewApi.postReview, {
    ...params?.options,
  });
};
