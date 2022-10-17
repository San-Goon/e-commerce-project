import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { CONFIG } from '@config';

import { Button, Flex } from '@chakra-ui/react';

import { CartItemType } from '@apis/cart/CartApi.type';
import {
  usePostOrderMutation,
  usePostOrderStatusMutation,
} from '@apis/order/OrderApi.mutation';
import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';

import { loadTossPayments } from '@tosspayments/payment-sdk';
import { setShipInfo } from '@utils/localStorage/shipInfo';

import { FormDataType } from '../_hooks/usePaymentForm';

interface PropsType {
  userId?: number;
  price: number;
  productsList: (GetProductByIdReturnType & CartItemType)[];
}

interface OrderInfoType {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  successUrl: string;
  failUrl: string;
}

const PaymentButton = ({ userId, price, productsList }: PropsType) => {
  const { handleSubmit } = useFormContext<FormDataType>();
  const { mutateAsync: postOrderMutate } = usePostOrderMutation();
  const { mutateAsync: postOrderStatusMutate } = usePostOrderStatusMutation();

  const onClickPayment = (orderInfo: OrderInfoType) => {
    loadTossPayments(CONFIG.PAYMENT_CLIENT_KEY as string).then(
      (tossPayments) => {
        tossPayments.requestPayment('카드', orderInfo);
      },
    );
  };
  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    try {
      const {
        PIAgree,
        userAddress,
        userExtraAddress,
        shipAddress,
        shipExtraAddress,
        ...rest
      } = data;
      const mutateData = {
        userId,
        price,
        userAddrDetail: userAddress + userExtraAddress,
        shipAddrDetail: shipAddress + shipExtraAddress,
        ...rest,
      };
      const { id: orderId } = await postOrderMutate(mutateData);
      for (const { productId, count } of productsList) {
        await postOrderStatusMutate({
          orderId,
          productId,
          count,
        });
      }
      const orderInfo = {
        // amount: price,
        amount: 1,
        orderId,
        orderName:
          productsList.length === 1
            ? `${productsList[0].name}`
            : `${productsList[0].name} 외 ${productsList.length}건`,
        customerName: data.userName,
        successUrl: 'http://localhost:3000/success',
        failUrl: 'http://localhost:3000/cart',
      };
      const count = productsList.length;
      const cartIds = productsList.map((item) => item.id);
      await setShipInfo({ count, cartIds });
      await onClickPayment(orderInfo);
    } catch (e) {
      console.error('ERROR!', e);
    }
  };

  return (
    <>
      <Flex justifyContent="center" mb="80px">
        <Button colorScheme="primary" onClick={handleSubmit(onSubmit)}>
          결제하기
        </Button>
      </Flex>
    </>
  );
};

export default PaymentButton;
