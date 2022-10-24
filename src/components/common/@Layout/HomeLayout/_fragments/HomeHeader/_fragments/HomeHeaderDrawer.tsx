import Link from 'next/link';
import { useCallback } from 'react';

import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';

import LogoutModal from '@components/common/LogoutModal';
import Logout from '@icons/System/Logout';

interface PropsType {
  onClose: () => void;
  isOpen: boolean;
}

const HomeHeaderDrawer = ({ onClose, isOpen }: PropsType) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const onClickLogout = useCallback(() => {
    onModalOpen();
  }, [onModalOpen]);

  return (
    <Drawer
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody py="0px" px="0px">
          <Flex
            direction="column"
            mt="40px"
            fontWeight="700"
            justifyContent="space-between"
            h="92%"
          >
            <Box>
              <Text ml="16px" mb="30px" textStyle="lg">
                카테고리
              </Text>
              {MENU_LIST.map(({ id, href, title }) => {
                return (
                  <Link key={id} href={href} passHref>
                    <Flex
                      h="60px"
                      alignItems="center"
                      borderTop="1px"
                      borderBottom="1px"
                      borderColor="gray.200"
                      cursor="pointer"
                      onClick={onClose}
                    >
                      <Text ml="16px" textStyle="md">
                        {title}
                      </Text>
                    </Flex>
                  </Link>
                );
              })}
            </Box>
            <Flex alignItems="center" onClick={onClickLogout} cursor="pointer">
              <Logout boxSize="24px" />
              <Text textStyle="lg" fontWeight="700">
                로그아웃
              </Text>
            </Flex>
          </Flex>
          <LogoutModal isOpen={isModalOpen} onClose={onModalClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default HomeHeaderDrawer;

const MENU_LIST = [
  { id: 1, href: '/', title: '홈' },
  { id: 2, href: '/list', title: '상품보기' },
  { id: 3, href: '/mypage', title: '마이페이지' },
];
