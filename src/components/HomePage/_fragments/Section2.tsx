import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import PlusIcon from '@icons/System/Plus';

const Section2 = () => {
  return (
    <Flex w="100%" direction="column" bg="#FFFCEF" position="relative">
      <Box>
        <Image
          src="/images/home/패키징.png"
          position="absolute"
          top="20px"
          left="10%"
        />
        <Image
          src="/images/home/유통구조.png"
          position="absolute"
          top="160px"
          left="60%"
        />
        <Image src="/images/home/광고.png" position="absolute" top="307px" />
      </Box>
      <PlusIcon
        boxSize="50px"
        top="545px"
        left="calc(50% - 50px)"
        position="absolute"
        color="primary.500"
      />
      <Text textStyle="xl" fontWeight="700" mt="481px" ml="50%">
        불합리한 유통구조
        <br />
        과도한 패키징
        <br />
        과장된 광고
      </Text>
      <Text textStyle="lg" mt="40px" ml="40%">
        부풀려지는 가격은 이제 그만!
        <br />
        <Text as="span" color="primary.500" fontWeight="700">
          인코스런
        </Text>
        은 가격거품을 제거한
        <br />
        착한소비를 위해 태어났습니다.
      </Text>
      <Box>
        <Image src="/images/home/Group 341.png" w="100%" h="auto" />
      </Box>
    </Flex>
  );
};

export default Section2;
