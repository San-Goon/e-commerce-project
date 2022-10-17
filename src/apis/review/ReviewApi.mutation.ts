import reviewApi from '@apis/review/ReviewApi';
import { MutationHookParams } from '@apis/type';

import { useMutation } from '@tanstack/react-query';

export const usePostReviewMutation = (
  params?: MutationHookParams<typeof reviewApi.postReview>,
) => {
  return useMutation(reviewApi.postReview, {
    ...params?.options,
  });
};
