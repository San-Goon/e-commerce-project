import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { useDeleteCartItemMutation } from '@apis/cart/CartApi.mutation';
import { usePatchOrderByIdMutation } from '@apis/order/OrderApi.mutation';

import PaymentInfoSection from '@components/SuccessPage/_fragments/PaymentInfoSection';
import ShipInfoSection from '@components/SuccessPage/_fragments/ShipInfoSection';
import SuccessButtons from '@components/SuccessPage/_fragments/SuccessButtons';
import SuccessListSection from '@components/SuccessPage/_fragments/SuccessListSection';

import {
  ShipInfoType,
  deleteShipInfo,
  getShipInfo,
} from '@utils/localStorage/shipInfo';

const SuccessPage = () => {
  const [shipInfo, setShipInfo] = useState<ShipInfoType>();

  const { mutate: patchOrderMutate, data } = usePatchOrderByIdMutation();

  const { mutate: deleteCartMutate } = useDeleteCartItemMutation();

  const router = useRouter();
  const localData = getShipInfo();
  useEffect(() => {
    patchOrderMutate({
      id: router.query.orderId as string,
      body: { paymentKey: router.query.paymentKey as string },
    });
    if (localData) {
      setShipInfo(localData);
    }
  }, [localData, patchOrderMutate, router.query]);

  useEffect(() => {
    if (shipInfo) {
      for (const cartId of shipInfo.cartIds) {
        deleteCartMutate(cartId.toString());
      }
      deleteShipInfo();
    }
  }, [shipInfo, deleteCartMutate]);

  return (
    <Box mx="16px">
      <Flex h="140px" alignItems="center">
        <Text textStyle="lg" fontWeight="700">
          주문내역
        </Text>
      </Flex>
      {shipInfo && <SuccessListSection data={data} shipInfo={shipInfo} />}
      <ShipInfoSection data={data} />
      <Box w="100vw" h="10px" backgroundColor="gray.100" />
      <PaymentInfoSection data={data} />
      <SuccessButtons router={router} />
    </Box>
  );
};

export default SuccessPage;
