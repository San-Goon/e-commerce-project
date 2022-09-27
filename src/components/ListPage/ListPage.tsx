import { Box, Button, Center, Flex, Image } from '@chakra-ui/react';

import { StarIcon } from '../../generated/icons/MyIcons';

const PRODUCT_LIST = [
  {
    id: 0,
    name: '바스 & 샴푸',
    description: '/images/productImg.png',
    price: 27000,
    capacity: 300,
    tags: '#올인원 #클렌저 #마일드 #바스앤샴푸',
    avgRate: 4.3,
    reviewCount: 125,
    created: '2022-09-25T09:11:43.482Z',
  },
];

const ListPage = () => {
  return (
    <Center mt="120px">
      {PRODUCT_LIST.map((item) => (
        <Box
          key={item.id}
          m="0 16px 30px 16px"
          maxW="sm"
          borderWidth="1px"
          overflow="hidden"
          boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
          borderRadius="20px"
        >
          <Image src={item.description} alt={item.name} />

          <Box p="30px">
            <Box display="flex" alignItems="baseline">
              <Box fontWeight="700" letterSpacing="wide" fontSize="md">
                {item.name}
                <Box as="span" fontWeight="400" color="gray.700" ml="5px">
                  {item.capacity}ml
                </Box>
              </Box>
            </Box>

            <Box mt="10px" fontWeight="700" textStyle="lg" color="primary.500">
              {item.price}
              <Box as="span" color="black">
                원
              </Box>
            </Box>

            <Flex mt="2" alignItems="center" color="gray.700">
              <StarIcon boxSize="16px" color="primary.500" />
              <Box color="black" fontWeight="700" mr="3px">
                {item.avgRate}
              </Box>
              (리뷰 {item.reviewCount}개)
            </Flex>
            <Box mt="25px" color="gray.700" textStyle="md">
              {item.tags}
            </Box>
            <Flex mt="20px" justifyContent="space-around" alignItems="center">
              <Button
                w="150px"
                h="50px"
                borderRadius="25px"
                colorScheme="primary"
              >
                바로구매
              </Button>
              <Button
                w="150px"
                h="50px"
                borderRadius="25px"
                colorScheme="primary"
                variant="outline"
              >
                장바구니
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
    </Center>
  );
};

export default ListPage;
