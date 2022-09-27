import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';

const Section1 = () => {
  return (
    <Box position="relative">
      <Image src="/images/home/Group 298.png" w="100%" h="auto" />
      <Text
        position="absolute"
        textStyle="xl"
        fontWeight="700"
        top="20%"
        left="16px"
      >
        지속 가능한
        <br />
        클린&비건뷰티, 인코스런
      </Text>
      <Text position="absolute" textStyle="lg" top="30%" left="16px">
        자연과 사람에게
        <br />
        책임질 수 있는 지속가능한
        <br />
        제품을 만듭니다.
      </Text>
    </Box>
  );
};

export default Section1;
