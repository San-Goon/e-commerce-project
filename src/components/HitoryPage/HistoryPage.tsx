import { useEffect, useMemo, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Text } from '@chakra-ui/react';

import { useGetOrderStatusQuery } from '@apis/order/OrderApi.query';
import { PostOrderStatusReturnType } from '@apis/order/OrderApi.type';
import { useGetMeQuery } from '@apis/user/UserApi.query';

import { formatDateDash } from '@utils/format';

const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetMeQuery();
  const { data: products } = useGetOrderStatusQuery({
    variables: data?.id.toString(),
    options: {
      enabled: !!data?.id,
    },
  });

  const totalPage = useMemo(() => {
    return Math.ceil((products?.pages[0].count as number) / 5);
  }, [products]);

  const productList = useMemo(() => {
    const temp: { [key: string]: PostOrderStatusReturnType[] } = {};
    if (products) {
      products?.pages[currentPage - 1].results.forEach((product) => {
        const date = formatDateDash(product.created);
        if (Array.isArray(temp[date])) {
          temp[date].push(product);
        } else {
          temp[date] = [product];
        }
      });
    }
    return temp;
  }, [currentPage, products]);

  console.log(productList);
  return (
    <Box>
      <Text textStyle="lg" fontWeight="700">
        주문내역
      </Text>
      <Box mt="80px">
        {productList &&
          Object.keys(productList).map((date) => {
            return (
              <>
                <Text textStyle="sm" fontWeight="700">
                  {date}
                </Text>
                {productList[date].map((product) => {
                  return <div>?</div>;
                })}
              </>
            );
          })}
      </Box>
    </Box>
  );
};

export default HistoryPage;
