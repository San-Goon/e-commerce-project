import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import ArrowRight from '@icons/System/ArrowRight';

const Section4 = () => {
  return (
    <Box position="relative">
      <Box position="absolute" left="5%" top="20%">
        <Text textStyle="xl">
          <Text as="span" fontWeight="700" color="primary.500">
            인코스런
          </Text>
          가입하고
        </Text>
        <Text textStyle="xl" fontWeight="700">
          전상품 1000원 혜택
        </Text>
        <Text textStyle="xl">받아보세요</Text>
        <Flex mt="20px" alignItems="center">
          <Text textStyle="md">이벤트 상세보기</Text>
          <ArrowRight />
        </Flex>
      </Box>
      <Image src="/images/home/Layout.png" w="100%" h="auto" />
    </Box>
  );
};

export default Section4;
