import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Button, Flex } from '@chakra-ui/react';

import { useGetMeQuery } from '@apis/user/UserApi.query';

import InfoForm from '@components/common/InfoForm';

const ModifyPageView = ({ onSubmit }: any) => {
  const { setValue } = useFormContext();
  useGetMeQuery({
    options: {
      onSuccess: ({ data }) => {
        setValue('name', data.name);
        setValue('nickname', data.nickname);
        setValue('email', data.email);
        setValue('phone', data.phone);
        setValue('gender', data.gender);
        setValue('age', data.age);
      },
    },
  });
  return (
    <Box as="form" m="16px" onSubmit={onSubmit}>
      <InfoForm />
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
        <Button colorScheme="primary" textStyle="md" fontWeight="700">
          저장
        </Button>
      </Flex>
    </Box>
  );
};

export default ModifyPageView;
