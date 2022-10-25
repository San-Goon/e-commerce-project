import React, { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useGetOrderStatusQuery } from '@apis/order/OrderApi.query';
import { PostOrderStatusReturnType } from '@apis/order/OrderApi.type';
import { useGetMeQuery } from '@apis/user/UserApi.query';
import { queryKeySliceActions } from '@features/queryKey/queryKeySlice';

import HistoryList from '@components/HistoryPage/_fragments/HistoryList';
import ModifyShippingInfoModal from '@components/HistoryPage/_fragments/ModifyShippingInfoModal';
import useModifyShippingInfoForm, {
  defaultValues,
} from '@components/HistoryPage/_hooks/useModifyShippingInfoForm';
import Pagination from '@components/common/Pagination';

const HistoryPage = () => {
  const formData = useModifyShippingInfoForm({ defaultValues });
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
                <Flex key={orderId} direction="column">
                  <Text textStyle="sm" fontWeight="700">
                    [{productList[orderId][0].created}]
                  </Text>
                  {productList[orderId].map((product) => {
                    return <HistoryList key={product.id} product={product} />;
                  })}
                  <Button
                    w="150px"
                    h="50px"
                    borderRadius="5px"
                    colorScheme="primary"
                    fontSize="12px"
                    fontWeight="700"
                    ml="auto"
                    mb="10px"
                    variant="outline"
                    onClick={onOpen}
                  >
                    배송정보수정
                  </Button>
                  <Divider />
                  <ModifyShippingInfoModal
                    isOpen={isOpen}
                    onClose={onClose}
                    orderId={orderId}
                  />
                </Flex>
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
