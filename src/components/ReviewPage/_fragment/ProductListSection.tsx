import { useRouter } from 'next/router';
import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { useGetProductByIdQuery } from '@apis/product/ProductApi.query';

import { formatPrice } from '@utils/format';

const ProductListSection = () => {
  const router = useRouter();
  const { data } = useGetProductByIdQuery({
    variables: router.query.productId as string,
    options: {
      enabled: !!router.query.productId,
    },
  });
  return (
    <>
      {data && (
        <Box m="16px" alignItems="center">
          <Flex mb="15px">
            <Box ml="10px">
              <Image src={data.photo} boxSize="60px" />
            </Box>
            <Box ml="10px" textStyle="sm">
              <Text fontWeight="700">{data.name}</Text>
              <Text color="gray.600">{`${data.name} | ${data.capacity}ml`}</Text>
              <Text color="primary.500" fontWeight="700">
                {formatPrice(data.price)}원
              </Text>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default ProductListSection;
