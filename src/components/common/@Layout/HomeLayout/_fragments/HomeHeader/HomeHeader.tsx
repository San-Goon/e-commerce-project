import { useRouter } from 'next/router';
import React from 'react';

import { Flex } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import Cart from '@icons/System/Cart';
import DoubleLine from '@icons/System/DoubleLine';
import Logo from '@icons/System/Logo';

import { LAYOUT } from '@constants/layout';

import { HOME_HEADER_VARIANTS, HomeHeaderVariantType } from './HomeHeader.data';
import HomeHeaderDrawer from './_fragments/HomeHeaderDrawer';

interface HomeHeaderProps {
  variant?: HomeHeaderVariantType;
}

const HomeHeader = ({ variant = 'light' }: HomeHeaderProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cssByVariant = HOME_HEADER_VARIANTS[variant];

  const onClickCart = () => {
    router.push('/cart');
  };

  return (
    <>
      <Flex //
        as="header"
        px={{ base: '16px', md: '80px' }}
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        zIndex="sticky"
        transition="all 0.3s"
        w="100%"
        h={LAYOUT.HEADER.HEIGHT}
        {...cssByVariant.header}
        background="transparent"
      >
        <DoubleLine
          boxSize="24px"
          onClick={onOpen}
          cursor="pointer"
          bg="transparent"
          aria-label="btn-toggle-drawer"
        />
        <Logo w="262px" h="80px" color="primary.500" />
        <Cart boxSize="24px" onClick={onClickCart} cursor="pointer" />
      </Flex>
      <HomeHeaderDrawer
        isOpen={isOpen}
        onClose={onClose}
        bodyProps={cssByVariant.drawer}
      />
    </>
  );
};

export default HomeHeader;
