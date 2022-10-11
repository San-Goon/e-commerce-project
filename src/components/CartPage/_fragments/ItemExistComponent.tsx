import React, { useState } from 'react';

import { Box, Button, Center, Divider, Flex, Text } from '@chakra-ui/react';

import ShowItemComponent from '@components/CartPage/_fragments/ShowItemComponent';
import CheckBox from '@components/common/CheckBox';

import { formatPrice } from '@utils/format';
import { CartItem } from '@utils/types';

interface IProps {
  items: CartItem[];
}

const ItemExistComponent = ({ items }: IProps) => {
  const [totalPrice, setTotalPrice] = useState(0);
  return (
    <>
      <Flex
        h="50px"
        mx="16px"
        justifyContent="space-between"
        alignItems="center"
        textColor="gray.600"
        textStyle="md"
      >
        <CheckBox checked={false}>모두 선택</CheckBox>
        <Text>선택삭제</Text>
      </Flex>
      <Box w="100vw" h="10px" backgroundColor="gray.100" />
      {items.map((item) => {
        return (
          <ShowItemComponent
            item={item}
            key={item.id}
            setTotalPrice={setTotalPrice}
          />
        );
      })}
      <Box w="100vw" h="10px" backgroundColor="gray.100" />
      <Flex
        mx="16px"
        mt="20px"
        justifyContent="space-between"
        alignItems="center"
        textColor="gray.600"
        textStyle="md"
      >
        <Text>총 상품금액</Text>
        <Text>{formatPrice(totalPrice)}원</Text>
      </Flex>
      <Flex
        mx="16px"
        mt="10px"
        justifyContent="space-between"
        alignItems="center"
        textColor="gray.600"
        textStyle="md"
      >
        <Text>총 배송비</Text>
        <Text>{totalPrice < 30000 ? '3,000원' : '무료'}</Text>
      </Flex>
      <Divider my="20px" mx="16px" />
      <Flex
        my="20px"
        mx="16px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>결제금액</Text>
        <Text color="primary.500">
          {totalPrice < 30000
            ? formatPrice(totalPrice + 3000)
            : formatPrice(totalPrice)}
          원
        </Text>
      </Flex>
      <Center>
        <Button colorScheme="primary">결제하기</Button>
      </Center>
    </>
  );
};

export default ItemExistComponent;
