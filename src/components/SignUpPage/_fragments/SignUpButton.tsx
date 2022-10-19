import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form';

import { Button, Center } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';

import { usePostRegisterMutation } from '@apis/user/UserApi.mutation';

import { getToken, setToken } from '@utils/cookie/token';

import { FormDataType } from '../_hooks/useSignUpForm';

import _isEmpty from 'lodash/isEmpty';

const SignUpButton = () => {
  const toast = useToast();
  const router = useRouter();
  const { formState, handleSubmit } = useFormContext<FormDataType>();
  const data = useWatch<FormDataType>();
  const { mutate } = usePostRegisterMutation({
    options: {
      onSuccess: (data) => {
        setToken({
          access: data.access,
          isRegister: true,
          refresh: data.refresh,
        });
        router.push('/signup/done');
      },
      onError: (error: any) => {
        for (const key in error.response.data) {
          toast({
            status: 'error',
            description: error.response.data[key][0],
          });
        }
      },
    },
  });

  const token = getToken();

  useEffect(() => {
    if (!token?.socialToken) {
      alert('비정상적인 접근입니다.');
      router.back();
    }
  }, []);

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
      socialToken: token?.socialToken as string,
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
    </>
  );
};

export default SignUpButton;
