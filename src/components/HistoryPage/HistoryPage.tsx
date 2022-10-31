import React, { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Box, Text } from '@chakra-ui/react';

import { useGetOrderStatusQuery } from '@apis/order/OrderApi.query';
import { PostOrderStatusReturnType } from '@apis/order/OrderApi.type';
import { useGetMeQuery } from '@apis/user/UserApi.query';
import { queryKeySliceActions } from '@features/queryKey/queryKeySlice';

import OrderListSection from '@components/HistoryPage/_fragments/OrderListSection';
import useModifyShippingInfoForm, {
  defaultValues,
} from '@components/HistoryPage/_hooks/useModifyShippingInfoForm';
import Pagination from '@components/common/Pagination';

const HistoryPage = () => {
  const formData = useModifyShippingInfoForm({ defaultValues });
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { data } = useGetMeQuery();
  const { data: products, queryKey } = useGetOrderStatusQuery({
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
    }
    return temp;
  }, [products]);

  return (
    <FormProvider {...formData}>
      <Box mb="30px">
        <Text textStyle="lg" fontWeight="700">
          주문내역
        </Text>
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
        {numPages && (
          <Pagination numPages={numPages} page={page} setPage={setPage} />
        )}
      </Box>
    </FormProvider>
  );
};

export default HistoryPage;
