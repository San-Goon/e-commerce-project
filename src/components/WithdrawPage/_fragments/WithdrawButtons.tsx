import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { AxiosError } from 'axios';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import {
  useDeleteMeMutation,
  usePostWithdrawReasonMutation,
} from '@apis/user/UserApi.mutation';

import WithdrawModal from '@components/WithdrawPage/_fragments/WithdrawModal';
import { FormDataType } from '@components/WithdrawPage/_hooks/useWithdrawForm';

const WithdrawButtons = () => {
  const { handleSubmit } = useFormContext<FormDataType>();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: mutatePostReason } = usePostWithdrawReasonMutation({
    options: {
      onSuccess: () => {
        mutateDeleteMe(router.query.id as string);
      },
      onError: (error: AxiosError) => {
        console.error(error);
      },
    },
  });
  const { mutate: mutateDeleteMe } = useDeleteMeMutation({
    options: {
      onSuccess: () => {
        onOpen();
      },
      onError: (error: AxiosError) => {
        console.error(error);
      },
    },
  });

  const onClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    mutatePostReason(data);
  };
  return (
    <>
      <Flex mt="80px" mb="30px" mx="16px" justifyContent="space-between">
        <Button colorScheme="primary" variant="outline" onClick={onClickBack}>
          취소
        </Button>
        <Button colorScheme="primary" onClick={handleSubmit(onSubmit)}>
          탈퇴하기
        </Button>
      </Flex>
      <WithdrawModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default WithdrawButtons;
