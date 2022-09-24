import { Flex, Text } from '@chakra-ui/react';

const HomeFooter = () => {
  return (
    <Flex pl="16px" h="280px" direction="column" bg="#4A4D55">
      <Text mt="35px" textStyle="md" fontWeight="700" color="white">
        INCOURSE.RUN
      </Text>
      <Text mt="30px" textStyle="sm" color="white">
        Made By 조강훈
      </Text>
      <Text mt="10px" textStyle="sm" color="white">
        이메일 | tigerlove95@naver.com
      </Text>
      <Text mt="40px" textStyle="sm" color="white">
        ⓒINCOURSE.RUN All Right Reserved.
      </Text>
    </Flex>
  );
};
export default HomeFooter;
