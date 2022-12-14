import { SubmitHandler, useFormContext } from 'react-hook-form';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { usePutReviewMutation } from '@apis/review/ReviewApi.mutation';
import useAppStore from '@features/useAppStore';

import ModifyDoneModal from '@components/MyReviewPage/_fragments/ModifyDoneModal';

import { useQueryClient } from '@tanstack/react-query';

import usePhotosUpload from '../../../hooks/usePhotosUpload';
import { FormDataType } from '../../../hooks/useReviewForm';

interface PropsType {
  id: number;
  onClose: () => void;
}

const ModifyReviewButtons = ({ id, onClose }: PropsType) => {
  const queryClient = useQueryClient();
  const queryKey = useAppStore((store) => store.QUERY_KEY.reviewQueryKey);
  const { isOpen: isOpenDoneModal, onOpen: onOpenDoneModal } = useDisclosure();
  const { handleSubmit } = useFormContext<FormDataType>();
  const { uploadFilesToS3 } = usePhotosUpload();

  const { mutateAsync } = usePutReviewMutation({
    options: {
      onSuccess: () => {
        onOpenDoneModal();
        queryClient.invalidateQueries(queryKey);
      },
    },
  });

  const onSubmit: SubmitHandler<FormDataType> = async ({
    images,
    content,
    rating,
  }) => {
    const reviewimagePath: string[] = [];
    for (const image of images) {
      if (typeof image === 'string') {
        reviewimagePath.push(image.split('.com/')[1]);
      } else {
        const imagePath = await uploadFilesToS3(image);
        reviewimagePath.push(imagePath.split('.com/')[1]);
      }
    }
    await mutateAsync({
      id,
      body: {
        rate: rating,
        content,
        reviewimagePath,
      },
    });
  };
  return (
    <Flex>
      <Button colorScheme="primary" onClick={handleSubmit(onSubmit)}>
        수정하기
      </Button>
      <Button colorScheme="primary" variant="outline" onClick={onClose}>
        닫기
      </Button>
      <ModifyDoneModal isOpen={isOpenDoneModal} onClose={onClose} />
    </Flex>
  );
};

export default ModifyReviewButtons;
