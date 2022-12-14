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
import { ShipInfoType, setShipInfo } from '@utils/localStorage/shipInfo';

import { PaymentFormDataType } from '../_hooks/usePaymentForm';

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
  const { handleSubmit } = useFormContext<PaymentFormDataType>();
  const { mutateAsync: postOrderMutate } = usePostOrderMutation();
  const { mutateAsync: postOrderStatusMutate } = usePostOrderStatusMutation();

  const onClickPayment = (orderInfo: OrderInfoType) => {
    loadTossPayments(CONFIG.PAYMENT_CLIENT_KEY as string).then(
      (tossPayments) => {
        tossPayments.requestPayment('카드', orderInfo);
      },
    );
  };
  const onSubmit: SubmitHandler<PaymentFormDataType> = async (data) => {
    try {
      const { PIAgree, ...rest } = data;
      const mutateData = {
        userId,
        price,
        shippingPrice: 0,
        amount: price,
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
        successUrl: `${CONFIG.DOMAIN}/success`,
        failUrl: `${CONFIG.DOMAIN}/cart`,
      };
      const setLocalStorageData: ShipInfoType = {
        cartIds: [],
        productInfos: [],
      };
      for (const product of productsList) {
        setLocalStorageData.cartIds.push(product.id.toString());
        setLocalStorageData.productInfos.push({
          productId: product.productId,
          count: product.count,
        });
      }
      await setShipInfo(setLocalStorageData);
      await onClickPayment(orderInfo);
    } catch (e) {
      console.error('ERROR!', e);
    }
  };

  console.log('productList', productsList);

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
