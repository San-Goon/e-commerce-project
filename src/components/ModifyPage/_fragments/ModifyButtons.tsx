import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { AxiosError } from 'axios';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { usePutMeMutation } from '@apis/user/UserApi.mutation';

import ModifyModal from '@components/ModifyPage/_fragments/ModifyModal';
import { ModifyFormDataType } from '@components/ModifyPage/_hooks/useModifyForm';

import { useQueryClient } from '@tanstack/react-query';

import useProfileUpload from '../../../hooks/useProfileUpload';

const ModifyButtons = () => {
  const queryClient = useQueryClient();
  const { handleSubmit } = useFormContext<ModifyFormDataType>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { uploadFilesToS3 } = useProfileUpload();

  const { mutateAsync } = usePutMeMutation({
    options: {
      onSuccess: () => {
        onOpen();
        queryClient.invalidateQueries(['get-me']);
      },
      onError: (error: AxiosError) => {
        console.error(error);
      },
    },
  });

  const onSubmit: SubmitHandler<ModifyFormDataType> = async ({
    profileImg,
    name,
    age,
    email,
    gender,
    nickname,
    phone,
  }) => {
    let profilePath;
    if (profileImg) {
      if (typeof profileImg === 'string') {
        profilePath = profileImg;
      } else {
        profilePath = await uploadFilesToS3(profileImg[0]);
      }
    }
    await mutateAsync({
      profilePath,
      name,
      nickname,
      phone,
      email,
      gender,
      age,
    });
  };

  return (
    <Flex justifyContent="space-between">
      <Button
        w="165px"
        h="50px"
        textStyle="md"
        fontWeight="700"
        colorScheme="primary"
        variant="outline"
      >
        취소
      </Button>
      <Button
        w="165px"
        h="50px"
        colorScheme="primary"
        textStyle="md"
        fontWeight="700"
        onClick={handleSubmit(onSubmit)}
      >
        저장
      </Button>
      <ModifyModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default ModifyButtons;
