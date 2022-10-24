import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import Instagram from '@icons/System/Instagram';

const Section7 = () => {
  return (
    <Flex
      w="100%"
      h="300px"
      bg="linear-gradient(90deg, #FF710B 0%, #FFAB2E 100%)"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text textStyle="lg" color="white" fontWeight="700">
        인코스런에 대해 더 궁금하신가요?
      </Text>
      <Text mt="10px" textStyle="md" color="white">
        인스타그램을 방문하시면 더욱 다양한
        <br />
        인코스런의 이야기를 확인하실 수 있어요!
      </Text>
      <Flex mt="12px">
        <Instagram boxSize="24px" color="white" />
        <Text textStyle="md" color="white" fontWeight="700">
          INCOURSE.RUN
        </Text>
      </Flex>
    </Flex>
  );
};

export default Section7;
