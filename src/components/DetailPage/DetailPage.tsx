import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ChakraStylesConfig, Select } from 'chakra-react-select';
import dayjs from 'dayjs';

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Tag,
  Text,
} from '@chakra-ui/react';

import { useGetProductByIdQuery } from '@apis/product/ProductApi.query';

import ArrowDown from '@icons/System/ArrowDown';

import { RatingStarIcon } from '../../generated/icons/MyIcons';

const chakraSelectStyle: ChakraStylesConfig = {
  dropdownIndicator: (provided) => ({
    ...provided,
    p: 0,
    bg: 'gray.200',
  }),
  container: (provided) => ({
    ...provided,
    w: '86px',
    bg: 'gray.200',
    borderRadius: '5px',
    cursor: 'pointer',
  }),
  control: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontWeight: '700',
    m: 0,
    borderRadius: '5px',
  }),
  menu: (provided) => ({
    ...provided,
    my: 0,
    bg: 'gray.200',
    borderRadius: '5px',
  }),
  menuList: (provided) => ({
    ...provided,
    bg: 'gray.200',
    border: '0px',
  }),
  option: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontWeight: '700',
  }),
};

const DetailPage = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const { data } = useGetProductByIdQuery({ variables: id });
  const [countRate, setCountRate] = useState([0, 0, 0, 0, 0]);
  const [sortedArray, setSortedArray] = useState<any>([]);

  const [sortValue, setSortValue] = useState('최신순');
  const [showValue, setShowValue] = useState('전체보기');

  useEffect(() => {
    if (data) {
      const tempArr = [0, 0, 0, 0, 0];
      for (const review of data.reviewList) {
        tempArr[review.rate - 1] += 1;
      }
      setCountRate(tempArr);
      setSortedArray(data.reviewList);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const tempArr = [...data.reviewList];
      if (tempArr) {
        if (sortValue === '최신순') {
          tempArr.sort(
            (a, b) => Number(new Date(b.created)) - Number(new Date(a.created)),
          );
        } else if (sortValue === '평점 높은순') {
          tempArr.sort((a, b) => b.rate - a.rate);
        } else if (sortValue === '평점 낮은순') {
          tempArr.sort((a, b) => a.rate - b.rate);
        }
        setSortedArray(tempArr);
      }
    }
  }, [sortValue, data]);

  if (data) {
    return (
      <Box mt="116px" mb="80px">
        <Center>
          <Image src="/images/home/Group 243.png" alt="Image" />
        </Center>
        <Box
          p="16px"
          boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
          borderRadius="20px 20px 0px 0px"
        >
          <Text textStyle="lg" fontWeight="700">
            {data.name}{' '}
            <Text as="span" fontWeight="400" color="gray.600">
              {data.capacity}ml
            </Text>
          </Text>
          <Text mt="14px" textStyle="lg">
            <Text as="span" color="primary.500" fontWeight="700">
              {data.price}
            </Text>
            원
          </Text>
          <Text textStyle="sm">
            3만원 이상 구매시{' '}
            <Text as="span" color="primary.500">
              무료배송
            </Text>
          </Text>
          <Text mt="10px">{data.description}</Text>
          <Flex alignItems="center" mt="10px">
            <RatingStarIcon boxSize="16px" color="primary.500" />
            <Text textStyle="md" fontWeight="700">
              {data.avgRate}
            </Text>
            <Text ml="5px" textStyle="md" textColor="gray.600">
              ({data.reviewCount}개 리뷰)
            </Text>
          </Flex>
          <Center mt="20px" flexDirection="column">
            <Button colorScheme="primary" variant="outline">
              장바구니
            </Button>
            <Button colorScheme="primary" mt="10px">
              바로구매
            </Button>
          </Center>
        </Box>
        <Flex justifyContent="space-around" my="26px">
          <Text textStyle="md" color="gray.600">
            상세정보
          </Text>
          <Text textStyle="md" color="gray.600">
            구매정보
          </Text>
          <Text textStyle="md" color="gray.600">
            리뷰 ({data.reviewCount})
          </Text>
        </Flex>
        <Box>
          <Flex justifyContent="center">
            <Image
              src={`/images/detail/${data.name}.png`}
              alt={`${data.name} 상세이미지`}
            />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            h="60px"
            bg="gray.100"
            px="16px"
          >
            <Text textStyle="md" fontWeight="700">
              주문 및 배송 안내
            </Text>
            <ArrowDown />
          </Flex>
          <Box m="16px">
            <Flex mt="50px" justifyContent="space-between">
              <Text textStyle="md" fontWeight="700">
                리뷰{' '}
                <Text as="span" color="primary.500">
                  {data.reviewCount}
                </Text>
                건
              </Text>
              <Flex>
                <Box>
                  <Select
                    size="sm"
                    focusBorderColor="gray.200"
                    isSearchable={false}
                    onChange={(e: any) => setSortValue(e.value)}
                    options={[
                      { value: '최신순', label: '최신순' },
                      { value: '평점 높은순', label: '평점 높은순' },
                      { value: '평점 낮은순', label: '평점 낮은순' },
                    ]}
                    defaultValue={{ value: '최신순', label: '최신순' }}
                    chakraStyles={chakraSelectStyle}
                  />
                </Box>
                <Box ml="10px">
                  <Select
                    size="sm"
                    isSearchable={false}
                    focusBorderColor="gray.200"
                    onChange={(e: any) => setShowValue(e.value)}
                    options={[
                      { value: '전체보기', label: '전체보기' },
                      { value: '포토리뷰', label: '포토리뷰' },
                    ]}
                    defaultValue={{ value: '전체보기', label: '전체보기' }}
                    chakraStyles={chakraSelectStyle}
                  />
                </Box>
              </Flex>
            </Flex>
            <Flex mt="32px">
              <Flex w="50%" alignItems="center">
                <Tag
                  bg="primary.500"
                  size="md"
                  color="white"
                  borderRadius="15px"
                >
                  {data.avgRate}
                </Tag>
                {[1, 2, 3, 4, 5].map((rate) => {
                  return (
                    <RatingStarIcon
                      key={rate}
                      mx="3px"
                      boxSize="10px"
                      color={rate <= data.avgRate ? 'primary.500' : 'gray.400'}
                    />
                  );
                })}
              </Flex>
              <Box w="50%" borderLeft="1px" borderColor="gray.200">
                <Flex justifyContent="space-around">
                  {[5, 4, 3, 2, 1].map((rate) => {
                    const height =
                      (countRate[rate - 1] / data.reviewCount) * 50;
                    return (
                      <Box
                        key={rate}
                        bg="secondary.500"
                        w="10px"
                        h="50px"
                        borderRadius="5px 5px 0 0"
                        position="relative"
                      >
                        <Box
                          bg="primary.500"
                          w="10px"
                          h={`${height}px`}
                          borderRadius="5px 5px 0 0"
                          position="absolute"
                          bottom="0"
                        />
                      </Box>
                    );
                  })}
                </Flex>
                <Divider />
                <Flex
                  mt="4px"
                  justifyContent="space-around"
                  textStyle="sm"
                  color="gray.600"
                >
                  <Text>5점</Text>
                  <Text>4점</Text>
                  <Text>3점</Text>
                  <Text>2점</Text>
                  <Text>1점</Text>
                </Flex>
              </Box>
            </Flex>
            {sortedArray.map((item: any) => {
              return (
                <Box
                  key={item.id}
                  py="25px"
                  borderBottom="1px"
                  borderColor="gray.200"
                >
                  <Flex justifyContent="space-between">
                    <Box>
                      <Text textStyle="sm" fontWeight="700">
                        {item.user}
                      </Text>
                      <Text mt="2px" textStyle="sm" color="gray.600">
                        {dayjs(item.created).format('YYYY-MM-DD')}
                      </Text>
                    </Box>
                    <Flex>
                      {[1, 2, 3, 4, 5].map((rate) => {
                        return (
                          <RatingStarIcon
                            key={rate}
                            mx="3px"
                            boxSize="10px"
                            color={
                              rate <= item.rate ? 'primary.500' : 'gray.400'
                            }
                          />
                        );
                      })}
                    </Flex>
                  </Flex>
                  <Text mt="17px">{item.content}</Text>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <div>로딩중...</div>;
  }
};

export default DetailPage;
