import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { Button, Center, useDisclosure } from '@chakra-ui/react';

import { usePostReviewMutation } from '@apis/review/ReviewApi.mutation';
import { useGetMeQuery } from '@apis/user/UserApi.query';

import ReviewModal from '@components/ReviewPage/_fragment/ReviewModal';

import usePhotosUpload from '../../../hooks/usePhotosUpload';
import { FormDataType } from '../../../hooks/useReviewForm';

const ReviewButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormDataType>();
  const { uploadFilesToS3 } = usePhotosUpload();
  const { mutateAsync } = usePostReviewMutation({
    options: {
      onSuccess: () => {
        onOpen();
      },
    },
  });
  const { data } = useGetMeQuery();
  const onSubmit: SubmitHandler<FormDataType> = async ({
    images,
    content,
    rating,
  }) => {
    const reviewimagePath: string[] = [];
    for (const image of images) {
      const imagePath = await uploadFilesToS3(image as File);
      reviewimagePath.push(imagePath.split('.com/')[1]);
    }
    await mutateAsync({
      userId: data?.id as number,
      productId: router.query.productId as unknown as number,
      orderItemId: router.query.orderId as unknown as number,
      rate: rating,
      content,
      reviewimagePath,
    });
  };

  return (
    <>
      <Center>
        <Button
          colorScheme="primary"
          mb="30px"
          onClick={handleSubmit(onSubmit)}
        >
          작성하기
        </Button>
      </Center>
      <ReviewModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ReviewButton;
