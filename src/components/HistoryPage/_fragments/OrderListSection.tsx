import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Box,
  Button,
  Divider,
  Flex,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { usePutOrderShippingStatus } from '@apis/order/OrderApi.mutation';
import { useGetOrderByIdQuery } from '@apis/order/OrderApi.query';
import { PostOrderStatusReturnType } from '@apis/order/OrderApi.type';
import useAppStore from '@features/useAppStore';

import HistoryList from '@components/HistoryPage/_fragments/HistoryList';
import HistoryModal from '@components/HistoryPage/_fragments/HistoryModal';
import ModifyShippingInfoModal from '@components/HistoryPage/_fragments/ModifyShippingInfoModal';
import { ModifyShippingInfoFormDataType } from '@components/HistoryPage/_hooks/useModifyShippingInfoForm';

import { useQueryClient } from '@tanstack/react-query';
import { formatDateTime } from '@utils/format';

interface PropsType {
  productList: { [p: string]: PostOrderStatusReturnType[] };
  orderId: string;
}

const OrderListSection = ({ productList, orderId }: PropsType) => {
  const { setValue } = useFormContext<ModifyShippingInfoFormDataType>();
  const queryKey = useAppStore((store) => store.QUERY_KEY.orderQueryKey);
  const queryClient = useQueryClient();
  const {
    isOpen: isOpenModifyModal,
    onOpen: onOpenModifyModal,
    onClose: onCloseModifyModal,
  } = useDisclosure();
  const {
    isOpen: isOpenCancelModal,
    onOpen: onOpenCancelModal,
    onClose: onCloseCancelModal,
  } = useDisclosure();

  const { mutate: changeMutate } = usePutOrderShippingStatus({
    options: {
      onSuccess: () => {
        queryClient
          .invalidateQueries(queryKey)
          .then(() => alert('변경되었습니다.'));
      },
    },
  });

  const onChangeStatus = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      changeMutate({ orderId, body: { shippingStatus: e.target.value } });
      e.target.value = '';
    },
    [changeMutate, orderId],
  );

  const { data } = useGetOrderByIdQuery({
    variables: orderId,
    options: {
      onSuccess: (data) => {
        setValue('userName', data.userName);
        setValue('userPhone', data.userPhone);
        setValue('shipName', data.shipName);
        setValue('shipPhone', data.shipPhone);
        setValue('userAddrPost', data.userAddrPost);
        setValue('shipAddrPost', data.shipAddrPost);
        setValue('userAddr', data.userAddr);
        setValue('shipAddr', data.shipAddr);
        setValue('userAddrDetail', data.userAddrDetail);
        setValue('shipAddrDetail', data.shipAddrDetail);
        setValue('orderMessage', data.orderMessage);
      },
    },
  });

  return (
    <Flex direction="column">
      <Text textStyle="sm" fontWeight="700">
        [{formatDateTime(productList[orderId][0].created)}]
      </Text>
      {productList[orderId].map((product) => {
        return (
          <HistoryList
            key={product.id}
            product={product}
            shippingStatus={data?.shippingStatus}
          />
        );
      })}
      <Flex mb="10px" alignItems="center">
        <Box w="200px">
          <Select placeholder="배송상태 변경하기" onChange={onChangeStatus}>
            <option value="PAID">결제완료</option>
            <option value="WAIT">상품준비</option>
            <option value="INPROGRESS">배송중</option>
            <option value="DONE">배송완료</option>
          </Select>
        </Box>
        {data?.shippingStatus === 'PAID' ? (
          <Box ml="auto">
            <Button
              w="150px"
              h="50px"
              borderRadius="5px"
              colorScheme="primary"
              fontSize="12px"
              fontWeight="700"
              variant="outline"
              mr="5px"
              onClick={onOpenModifyModal}
            >
              배송정보수정
            </Button>
            <Button
              w="150px"
              h="50px"
              borderRadius="5px"
              colorScheme="primary"
              fontSize="12px"
              fontWeight="700"
              onClick={onOpenCancelModal}
            >
              주문취소
            </Button>
          </Box>
        ) : null}
      </Flex>
      <Divider />
      <ModifyShippingInfoModal
        isOpen={isOpenModifyModal}
        onClose={onCloseModifyModal}
        orderId={orderId}
      />
      <HistoryModal
        isOpen={isOpenCancelModal}
        onClose={onCloseCancelModal}
        orderId={orderId}
      />
    </Flex>
  );
};

export default OrderListSection;
