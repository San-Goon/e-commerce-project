import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';

import { formatPrice } from '@utils/format';

interface PropsType {
  item: GetProductByIdReturnType & { count: number };
}

const ProductsList = ({ item }: PropsType) => {
  return (
    <Box m="16px">
      <Flex mb="15px" alignItems="center">
        <Box ml="10px">
          <Image src={item.photo} boxSize="60px" />
        </Box>
        <Box ml="10px" textStyle="sm">
          <Text fontWeight="700">{item.name}</Text>
          <Text color="gray.600">{`${item.name} | ${item.capacity}ml`}</Text>
          <Text color="primary.500" fontWeight="700">
            {formatPrice(item.count * item.price)}원 / {item.count}개
          </Text>
        </Box>
        <Text textStyle="sm" color="primary.500" ml="auto" fontWeight="700">
          결제완료
        </Text>
      </Flex>
    </Box>
  );
};

export default ProductsList;
