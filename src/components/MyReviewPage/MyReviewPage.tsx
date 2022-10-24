import React, { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Box, Text } from '@chakra-ui/react';

import { useGetReviewQuery } from '@apis/review/ReviewApi.query';
import { useGetMeQuery } from '@apis/user/UserApi.query';
import { queryKeySliceActions } from '@features/queryKey/queryKeySlice';

import ReviewListSection from '@components/MyReviewPage/_fragments/ReviewListSection';
import Pagination from '@components/common/Pagination';

import useReviewForm, { defaultValues } from '../../hooks/useReviewForm';

const MyReviewPage = () => {
  const formData = useReviewForm({ defaultValues });

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { data } = useGetMeQuery();
  const { data: reviews, queryKey } = useGetReviewQuery({
    variables: { userId: data?.id as number, page },
    options: {
      enabled: !!data?.id,
      onSuccess: () => {
        dispatch(
          queryKeySliceActions.setReviewQueryKey(queryKey as [string, number]),
        );
      },
    },
  });

  const numPages = useMemo(() => {
    return Math.ceil((reviews?.count as number) / 5);
  }, [reviews]);

  return (
    <FormProvider {...formData}>
      <Box mb="80px">
        <Text textStyle="lg" fontWeight="700">
          내 상품 리뷰
        </Text>
        {reviews && <ReviewListSection reviews={reviews} />}
        {numPages && (
          <Pagination numPages={numPages} page={page} setPage={setPage} />
        )}
      </Box>
    </FormProvider>
  );
};

export default MyReviewPage;
