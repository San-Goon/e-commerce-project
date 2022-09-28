import React from 'react';

import { Box, Button, Center, Divider, Flex, Text } from '@chakra-ui/react';

import CheckBox from '@components/common/CheckBox';

const ItemExistComponent = () => {
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
      <Text>여기에 데이터 넣어주세요.</Text>
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
        <Text>얼마</Text>
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
        <Text>얼마</Text>
      </Flex>
      <Divider my="20px" mx="16px" />
      <Flex
        my="20px"
        mx="16px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>결제금액</Text>
        <Text color="primary.500">얼마</Text>
      </Flex>
      <Center>
        <Button colorScheme="primary">결제하기</Button>
      </Center>
    </>
  );
};

export default ItemExistComponent;
