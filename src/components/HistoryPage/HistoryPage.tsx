import React, { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Box, Center, CircularProgress, Text } from '@chakra-ui/react';

import { useGetOrderStatusQuery } from '@apis/order/OrderApi.query';
import { PostOrderStatusReturnType } from '@apis/order/OrderApi.type';
import productApi from '@apis/product/ProductApi';
import { useGetMeQuery } from '@apis/user/UserApi.query';
import { queryKeySliceActions } from '@features/queryKey/queryKeySlice';

import OrderListSection from '@components/HistoryPage/_fragments/OrderListSection';
import useModifyShippingInfoForm, {
  defaultValues,
} from '@components/HistoryPage/_hooks/useModifyShippingInfoForm';
import Pagination from '@components/common/Pagination';

import { useQueries } from '@tanstack/react-query';

const HistoryPage = () => {
  const formData = useModifyShippingInfoForm({ defaultValues });
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { data } = useGetMeQuery();
  const {
    data: products,
    queryKey,
    isSuccess,
  } = useGetOrderStatusQuery({
    variables: { userId: data?.id as number, page },
    options: {
      enabled: !!data?.id,
      onSuccess: () => {
        dispatch(
          queryKeySliceActions.setOrderQueryKey(queryKey as [string, number]),
        );
      },
    },
  });

  const numPages = useMemo(() => {
    return Math.ceil((products?.count as number) / 5);
  }, [products]);

  const productList = useMemo(() => {
    const temp: { [key: string]: PostOrderStatusReturnType[] } = {};
    if (products) {
      products?.results.forEach((product) => {
        const orderId = product.orderId;
        if (Array.isArray(temp[orderId])) {
          temp[orderId].push(product);
        } else {
          temp[orderId] = [product];
        }
      });
      return temp;
    }
    return undefined;
  }, [products]);

  const queries = useMemo(() => {
    if (products) {
      return products?.results?.map((result) => ({
        queryKey: ['product-by-id', result.productId],
        queryFn: () => productApi.getProductById(result.productId),
        enabled: !!products,
        staleTime: Infinity,
      }));
    }
    return [];
  }, [products]);

  const productData = useQueries({
    queries,
  });

  const isRender = useMemo(() => {
    if (productData.length !== 0) {
      if (productData.every((data) => data.status === 'success')) return true;
    }
    return false;
  }, [productData]);

  return (
    <FormProvider {...formData}>
      {isSuccess ? (
        <>
          <Box mb="30px">
            <Text textStyle="lg" fontWeight="700">
              주문내역
            </Text>
            {isRender ? (
              <Box mt="80px">
                {productList &&
                  Object.keys(productList).map((orderId) => {
                    return (
                      <React.Fragment key={orderId}>
                        <OrderListSection
                          productList={productList}
                          orderId={orderId}
                        />
                      </React.Fragment>
                    );
                  })}
              </Box>
            ) : (
              <Center flexDir="column" h="107px">
                <CircularProgress isIndeterminate color="primary.500" />
                <Text mt="5px">주문내역을 불러오고 있습니다...</Text>
              </Center>
            )}
            {numPages && (
              <Pagination numPages={numPages} page={page} setPage={setPage} />
            )}
          </Box>
        </>
      ) : null}
    </FormProvider>
  );
};

export default HistoryPage;
