import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useGetProductByIdQuery } from '@apis/product/ProductApi.query';

import DetailDrawer from '@components/DetailPage/_fragments/DetailDrawer';
import DetailImageSection from '@components/DetailPage/_fragments/DetailImageSection';
import ReviewSection from '@components/DetailPage/_fragments/ReviewSection';
import ShippingInfoSection from '@components/DetailPage/_fragments/ShippingInfoSection';

import { formatAvgRate, formatPrice } from '@utils/format';

import { RatingStarIcon } from '../../generated/icons/MyIcons';
import useMoveScroll from '../../hooks/useMoveScroll';

const DetailPage = () => {
  const router = useRouter();
  const { data } = useGetProductByIdQuery({
    variables: Number(router.query.id as string),
  });

  const { element: detail, onMoveToElement: onMoveToDetail } = useMoveScroll();
  const { element: info, onMoveToElement: onMoveToInfo } = useMoveScroll();
  const { element: review, onMoveToElement: onMoveToReview } = useMoveScroll();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mt="116px" mb="80px">
      {data && (
        <>
          <Center>
            <Image src={data.photo} alt={data.name} />
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
                {formatPrice(data.price)}
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
                {formatAvgRate(data.avgRate)}
              </Text>
              <Text ml="5px" textStyle="md" textColor="gray.600">
                ({data.reviewCount}개 리뷰)
              </Text>
            </Flex>
            <Center mt="20px" flexDirection="column">
              <Button colorScheme="primary" mt="10px" onClick={onOpen}>
                상품담기
              </Button>
            </Center>
          </Box>
          <Flex justifyContent="space-around" my="26px">
            <Box onClick={onMoveToDetail} cursor="pointer">
              <Text textStyle="md" color="primary.500" fontWeight="700">
                상세정보
              </Text>
            </Box>
            <Box onClick={onMoveToInfo} cursor="pointer">
              <Text textStyle="md" color="gray.600">
                구매정보
              </Text>
            </Box>
            <Box onClick={onMoveToReview} cursor="pointer">
              <Text textStyle="md" color="gray.600">
                리뷰 ({data.reviewCount})
              </Text>
            </Box>
          </Flex>
          <Box ref={detail}>
            <DetailImageSection detail={data.detail} />
          </Box>
          <Box ref={info}>
            <ShippingInfoSection />
          </Box>
          <Box ref={review}>
            <ReviewSection data={data} />
          </Box>
          <DetailDrawer
            router={router}
            data={data}
            onClose={onClose}
            isOpen={isOpen}
          />
        </>
      )}
    </Box>
  );
};

export default DetailPage;
