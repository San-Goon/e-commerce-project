import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

function SignUpDonePage() {
  return (
    <Box
      backgroundImage="/images/hands-clapping.png"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      flexGrow={1}
      m="16px"
      position="relative"
    >
      <Text mt="64px" fontSize="xl" fontWeight="700">
        회원가입이
        <br /> 완료되었습니다
      </Text>
      <Text color="gray.600" fontSize="sm" fontWeight="400">
        관심사별로 자유롭게 소통해보세요!
      </Text>
      <Flex justifyContent="center" alignItems="center">
        <Box
          type="submit"
          as="button"
          height="50px"
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          px="35%"
          borderRadius="100px"
          fontSize="16px"
          fontWeight="700"
          bg="primary.500"
          color="white"
          position="absolute"
          bottom="14"
          _hover={{ bg: '#ebedf0' }}
          _active={{
            bg: '#dddfe2',
            transform: 'scale(0.98)',
            borderColor: '#bec3c9',
          }}
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
          }}
        >
          회원가입완료
        </Box>
      </Flex>
    </Box>
  );
}

export default SignUpDonePage;
