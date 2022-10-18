import React from 'react';

import { Box, Divider, Flex, Text } from '@chakra-ui/react';

import { OrderByIdReturnType } from '@apis/order/OrderApi.type';

interface PropsType {
  data?: OrderByIdReturnType;
}

const ShipInfoSection = ({ data }: PropsType) => {
  return (
    <Box>
      <Flex h="55px" alignItems="center" textStyle="md" fontWeight="700">
        배송지 정보
      </Flex>
      <Divider />
      <Box textStyle="md" mt="15px" mb="24px">
        <Flex justifyContent="space-between">
          <Text>이름</Text>
          <Text color="gray.700">{data?.shipName}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>핸드폰 번호</Text>
          <Text color="gray.700">{data?.shipPhone}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>우편번호</Text>
          <Text color="gray.700">{data?.shipAddrPost}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>주소</Text>
          <Text color="gray.700">{data?.shipAddrDetail}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>배송요청사항</Text>
          <Text color="gray.700">{data?.orderMessage}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default ShipInfoSection;
