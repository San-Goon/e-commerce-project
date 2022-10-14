import { useEffect, useMemo, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Center, Divider, Flex, Tag, Text } from '@chakra-ui/react';

import {
  GetProductByIdReturnType,
  ReviewListType,
} from '@apis/product/ProductApi.type';

import SortSelects from '@components/DetailPage/_fragments/SortSelects';
import ImagesComponent from '@components/common/ImagesComponent';
import Pagination from '@components/common/Pagination';

import { formatAvgRate } from '@utils/format';

import { RatingStarIcon } from '../../../generated/icons/MyIcons';

interface PropsType {
  data: GetProductByIdReturnType;
}

const ReviewSection = ({ data }: PropsType) => {
  const [countRate, setCountRate] = useState([0, 0, 0, 0, 0]);
  const [sortedArray, setSortedArray] = useState<ReviewListType[]>([
    ...data.reviewList,
  ]);

  const [sortValue, setSortValue] = useState('최신순');
  const [showValue, setShowValue] = useState('전체보기');

  const [page, setPage] = useState<number>(1);

  const shownPostsNum = 5;

  const offset = useMemo(() => {
    return (page - 1) * shownPostsNum;
  }, [page]);

  const numPages = useMemo(() => {
    if (sortedArray) {
      return Math.ceil(sortedArray.length / shownPostsNum);
    }
    return 0;
  }, [sortedArray, shownPostsNum]);

  useEffect(() => {
    if (data) {
      if (data.reviewList) {
        const tempArr = [0, 0, 0, 0, 0];
        for (const review of data.reviewList) {
          tempArr[review.rate - 1] += 1;
        }
        setCountRate(tempArr);
      }
    }
  }, [data]);

  return (
    <Box m="16px">
      {sortedArray && sortedArray.length ? (
        <>
          <Flex mt="50px" justifyContent="space-between">
            <Text textStyle="md" fontWeight="700">
              리뷰{' '}
              <Text as="span" color="primary.500">
                {data.reviewCount}
              </Text>
              건
            </Text>
            <SortSelects
              data={data}
              sortValue={sortValue}
              showValue={showValue}
              setSortValue={setSortValue}
              setShowValue={setShowValue}
              setSortedArray={setSortedArray}
            />
          </Flex>
          <Flex mt="32px">
            <Flex w="50%" alignItems="center">
              <Tag bg="primary.500" size="md" color="white" borderRadius="15px">
                {formatAvgRate(data.avgRate)}
              </Tag>
              {[1, 2, 3, 4, 5].map((rate) => {
                return (
                  <RatingStarIcon
                    key={rate}
                    mx="3px"
                    boxSize="10px"
                    color={
                      rate <= formatAvgRate(data.avgRate)
                        ? 'primary.500'
                        : 'gray.400'
                    }
                  />
                );
              })}
            </Flex>
            <Box w="50%" borderLeft="1px" borderColor="gray.200">
              <Flex justifyContent="space-around">
                {[5, 4, 3, 2, 1].map((rate) => {
                  const height = (countRate[rate - 1] / data.reviewCount) * 50;
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
          {sortedArray.slice(offset, offset + shownPostsNum).map((item) => {
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
                      {item.nickname}
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
                          color={rate <= item.rate ? 'primary.500' : 'gray.400'}
                        />
                      );
                    })}
                  </Flex>
                </Flex>
                <Text mt="17px">{item.content}</Text>
                <Flex mt="10px">
                  {item.reviewimageSet.map((item, idx: number) => {
                    return <ImagesComponent url={item.url} key={idx} />;
                  })}
                </Flex>
              </Box>
            );
          })}
          <Pagination numPages={numPages} page={page} setPage={setPage} />
        </>
      ) : (
        <Center
          bg="gray.100"
          h="100px"
          textStyle="lg"
          fontWeight="700"
          borderRadius="50px"
        >
          아직 리뷰가 없어요!
        </Center>
      )}
    </Box>
  );
};

export default ReviewSection;
