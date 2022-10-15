import { useRouter } from 'next/router';
import React from 'react';

import { Button, Center, Flex, Image, Text } from '@chakra-ui/react';

const Section5 = () => {
  const router = useRouter();
  return (
    <Center w="100%" h="1354px" bg="#FFFCEF">
      <Flex
        direction="column"
        p="20px 16px"
        w="calc(100% - 32px)"
        h="1314px"
        bg="white"
        alignItems="center"
      >
        <Text textStyle="xl" fontWeight="700">
          소중한 우리 아이를 위해
        </Text>
        <Text mt="20px" textStyle="md">
          순수 자연유래 / 자연유래 유화제 / 자연유래
          <br />
          계면활성제 99.9% 타가는 EWG 그린등급
          <br />
          성문 100% 만을 사용한 건강한 화장품입니다.
        </Text>
        <Button
          w="190px"
          h="50px"
          borderRadius="25px"
          colorScheme="primary"
          mt="30px"
          textStyle="md"
          fontWeight="700"
          onClick={() => {
            router.push('/list');
          }}
        >
          상품전체보기
        </Button>
        <Image mt="80px" src="/images/home/Group 243.png" />
        <Text textStyle="md" fontWeight="700">
          바스 & 샴푸
        </Text>
        <Image mt="80px" src="/images/home/Group 243.png" />
        <Text textStyle="md" fontWeight="700">
          오일
        </Text>
        <Image mt="80px" src="/images/home/Group 243.png" />
        <Text textStyle="md" fontWeight="700">
          파우더 로션
        </Text>
      </Flex>
    </Center>
  );
};

export default Section5;
