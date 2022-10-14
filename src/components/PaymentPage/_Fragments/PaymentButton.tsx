import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { AxiosError } from 'axios';

import { CONFIG } from '@config';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { usePostOrderMutation } from '@apis/order/OrderApi.mutation';

import PaymentModal from '@components/PaymentPage/_Fragments/PaymentModal';

import { loadTossPayments } from '@tosspayments/payment-sdk';

import { FormDataType } from '../_hooks/usePaymentForm';

interface PropsType {
  orderInfo: {
    amount: number;
    orderId: string;
    orderName: string;
    customerName: string;
  };
}

const PaymentButton = ({ orderInfo }: PropsType) => {
  const { handleSubmit } = useFormContext<FormDataType>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: OrderMutate } = usePostOrderMutation({
    options: {
      onSuccess: () => {
        onOpen();
      },
      onError: (error: AxiosError) => {
        console.error(error);
      },
    },
  });

  const onClickPayment = () => {
    loadTossPayments(CONFIG.PAYMENT_CLIENT_KEY as string).then(
      (tossPayments) => {
        tossPayments.requestPayment('카드', {
          // amount: orderInfo.amount,
          amount: 1,
          orderId: orderInfo.orderId,
          orderName: orderInfo.orderName,
          customerName: orderInfo.customerName,
          successUrl: 'http://localhost:3000/payment',
          failUrl: 'http://localhost:3000/payment',
        });
      },
    );
  };
  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    onClickPayment();
  };
  return (
    <>
      <Flex justifyContent="center" mb="80px">
        <Button colorScheme="primary" onClick={handleSubmit(onSubmit)}>
          결제하기
        </Button>
      </Flex>
      <PaymentModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PaymentButton;
