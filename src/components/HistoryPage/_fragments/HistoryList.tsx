import React, { useMemo } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { PostOrderStatusReturnType } from '@apis/order/OrderApi.type';
import { useGetProductByIdQuery } from '@apis/product/ProductApi.query';

import HistoryButtons from '@components/HistoryPage/_fragments/HistoryButtons';

import { formatPrice } from '@utils/format';

interface PropsType {
  product: PostOrderStatusReturnType;
}

const HistoryList = ({ product }: PropsType) => {
  const { data } = useGetProductByIdQuery({
    variables: product.productId.toString(),
  });

  const shippingStatus = useMemo(() => {
    switch (product.shippingStatus) {
      case 'INPROGRESS':
        return '배송중';
      case 'WAIT':
        return '상품준비';
      case 'CANCELED':
        return '주문취소';
      case 'DONE':
        return '배송완료';
      case 'PAID':
        return '결제완료';
    }
  }, [product]);

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
                {shippingStatus}
              </Text>
              <HistoryButtons
                shippingStatus={shippingStatus}
                productId={product.productId}
                orderId={product.id}
              />
            </Flex>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default HistoryList;
