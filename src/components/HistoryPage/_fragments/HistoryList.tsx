import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import { PostOrderStatusReturnType } from '@apis/order/OrderApi.type';
import { useGetProductByIdQuery } from '@apis/product/ProductApi.query';

import { formatPrice } from '@utils/format';

interface PropsType {
  product: PostOrderStatusReturnType;
  shippingStatus?: string;
}

const HistoryList = ({ product, shippingStatus }: PropsType) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    switch (shippingStatus) {
      case 'INPROGRESS':
        setStatus('배송중');
        break;
      case 'WAIT':
        setStatus('상품준비');
        break;
      case 'CANCELED':
        setStatus('주문취소');
        break;
      case 'DONE':
        setStatus('배송완료');
        break;
      case 'PAID':
        setStatus('결제완료');
        break;
    }
  }, [shippingStatus]);

  const { data } = useGetProductByIdQuery({
    variables: product.productId.toString(),
  });

  return (
    <Box m="16px">
      {data && (
        <>
          <Flex mb="15px" alignItems="center">
            <Box ml="10px">
              <Image src={data.photo} boxSize="60px" />
            </Box>
            <Box ml="10px" textStyle="sm">
              <Text fontWeight="700">{data.name}</Text>
              <Text color="gray.600">{`${data.name} | ${data.capacity}ml`}</Text>
              <Text color="primary.500" fontWeight="700">
                {formatPrice(product.count * data.price)}원 / {product.count}개
              </Text>
            </Box>
            <Flex direction="column" alignItems="center" ml="auto">
              <Text textStyle="sm" color="primary.500" fontWeight="700">
                {status}
              </Text>
              {shippingStatus === 'DONE' ? (
                <Button
                  w="70px"
                  h="20px"
                  colorScheme="primary"
                  borderRadius="5px"
                  variant="outline"
                  fontSize="12px"
                  fontWeight="700"
                >
                  <Link
                    href={{
                      pathname: '/review',
                      query: {
                        productId: product.productId,
                        orderId: product.id,
                      },
                    }}
                  >
                    리뷰작성
                  </Link>
                </Button>
              ) : null}
            </Flex>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default HistoryList;
