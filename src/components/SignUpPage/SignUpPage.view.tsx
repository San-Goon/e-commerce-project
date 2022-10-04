import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Box, BoxProps, Button, Flex, Image, Text } from '@chakra-ui/react';

import { usePostRegisterMutation } from '@apis/user/UserApi.mutation';

import { FormDataType } from '@components/SignUpPage/_hook/useSignUpForm';
import InfoForm from '@components/common/InfoForm';
import Check from '@icons/System/Check';
import CircledCheck from '@icons/System/CircledCheck';

interface FormPageProps extends BoxProps {
  formData: UseFormReturn<FormDataType>;
}

function SignUpPageView({ formData }: FormPageProps) {
  const router = useRouter();
  const { formState, handleSubmit, setValue, getValues, watch } = formData;
  watch(['serviceAgree', 'PIAgree', 'marketingAdAgree']);
  const { mutate } = usePostRegisterMutation();
  const onSubmit = handleSubmit(
    ({ name, nickname, gender, phone, email, age, marketingAdAgree }) => {
      console.log(name, nickname, gender, phone, email, age);
      mutate({
        name,
        nickname,
        gender,
        phone,
        email,
        age,
        profile: 'http://naver.com',
        socialToken: router.query.token,
        marketingAdAgree,
      });
    },
  );
  const [agreeAll, setAgreeAll] = useState(false);

  const [serviceAgree, PIAgree, marketingAdAgree] = getValues([
    'serviceAgree',
    'PIAgree',
    'marketingAdAgree',
  ]);

  const onClickAll = React.useCallback(() => {
    if (agreeAll) {
      setAgreeAll(false);
      setValue('serviceAgree', false);
      setValue('PIAgree', false);
      setValue('marketingAdAgree', false);
    } else {
      setAgreeAll(true);
      setValue('serviceAgree', true);
      setValue('PIAgree', true);
      setValue('marketingAdAgree', true);
    }
  }, [agreeAll, setValue]);

  const onClickService = () => {
    setValue('serviceAgree', !getValues('serviceAgree'));
  };

  const onClickPI = () => {
    setValue('PIAgree', !getValues('PIAgree'));
  };

  const onClickMarketing = () => {
    setValue('marketingAdAgree', !getValues('marketingAdAgree'));
  };

  React.useEffect(() => {
    if (serviceAgree && PIAgree && marketingAdAgree) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }, [serviceAgree, PIAgree, marketingAdAgree]);

  return (
    <Box as="form" m="16px" onSubmit={onSubmit}>
      <Image mt="16px" src="/images/signup/logo.png" />
      <Text fontWeight="700" fontSize="xl" mt="41px" mb="60px">
        회원가입
      </Text>
      <InfoForm />
      <Text fontWeight="700" fontSize="md" mt="80px" mb="40px">
        이용약관동의
      </Text>

      <Box>
        <Flex
          h="40px"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="2px"
          borderColor="primary.500"
        >
          <Text color="primary.500" fontWeight="700" fontSize="md">
            아래 약관에 모두 동의합니다.
          </Text>
          <CircledCheck
            boxSize="24px"
            color={agreeAll ? 'primary.500' : '#CBCED6'}
            onClick={onClickAll}
            cursor="pointer"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" h="50px">
          <Text
            color="gray.600"
            textDecor="underline"
            fontWeight="400"
            fontSize="sm"
          >
            서비스 이용을 위한 필수약관 동의
          </Text>
          <Check
            boxSize="24px"
            color={getValues('serviceAgree') ? 'primary.500' : '#CBCED6'}
            onClick={onClickService}
            cursor="pointer"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" h="50px">
          <Text
            color="gray.600"
            textDecor="underline"
            fontWeight="400"
            fontSize="sm"
          >
            개인정보수집 및 이용, 제3자 제공 동의
          </Text>
          <Check
            boxSize="24px"
            color={getValues('PIAgree') ? 'primary.500' : '#CBCED6'}
            onClick={onClickPI}
            cursor="pointer"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" h="50px">
          <Text
            color="gray.600"
            textDecor="underline"
            fontWeight="400"
            fontSize="sm"
          >
            마케팅 정보 수신 및 맞춤형 광고 동의(선택)
          </Text>
          <Check
            boxSize="24px"
            color={getValues('marketingAdAgree') ? 'primary.500' : '#CBCED6'}
            onClick={onClickMarketing}
            cursor="pointer"
          />
        </Flex>
        {(formState.errors?.PIAgree || formState.errors?.serviceAgree) && (
          <Text textStyle="md" color="red">
            필수약관에 모두 동의해주셔야 합니다.
          </Text>
        )}
      </Box>

      <Flex justifyContent="center" alignItems="center" mt="80px">
        <Button colorScheme="primary" type="submit">
          회원가입완료
        </Button>
      </Flex>
    </Box>
  );
}

export default SignUpPageView;
