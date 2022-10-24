import Link from 'next/link';
import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import Cart from '@icons/System/Cart';
import DoubleLine from '@icons/System/DoubleLine';
import Logo from '@icons/System/Logo';

import HomeHeaderDrawer from './_fragments/HomeHeaderDrawer';

const HomeHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        px={{ base: '16px', md: '80px' }}
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        zIndex="sticky"
        transition="all 0.3s"
        w="100%"
        h="80px"
      >
        <DoubleLine
          boxSize="24px"
          onClick={onOpen}
          cursor="pointer"
          aria-label="btn-toggle-drawer"
        />
        <Logo w="262px" h="80px" color="primary.500" />
        <Link href="/cart" passHref>
          <Box>
            <Cart boxSize="24px" cursor="pointer" />
          </Box>
        </Link>
      </Flex>
      <HomeHeaderDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default HomeHeader;
