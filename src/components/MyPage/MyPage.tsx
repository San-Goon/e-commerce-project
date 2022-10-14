import { useRouter } from 'next/router';
import React from 'react';

import { Box, Center, Flex, Text } from '@chakra-ui/react';

import { useGetMeQuery } from '@apis/user/UserApi.query';

import ArrowRight from '@icons/System/ArrowRight';

import { deleteToken } from '@utils/cookie/token';

import { BookIcon, BoxIcon, InfoIcon } from '../../generated/icons/MyIcons';

const MyPageComponent = () => {
  const { data } = useGetMeQuery();
  console.log('data', data);
  const router = useRouter();
  const onClickLogout = () => {
    deleteToken();
    router.push('/login');
  };
  const onClickWithdraw = () => {
    router.push({ pathname: '/withdraw', query: data.data });
  };
  const onClickModify = () => {
    router.push({ pathname: '/modify', query: data.data });
  };
  const onClickMyReview = () => {
    router.push({ pathname: '/myreview', query: data.data.id });
  };
  const onClickHistory = () => {
    router.push({ pathname: '/history', query: data.data.id });
  };

  return (
    <Box mt="150px">
      <Text mx="16px" textStyle="lg" fontWeight="700">
        {data?.data.nickname}
      </Text>
      <Text mx="16px" mb="30px" textStyle="md" color="gray.400">
        {data?.data.email}
      </Text>
      <Flex h="10px" backgroundColor="gray.100" />
      <Center
        mx="16px"
        h="150px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Center flexDirection="column" cursor="pointer" onClick={onClickModify}>
          <InfoIcon boxSize="50px" color="primary.500" />
          <Text>회원정보 수정</Text>
        </Center>
        <Center
          flexDirection="column"
          cursor="pointer"
          onClick={onClickHistory}
        >
          <BoxIcon boxSize="50px" color="primary.500" />
          <Text>주문 내역</Text>
        </Center>
        <Center
          flexDirection="column"
          cursor="pointer"
          onClick={onClickMyReview}
        >
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
        cursor="pointer"
        onClick={onClickWithdraw}
      >
        <Text>회원탈퇴</Text>
        <ArrowRight boxSize="24px" />
      </Flex>
      <Flex
        mx="16px"
        h="60px"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={onClickLogout}
      >
        <Text>로그아웃</Text>
        <ArrowRight boxSize="24px" />
      </Flex>
      <Flex h="30px" backgroundColor="gray.100" />
    </Box>
  );
};

export default MyPageComponent;
