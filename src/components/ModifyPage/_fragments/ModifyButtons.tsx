import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { AxiosError } from 'axios';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { usePatchMeMutation } from '@apis/user/UserApi.mutation';

import ModifyModal from '@components/ModifyPage/_fragments/ModifyModal';
import { ModifyFormDataType } from '@components/ModifyPage/_hooks/useModifyForm';

import { useQueryClient } from '@tanstack/react-query';

const ModifyButtons = () => {
  const queryClient = useQueryClient();
  const { handleSubmit } = useFormContext<ModifyFormDataType>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = usePatchMeMutation({
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

  const onSubmit: SubmitHandler<ModifyFormDataType> = ({
    name,
    age,
    email,
    gender,
    nickname,
    phone,
  }) => {
    mutate({
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
