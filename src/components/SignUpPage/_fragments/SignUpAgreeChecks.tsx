import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Flex, Text } from '@chakra-ui/react';

import Check from '@icons/System/Check';
import CircledCheck from '@icons/System/CircledCheck';

const SignUpAgreeChecks = () => {
  const { formState, getValues, setValue, watch } = useFormContext();
  watch();

  const [serviceAgree, PIAgree, marketingAdAgree] = getValues([
    'serviceAgree',
    'PIAgree',
    'marketingAdAgree',
  ]);

  const [agreeAll, setAgreeAll] = useState(false);

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

  useEffect(() => {
    if (serviceAgree && PIAgree && marketingAdAgree) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }, [serviceAgree, PIAgree, marketingAdAgree]);
  return (
    <>
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
            color={agreeAll ? 'primary.500' : 'gray.400'}
            onClick={onClickAll}
            cursor="pointer"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" h="50px">
          <Link href="https://toktokhan.notion.site/6e7a309e8d14464cad38fc86656d564a">
            <a target="_blank">
              <Text
                color="gray.600"
                textDecor="underline"
                fontWeight="400"
                fontSize="sm"
              >
                서비스 이용을 위한 필수약관 동의
              </Text>
            </a>
          </Link>
          <Check
            boxSize="24px"
            color={getValues('serviceAgree') ? 'primary.500' : 'gray.400'}
            onClick={onClickService}
            cursor="pointer"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" h="50px">
          <Link href="https://toktokhan.notion.site/3-2261ee2f25024c0a9b6a82a6f43fd0dc">
            <a target="_blank">
              <Text
                color="gray.600"
                textDecor="underline"
                fontWeight="400"
                fontSize="sm"
              >
                개인정보수집 및 이용, 제3자 제공 동의
              </Text>
            </a>
          </Link>
          <Check
            boxSize="24px"
            color={getValues('PIAgree') ? 'primary.500' : 'gray.400'}
            onClick={onClickPI}
            cursor="pointer"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" h="50px">
          <Link href="https://toktokhan.notion.site/24f69842ebec48df89a3656bac7cf4c9">
            <a target="_blank">
              <Text
                color="gray.600"
                textDecor="underline"
                fontWeight="400"
                fontSize="sm"
              >
                마케팅 정보 수신 및 맞춤형 광고 동의(선택)
              </Text>
            </a>
          </Link>
          <Check
            boxSize="24px"
            color={getValues('marketingAdAgree') ? 'primary.500' : 'gray.400'}
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
    </>
  );
};

export default SignUpAgreeChecks;
