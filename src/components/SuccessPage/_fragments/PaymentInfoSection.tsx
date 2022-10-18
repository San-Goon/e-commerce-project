import React from 'react';

import { Box, Divider, Flex, Text } from '@chakra-ui/react';

import { OrderByIdReturnType } from '@apis/order/OrderApi.type';

import { formatPrice } from '@utils/format';

interface PropsType {
  data?: OrderByIdReturnType;
}

const PaymentInfoSection = ({ data }: PropsType) => {
  return (
    <Box>
      <Flex h="55px" alignItems="center" textStyle="md" fontWeight="700">
        결제 정보
      </Flex>
      <Divider />
      {data && (
        <>
          <Box textStyle="md" color="gray.700" mt="15px" mb="30px">
            <Flex justifyContent="space-between">
              <Text>총 결제금액</Text>
              <Text>{formatPrice(data?.amount)} 원</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>총 배송비</Text>
              <Text>{formatPrice(data?.shippingPrice)} 원</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>결제수단</Text>
              <Text fontWeight="700">{data?.method}</Text>
            </Flex>
          </Box>
          <Divider />
          <Flex
            justifyContent="space-between"
            textStyle="md"
            mt="15px"
            mb="50px"
          >
            <Text>결제금액</Text>
            <Text color="primary.500" fontWeight="700">
              {formatPrice(data?.amount + data?.shippingPrice)} 원
            </Text>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default PaymentInfoSection;
