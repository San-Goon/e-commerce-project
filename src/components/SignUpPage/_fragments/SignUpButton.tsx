import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';

import { Button, Center, useDisclosure } from '@chakra-ui/react';

import { usePostRegisterMutation } from '@apis/user/UserApi.mutation';
import useAppStore from '@features/useAppStore';
import { userSliceActions } from '@features/user/userSlice';

import SignUpModal from '@components/SignUpPage/_fragments/SignUpModal';

import { setToken } from '@utils/cookie/token';

import { FormDataType } from '../_hooks/useSignUpForm';

import _isEmpty from 'lodash/isEmpty';

const SignUpButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { formState, handleSubmit } = useFormContext<FormDataType>();
  const data = useWatch<FormDataType>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = usePostRegisterMutation({
    options: {
      onSuccess: (data) => {
        dispatch(userSliceActions.deleteSocialToken());
        setToken({
          access: data.access,
          isRegister: true,
          refresh: data.refresh,
        });
        onOpen();
      },
      onError: (error: AxiosError) => {
        console.error(error);
      },
    },
  });

  const socialToken = useAppStore((store) => store.USER.socialToken);

  useEffect(() => {
    if (!socialToken) {
      alert('비정상적인 접근입니다.');
      router.back();
    }
  }, [socialToken, router]);

  const isDisabled = useMemo(() => {
    const values = Object.values(data);
    if (values.some((v) => v === '')) return true;
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
      socialToken,
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
      <SignUpModal router={router} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SignUpButton;
