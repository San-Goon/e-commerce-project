import { useCallback } from 'react';

import dayjs from 'dayjs';

import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';

import { PostReviewReturnType } from '@apis/review/ReviewApi.type';

import ModifyReviewModal from '@components/MyReviewPage/_fragments/ModifyReviewModal';
import ImagesComponent from '@components/common/ImagesComponent';

import { RatingStarIcon } from '../../../generated/icons/MyIcons';

interface PropsType {
  review: PostReviewReturnType;
}

const ReviewItem = ({ review }: PropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickModify = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Box key={review.id} py="25px" borderBottom="1px" borderColor="gray.200">
      <Flex justifyContent="space-between">
        <Box>
          <Text textStyle="sm" fontWeight="700">
            {review.nickname}
          </Text>
          <Text mt="2px" textStyle="sm" color="gray.600">
            {dayjs(review.created).format('YYYY-MM-DD')}
          </Text>
        </Box>
        <Flex>
          {[1, 2, 3, 4, 5].map((rate) => {
            return (
              <RatingStarIcon
                key={rate}
                mx="3px"
                boxSize="10px"
                color={rate <= review.rate ? 'primary.500' : 'gray.400'}
              />
            );
          })}
        </Flex>
      </Flex>
      <Flex justifyContent="space-between">
        <Text mt="17px">{review.content}</Text>
        <Button
          colorScheme="primary"
          variant="outline"
          w="90px"
          h="30px"
          borderRadius="5px"
          onClick={onClickModify}
        >
          수정하기
        </Button>
      </Flex>
      <Flex mt="10px">
        {review.reviewimageSet.map((item, idx) => {
          return <ImagesComponent url={item.url} key={idx} />;
        })}
      </Flex>
      <ModifyReviewModal isOpen={isOpen} onClose={onClose} id={review.id} />
    </Box>
  );
};

export default ReviewItem;
