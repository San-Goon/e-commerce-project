import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';

import { formatPrice } from '@utils/format';
import { CartItem } from '@utils/types';

interface PropsType {
  item: GetProductByIdReturnType & CartItem;
}

const ListComponent = ({ item }: PropsType) => {
  return (
    <Box m="16px" alignItems="center">
      <Flex mb="15px">
        <Box ml="10px">
          <Image src={item.photo} boxSize="60px" />
        </Box>
        <Box ml="10px" textStyle="sm">
          <Text fontWeight="700">{item.name}</Text>
          <Text color="gray.600">{`${item.name} | ${item.capacity}ml`}</Text>
          <Text color="primary.500" fontWeight="700">
            {formatPrice(item.price * item.count)}원 / {item.count}개
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ListComponent;
