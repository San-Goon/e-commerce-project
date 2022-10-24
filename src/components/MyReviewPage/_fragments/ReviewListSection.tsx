import { Box, Text } from '@chakra-ui/react';

import { GetReviewReturnType } from '@apis/review/ReviewApi.type';

import ReviewItem from '@components/MyReviewPage/_fragments/ReviewItem';

interface PropsType {
  reviews: GetReviewReturnType;
}

const ReviewListSection = ({ reviews }: PropsType) => {
  return (
    <Box mt="80px">
      <Text textStyle="md" fontWeight="700">
        총{' '}
        <Text color="primary.500" as="span">
          {reviews.count}
        </Text>
        건
      </Text>
      <Box>
        {reviews.results.map((review) => {
          return <ReviewItem review={review} key={review.id} />;
        })}
      </Box>
    </Box>
  );
};

export default ReviewListSection;
