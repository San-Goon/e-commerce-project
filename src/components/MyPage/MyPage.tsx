import Link from 'next/link';
import React, { useCallback } from 'react';

import { Box, Center, Flex, Text, useDisclosure } from '@chakra-ui/react';

import { useGetMeQuery } from '@apis/user/UserApi.query';

import LogoutModal from '@components/common/LogoutModal';
import ArrowRight from '@icons/System/ArrowRight';

import { BookIcon, BoxIcon, InfoIcon } from '../../generated/icons/MyIcons';

const MyPageComponent = () => {
  const { data } = useGetMeQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickLogout = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Box mt="50px">
      <Text mx="16px" textStyle="lg" fontWeight="700">
        {data?.nickname}
      </Text>
      <Text mx="16px" mb="30px" textStyle="md" color="gray.400">
        {data?.email}
      </Text>
      <Flex h="10px" backgroundColor="gray.100" />
      <Center
        mx="16px"
        h="150px"
        justifyContent="space-between"
        alignItems="center"
      >
        {MENU_ITEMS.map(({ id, href, title, icon }) => {
          return (
            <Link key={id} href={href} passHref>
              <Center flexDirection="column" cursor="pointer">
                {icon}
                <Text>{title}</Text>
              </Center>
            </Link>
          );
        })}
      </Center>
      <Flex h="10px" backgroundColor="gray.100" />
      <Link href="/withdraw" passHref>
        <Flex
          mx="16px"
          h="60px"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
        >
          <Text>회원탈퇴</Text>
          <ArrowRight boxSize="24px" />
        </Flex>
      </Link>
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
      <LogoutModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default MyPageComponent;

const MENU_ITEMS = [
  {
    id: 1,
    href: '/modify',
    title: '회원정보 수정',
    icon: <InfoIcon boxSize="50px" color="primary.500" />,
  },
  {
    id: 2,
    href: '/history',
    title: '주문내역',
    icon: <BoxIcon boxSize="50px" color="primary.500" />,
  },
  {
    id: 3,
    href: '/myreview',
    title: '내 상품 리뷰',
    icon: <BookIcon boxSize="50px" color="primary.500" />,
  },
];
