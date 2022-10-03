import React from 'react';

import { Box, Center, Flex, Text } from '@chakra-ui/react';

import ArrowRight from '@icons/System/ArrowRight';

import { BookIcon, BoxIcon, InfoIcon } from '../../generated/icons/MyIcons';

const MyPageComponent = () => {
  return (
    <Box mt="150px">
      <Text mx="16px" textStyle="lg" fontWeight="700">
        인코스런
      </Text>
      <Text mx="16px" mb="30px" textStyle="md" color="gray.400">
        @naver.com
      </Text>
      <Flex h="10px" backgroundColor="gray.100" />
      <Center
        mx="16px"
        h="150px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Center flexDirection="column">
          <InfoIcon boxSize="50px" color="primary.500" />
          <Text>회원정보 수정</Text>
        </Center>
        <Center flexDirection="column">
          <BoxIcon boxSize="50px" color="primary.500" />
          <Text>주문 내역</Text>
        </Center>
        <Center flexDirection="column">
          <BookIcon boxSize="50px" color="primary.500" />
          <Text>내 상품 리뷰</Text>
        </Center>
      </Center>
      <Flex h="10px" backgroundColor="gray.100" />
      <Flex
        mx="16px"
        h="60px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>회원탈퇴</Text>
        <ArrowRight boxSize="24px" />
      </Flex>
      <Flex
        mx="16px"
        h="60px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>로그아웃</Text>
        <ArrowRight boxSize="24px" />
      </Flex>
      <Flex h="30px" backgroundColor="gray.100" />
    </Box>
  );
};

export default MyPageComponent;
