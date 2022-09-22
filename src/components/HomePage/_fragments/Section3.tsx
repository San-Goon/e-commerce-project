import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import Check from '@icons/System/Check';
import Curve from '@icons/System/Curve';
import Logo from '@icons/System/Logo';

const Section3 = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      mb="68px"
    >
      <Text textStyle="xl" color="primary.500" fontWeight="700" mt="80px">
        부풀려지는 가격 이제 그만!
      </Text>
      <Text textAlign="center" mt="20px" mb="60px" textStyle="lg">
        불합리한{' '}
        <Text as="span" fontWeight="700">
          중간 유통 거품을 제거
        </Text>
        한<br />
        인코스런만의 투명한 유통혁신
      </Text>
      <Flex justifyContent="center" alignItems="center" ml="24px" mb="40px">
        <Image src="/images/home/Group 74.png" />
        <Box ml="26px">
          <Flex>
            <Check boxSize="24px" color="primary.500" />
            <Text textStyle="md" fontWeight="700">
              STEP 1
            </Text>
          </Flex>
          <Text textStyle="md" textAlign="center">
            제조공장의 <br />
            제조 및 개발비용
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mb="40px">
        <Image src="/images/home/Group 77.png" />
        <Flex direction="column" alignItems="center" ml="26px">
          <Text textStyle="md" fontWeight="700">
            STEP 3
          </Text>
          <Text textStyle="md" textAlign="center">
            결제 수수료
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mb="40px">
        <Image src="/images/home/Group 75.png" />
        <Flex direction="column" alignItems="center" ml="26px">
          <Text textStyle="md" fontWeight="700">
            STEP 3
          </Text>
          <Text textStyle="md" textAlign="center">
            결제 수수료
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mb="40px">
        <Image src="/images/home/Group 73.png" />
        <Box ml="26px">
          <Flex>
            <Check boxSize="24px" color="primary.500" />
            <Text textStyle="md" fontWeight="700">
              STEP 4
            </Text>
          </Flex>
          <Text textStyle="md" textAlign="center">
            소비자 가격
          </Text>
        </Box>
      </Flex>
      <Curve w="100%" h="auto" />
      <Text mt="20px" textStyle="md" fontWeight="700" color="primary.500">
        SAVE MONEY
      </Text>
      <Text mt="30px" textStyle="md" fontWeight="700" color="primary.500">
        * 온라인 직접 판매
      </Text>
      <Text textStyle="md" textAlign="center">
        인코스런은 온라인으로만 직접판매하여,
        <br />더 낮은 가격을 만들어냅니다.
      </Text>
      <Text mt="80px" textStyle="xl">
        이렇게 <strong>비교하세요!</strong>
      </Text>
      <Text mt="20px" textStyle="lg" textAlign="center">
        인코스런은 부담스러운
        <br />
        영유아{' '}
        <Text as="span" fontWeight="700" boxShadow="inset 0 -11px 0 #FF710B">
          화장품의 가격거품을 제거해
          <br />
          투명한
        </Text>{' '}
        가격을 만들어 갑니다.
      </Text>
      <Flex mt="80px">
        <Flex direction="column" alignItems="center" justifyContent="flex-end">
          <Box w="150px" h="360px" bg="gray.400">
            <Box
              borderRadius="15px"
              p="6px 15px"
              m="20px 26px"
              textStyle="sm"
              w="95px"
              bg="gray.700"
              color="white"
              textAlign="center"
            >
              2~30,000원
            </Box>
          </Box>
          <Text textStyle="lg" color="gray.700">
            시중 주요브랜드
          </Text>
        </Flex>
        <Flex
          direction="column"
          justifyContent="flex-end"
          ml="23px"
          alignItems="center"
        >
          <Box w="150px" h="120px" bg="#FFF3E0">
            <Box
              borderRadius="15px"
              p="6px 15px"
              m="20px 38px 0px 38px"
              textStyle="sm"
              w="74px"
              bg="primary.500"
              color="white"
              textAlign="center"
            >
              9,900원
            </Box>
            <Logo w="150px" h="auto" color="primary.500" />
          </Box>
          <Text color="primary.400" textStyle="lg" fontWeight="700">
            인코스런
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Section3;
