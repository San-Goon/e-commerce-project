import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { CONFIG } from '@config';

import { Button, Flex } from '@chakra-ui/react';

import { CartItemType } from '@apis/cart/CartApi.type';
import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';

import { loadTossPayments } from '@tosspayments/payment-sdk';
import { setShipInfo } from '@utils/localStorage/shipInfo';

import { FormDataType } from '../_hooks/usePaymentForm';

interface PropsType {
  orderInfo: {
    userId: number;
    amount: number;
    orderId: string;
    orderName: string;
    customerName: string;
  };
  productsList: (GetProductByIdReturnType & CartItemType)[];
}

const PaymentButton = ({ orderInfo, productsList }: PropsType) => {
  const { handleSubmit } = useFormContext<FormDataType>();

  const onClickPayment = () => {
    loadTossPayments(CONFIG.PAYMENT_CLIENT_KEY as string).then(
      (tossPayments) => {
        tossPayments.requestPayment('카드', {
          // amount: orderInfo.amount,
          amount: 1,
          orderId: orderInfo.orderId,
          orderName: orderInfo.orderName,
          customerName: orderInfo.customerName,
          successUrl: 'http://localhost:3000/success',
          failUrl: 'http://localhost:3000/cart',
        });
      },
    );
  };
  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    setShipInfo({ ...data, orderInfo, productsList });
    onClickPayment();
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
