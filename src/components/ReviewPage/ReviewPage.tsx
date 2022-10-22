import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Box, Text } from '@chakra-ui/react';

import ProductListSection from '@components/ReviewPage/_fragment/ProductListSection';
import ReviewButton from '@components/ReviewPage/_fragment/ReviewButton';
import ReviewInputSection from '@components/ReviewPage/_fragment/ReviewInputSection';
import useReviewForm, {
  defaultValues,
} from '@components/ReviewPage/_hooks/useReviewForm';

const ReviewPage = () => {
  const formData = useReviewForm({ defaultValues });

  return (
    <FormProvider {...formData}>
      <Box p="16px">
        <Text textStyle="lg" fontWeight="700" mb="100px">
          리뷰작성
        </Text>
        <Box w="100vw" h="10px" backgroundColor="gray.100" />
        <ProductListSection />
        <Box w="100vw" h="10px" backgroundColor="gray.100" />
        <ReviewInputSection />
        <ReviewButton />
      </Box>
    </FormProvider>
  );
};

export default ReviewPage;
