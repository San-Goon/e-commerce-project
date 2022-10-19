import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { Button, Center, Flex, Image, Spacer, Text } from '@chakra-ui/react';

function SignUpDonePage() {
  const router = useRouter();
  const onClickButton = useCallback(() => {
    router.push('/');
  }, [router]);
  return (
    <Flex as="main" h="100vh" px="1rem" flexDirection="column">
      <Text fontWeight="700" textStyle="xl" pt="80px">
        회원가입이
        <br />
        완료되었습니다.
      </Text>
      <Text mt="5px" textStyle="sm" color="gray.600">
        관심사별로 자유롭게 소통해보세요!
      </Text>
      <Spacer />
      <Center position="absolute" top="35vh" left="0" right="0">
        <Image src="/images/hands-clapping.png" />
      </Center>
      <Spacer />
      <Center>
        <Button colorScheme="primary" mb="1.875rem" onClick={onClickButton}>
          <Flex
            as="span"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
          >
            시작하기
          </Flex>
        </Button>
      </Center>
    </Flex>
  );
}

export default SignUpDonePage;
