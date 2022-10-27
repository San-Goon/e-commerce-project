import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Image,
} from '@chakra-ui/react';

import { useGetProductListQuery } from '@apis/product/ProductApi.query';

import { formatAvgRate, formatPrice } from '@utils/format';
import { ITags } from '@utils/types';

import { StarIcon } from '../../generated/icons/MyIcons';

const ListPage = () => {
  const router = useRouter();
  const [ref, isView] = useInView();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetProductListQuery({
      options: {
        getNextPageParam: (lastPage) => {
          return lastPage.cursor ? lastPage.cursor : undefined;
        },
      },
    });

  const productList = useMemo(() => {
    return data?.pages
      .map((page) => page.results)
      .reduce(function (acc, cur) {
        return acc.concat(cur);
      });
  }, [data]);

  useEffect(() => {
    if (isView && hasNextPage) {
      fetchNextPage();
    }
  }, [isView, hasNextPage, fetchNextPage]);

  return (
    <Center mt="120px" flexDirection="column" position="relative">
      {productList &&
        productList.map((item) => (
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

              <Box
                mt="10px"
                fontWeight="700"
                textStyle="lg"
                color="primary.500"
              >
                {formatPrice(item.price)}
                <Box as="span" color="black">
                  원
                </Box>
              </Box>

              <Flex mt="2" alignItems="center" color="gray.700">
                <StarIcon boxSize="16px" color="primary.500" />
                <Box color="black" fontWeight="700" mr="3px">
                  {formatAvgRate(item.avgRate)}
                </Box>
                (리뷰 {item.reviewCount}개)
              </Flex>
              <Flex>
                {item.tag.map((item: ITags) => {
                  return (
                    <Box
                      key={item.id}
                      mt="25px"
                      color="gray.700"
                      textStyle="md"
                    >
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
      <Box position="absolute" bottom="0px" ref={ref} />
      {isFetchingNextPage && (
        <CircularProgress mb="50px" isIndeterminate color="primary.500" />
      )}
    </Center>
  );
};

export default ListPage;
