import React, { useMemo } from 'react';

import * as _ from 'lodash';

import { Box, Divider, Flex } from '@chakra-ui/react';

import { OrderByIdReturnType } from '@apis/order/OrderApi.type';
import { useGetProductsByIdQueries } from '@apis/product/ProductApi.query';
import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';

import ProductsList from '@components/SuccessPage/_fragments/ProductsList';

import { UseQueryResult } from '@tanstack/react-query';
import { formatDateDash } from '@utils/format';
import { ShipInfoType } from '@utils/localStorage/shipInfo';

interface PropsType {
  shipInfo: ShipInfoType;
  data?: OrderByIdReturnType;
}

const SuccessPageView = ({ data, shipInfo }: PropsType) => {
  const products = Object.values(
    useGetProductsByIdQueries(
      shipInfo.productInfos.map((product) => product.productId),
    ),
  );

  const productsList = useMemo(() => {
    const tempArr = [];
    for (let i = 0; i < products.length; i++) {
      const mergedObj = _.merge(
        (products[i] as UseQueryResult<GetProductByIdReturnType>).data,
        { count: shipInfo.productInfos[i].count },
      );
      tempArr.push(mergedObj);
    }
    return tempArr;
  }, [products, shipInfo.productInfos]);

  return (
    <Box>
      <Flex
        h="55px"
        alignItems="center"
        borderTop="1px"
        borderBottom="1px"
        borderColor="gray.100"
        textStyle="sm"
        fontWeight="700"
      >
        [{formatDateDash(data?.created)}]
      </Flex>
      {productsList &&
        productsList.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <ProductsList item={item} />
              <Divider />
            </React.Fragment>
          );
        })}
      <Box w="100vw" h="10px" backgroundColor="gray.100" />
    </Box>
  );
};

export default SuccessPageView;
