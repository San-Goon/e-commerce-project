import { useRouter } from 'next/router';

import {
  Box,
  ChakraProps,
  DrawerFooter,
  DrawerProps,
  Flex,
  Text,
} from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';

import Logout from '@icons/System/Logout';

import { deleteToken } from '@utils/cookie/token';

interface HomeHeaderDrawerProps extends Omit<DrawerProps, 'children'> {
  bodyProps?: ChakraProps;
}

const HomeHeaderDrawer = ({
  bodyProps,
  ...basisProps
}: HomeHeaderDrawerProps) => {
  const router = useRouter();
  const onClickLogout = () => {
    deleteToken();
    router.push('/login');
    basisProps.onClose();
  };
  const onClickHome = () => {
    router.push('/');
    basisProps.onClose();
  };

  const onClickList = () => {
    router.push('/list');
    basisProps.onClose();
  };

  const onClickMyPage = () => {
    router.push('/mypage');
    basisProps.onClose();
  };

  return (
    <Drawer placement="left" {...basisProps} blockScrollOnMount={false}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton //
          w="40px"
          h="40px"
          top="20px"
          right={{ base: '16px', md: '80px' }}
          onClick={basisProps.onClose}
        />
        <DrawerBody //
          {...bodyProps}
          py="0px"
          px="0px"
        >
          <Box mt="80px" fontWeight="700" w="100%">
            <Text ml="16px" textStyle="lg">
              카테고리
            </Text>
            <Flex
              mt="30px"
              h="60px"
              alignItems="center"
              borderTop="1px"
              borderBottom="1px"
              borderColor="gray.200"
            >
              <Text
                ml="16px"
                textStyle="md"
                onClick={onClickHome}
                cursor="pointer"
              >
                홈
              </Text>
            </Flex>
            <Flex
              h="60px"
              alignItems="center"
              borderBottom="1px"
              borderColor="gray.200"
            >
              <Text
                ml="16px"
                textStyle="md"
                onClick={onClickList}
                cursor="pointer"
              >
                상품보기
              </Text>
            </Flex>
            <Flex
              h="60px"
              alignItems="center"
              borderBottom="1px"
              borderColor="gray.200"
              onClick={onClickMyPage}
              cursor="pointer"
            >
              <Text ml="16px" textStyle="md">
                마이페이지
              </Text>
            </Flex>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Flex alignItems="center" onClick={onClickLogout} cursor="pointer">
            <Logout boxSize="24px" />
            <Text textStyle="lg" fontWeight="700">
              로그아웃
            </Text>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default HomeHeaderDrawer;
