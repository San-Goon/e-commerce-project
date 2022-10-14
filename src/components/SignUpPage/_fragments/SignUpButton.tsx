import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form';

import { AxiosError } from 'axios';

import { Button, Center, useDisclosure } from '@chakra-ui/react';

import { usePostRegisterMutation } from '@apis/user/UserApi.mutation';

import SignUpModal from '@components/SignUpPage/_fragments/SignUpModal';

import { FormDataType } from '../_hooks/useSignUpForm';

import _isEmpty from 'lodash/isEmpty';

const SignUpButton = () => {
  const router = useRouter();
  const { formState, handleSubmit } = useFormContext<FormDataType>();
  const data = useWatch<FormDataType>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = usePostRegisterMutation({
    options: {
      onSuccess: () => {
        onOpen();
      },
      onError: (error: AxiosError) => {
        console.error(error);
      },
    },
  });

  const isDisabled = useMemo(() => {
    const { profilePath, ...rest } = data;
    const restValues = Object.values(rest);
    if (restValues.some((v) => v === '')) return true;
    if (!_isEmpty(formState.errors)) return true;
    return false;
  }, [formState, data]);

  const onSubmit: SubmitHandler<FormDataType> = ({
    email,
    phone,
    name,
    nickname,
    profilePath,
    gender,
    age,
    marketingAdAgree,
  }) => {
    mutate({
      email,
      phone,
      name,
      nickname,
      profilePath,
      gender,
      age,
      marketingAdAgree,
      socialToken: router.query.token as string,
    });
  };

  return (
    <>
      <Center mt="80px">
        <Button
          colorScheme="primary"
          onClick={handleSubmit(onSubmit)}
          isDisabled={isDisabled}
        >
          회원가입완료
        </Button>
      </Center>
      <SignUpModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SignUpButton;
