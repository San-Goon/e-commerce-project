import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Box, Button, Center, Flex, Image } from '@chakra-ui/react';

import { useGetProductListQuery } from '@apis/product/ProductApi.query';

import { formatPrice } from '@utils/format';
import { getToken } from '@utils/localStorage/token';
import { IProductMap, IProductsList, ITags } from '@utils/types';

import { StarIcon } from '../../generated/icons/MyIcons';

interface IProps {
  productsList: IProductsList;
}

const ListPage = ({ productsList }: IProps) => {
  const router = useRouter();
  const { data } = useGetProductListQuery({
    options: { initialData: productsList },
  });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert('로그인 후 이용해주세요.');
      router.push('/login');
    }
  }, []);

  return (
    <Center mt="120px" flexDirection="column">
      {data.results.map((item: IProductMap) => (
        <Box
          key={item.id}
          m="0 16px 30px 16px"
          maxW="sm"
          borderWidth="1px"
          overflow="hidden"
          boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
          borderRadius="20px"
        >
          <Image src={item.thumbnail} alt={item.name} />
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
              {formatPrice(item.price)}
              <Box as="span" color="black">
                원
              </Box>
            </Box>

            <Flex mt="2" alignItems="center" color="gray.700">
              <StarIcon boxSize="16px" color="primary.500" />
              <Box color="black" fontWeight="700" mr="3px">
                {item.avgRate ? item.avgRate.toFixed(1) : 0}
              </Box>
              (리뷰 {item.reviewCount}개)
            </Flex>
            <Flex>
              {item.tags.map((item: ITags) => {
                return (
                  <Box key={item.id} mt="25px" color="gray.700" textStyle="md">
                    #{item.name}&ensp;
                  </Box>
                );
              })}
            </Flex>
            <Flex mt="20px" justifyContent="space-around" alignItems="center">
              <Button
                w="150px"
                h="50px"
                borderRadius="25px"
                colorScheme="primary"
                onClick={() => {
                  router.push(`/detail/${item.id}`);
                }}
              >
                보러가기
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
    </Center>
  );
};

export default ListPage;
