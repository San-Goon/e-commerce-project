import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Box, Flex, Text } from '@chakra-ui/react';

import WithdrawButtons from '@components/WithdrawPage/_fragments/WithdrawButtons';
import WithdrawForm from '@components/WithdrawPage/_fragments/WithdrawForm';
import useWithdrawForm, {
  defaultValues,
} from '@components/WithdrawPage/_hooks/useWithdrawForm';

const WithdrawPage = () => {
  const formData = useWithdrawForm({ defaultValues });
  const router = useRouter();

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
              {router.query.name}
            </Text>
            <Text mb="10px">{router.query.phone}</Text>
            <Text>{router.query.email}</Text>
          </Box>
        </Flex>
        <Box w="100vw" h="10px" backgroundColor="gray.100" />
        <WithdrawForm />
        <WithdrawButtons />
      </Box>
    </FormProvider>
  );
};

export default WithdrawPage;
