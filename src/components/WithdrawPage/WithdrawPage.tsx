import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Box, Flex, Text } from '@chakra-ui/react';

import { useGetMeQuery } from '@apis/user/UserApi.query';

import WithdrawButtons from '@components/WithdrawPage/_fragments/WithdrawButtons';
import WithdrawForm from '@components/WithdrawPage/_fragments/WithdrawForm';
import useWithdrawForm, {
  defaultValues,
} from '@components/WithdrawPage/_hooks/useWithdrawForm';

const WithdrawPage = () => {
  const formData = useWithdrawForm({ defaultValues });
  const { data } = useGetMeQuery();

  return (
    <FormProvider {...formData}>
      <Box mt="130px">
        <Text textStyle="lg" fontWeight="700" ml="16px">
          회원탈퇴
        </Text>
        <Text mt="80px" p="18px" bg="gray.100" textStyle="md">
          회원 탈퇴 시 개인 정보 및 인코스런에서 만들어진 모든 데이터는
          삭제됩니다. 한 번 삭제된 정보는 복구가 불가능합니다.
        </Text>
        <Text my="14px" fontStyle="md" fontWeight="700" ml="16px">
          회원 정보
        </Text>
        <Flex mb="20px" ml="16px">
          <Box>
            <Text mt="15px" mb="10px">
              이름
            </Text>
            <Text mb="10px">핸드폰 번호</Text>
            <Text>이메일 주소</Text>
          </Box>
          <Box ml="24px" textColor="gray.700">
            <Text mt="15px" mb="10px">
              {data?.name}
            </Text>
            <Text mb="10px">{data?.phone}</Text>
            <Text>{data?.email}</Text>
          </Box>
        </Flex>
        <Box w="100vw" h="10px" backgroundColor="gray.100" />
        <WithdrawForm />
        <WithdrawButtons id={data?.id} />
      </Box>
    </FormProvider>
  );
};

export default WithdrawPage;
