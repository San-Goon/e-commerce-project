import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Text } from '@chakra-ui/react';

import { useGetOrderStatusQuery } from '@apis/order/OrderApi.query';
import { PostOrderStatusReturnType } from '@apis/order/OrderApi.type';
import { useGetMeQuery } from '@apis/user/UserApi.query';
import { queryKeySliceActions } from '@features/queryKey/queryKeySlice';

import HistoryList from '@components/HistoryPage/_fragments/HistoryList';
import Pagination from '@components/common/Pagination';

import { formatDateDash } from '@utils/format';

const HistoryPage = () => {
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
        const date = formatDateDash(product.created);
        if (Array.isArray(temp[date])) {
          temp[date].push(product);
        } else {
          temp[date] = [product];
        }
      });
    }
    return temp;
  }, [products]);

  return (
    <Box mb="30px">
      <Text textStyle="lg" fontWeight="700">
        주문내역
      </Text>
      <Box mt="80px">
        {productList &&
          Object.keys(productList).map((date) => {
            return (
              <React.Fragment key={date}>
                <Text textStyle="sm" fontWeight="700">
                  [{date}]
                </Text>
                {productList[date].map((product) => {
                  return <HistoryList key={product.id} product={product} />;
                })}
              </React.Fragment>
            );
          })}
      </Box>
      {numPages && (
        <Pagination numPages={numPages} page={page} setPage={setPage} />
      )}
    </Box>
  );
};

export default HistoryPage;
