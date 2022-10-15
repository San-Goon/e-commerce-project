import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Box, Image, Text } from '@chakra-ui/react';

import SignUpAgreeChecks from '@components/SignUpPage/_fragments/SignUpAgreeChecks';
import SignUpButton from '@components/SignUpPage/_fragments/SignUpButton';
import InfoForm from '@components/common/InfoForm';

import useSignUpForm, { defaultValues } from './_hooks/useSignUpForm';

const SignUpPage = () => {
  const formData = useSignUpForm({ defaultValues });

  return (
    <FormProvider {...formData}>
      <Box m="16px">
        <Image mt="16px" src="/images/signup/logo.png" />
        <Text fontWeight="700" fontSize="xl" mt="41px" mb="60px">
          회원가입
        </Text>
        <InfoForm />
        <SignUpAgreeChecks />
        <SignUpButton />
      </Box>
    </FormProvider>
  );
};

export default SignUpPage;
