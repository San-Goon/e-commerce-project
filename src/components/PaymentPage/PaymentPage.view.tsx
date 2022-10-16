import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import * as _ from 'lodash';

import { Box, Checkbox, Divider, Flex, Text } from '@chakra-ui/react';

import { useGetCartQuery } from '@apis/cart/CartApi.query';
import { useGetProductsByIdQueries } from '@apis/product/ProductApi.query';
import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';
import { useGetMeQuery } from '@apis/user/UserApi.query';

import BottomForm from '@components/PaymentPage/_Fragments/BottomForm';
import InfoInputs from '@components/PaymentPage/_Fragments/InfoInputs';
import ListComponent from '@components/PaymentPage/_Fragments/ListComponent';
import PaymentButton from '@components/PaymentPage/_Fragments/PaymentButton';
import { FormDataType } from '@components/PaymentPage/_hooks/usePaymentForm';

import { UseQueryResult } from '@tanstack/react-query';

interface PropsType {
  ids: string;
}

const PaymentPageView = ({ ids }: PropsType) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { setValue, getValues } = useFormContext<FormDataType>();

  const { data: me } = useGetMeQuery();

  const { data: cart } = useGetCartQuery({
    variables: me?.id.toString(),
    options: {
      enabled: !!me,
    },
  });

  const products = Object.values(
    useGetProductsByIdQueries(
      ids
        .toString()
        .split('n')
        .filter((id: string) => id !== ''),
    ),
  );

  const productsList = useMemo(() => {
    if (cart) {
      const returnArr = [];
      for (let i = 0; i < products.length; i++) {
        console.log(products[i]);
        const mergedObj = _.merge(
          (products[i] as UseQueryResult<GetProductByIdReturnType>).data,
          cart[0].cartitem[i],
        );
        returnArr.push(mergedObj);
      }
      return returnArr;
    }
    return [];
  }, [products, cart]);

  const orderInfo = useMemo(() => {
    return {
      userId: me ? me.id : 0,
      amount: totalPrice,
      orderId: 'asdfsadfsadfsadf',
      orderName: productsList.length
        ? productsList.length === 1
          ? `${productsList[0].name}`
          : `${productsList[0].name} 외 ${productsList.length}건`
        : '',
      customerName: getValues('userName'),
    };
  }, [me, totalPrice, productsList, getValues]);

  const onChangeSame = () => {
    setValue('shipName', getValues('userName'));
    setValue('shipPhone', getValues('userPhone'));
    setValue('shipAddress', getValues('userAddress'));
    setValue('shipExtraAddress', getValues('userExtraAddress'));
  };

  useEffect(() => {
    let totalPrice = 0;
    for (const data of productsList) {
      totalPrice += data.price * data.count;
    }
    setTotalPrice(totalPrice);
  }, [productsList]);

  return (
    <Box mt="130px" px="16px">
      <Text textStyle="lg" fontWeight="700">
        주문결제
      </Text>
      <Text mt="80px" textStyle="md" fontWeight="700">
        주문상품
      </Text>
      <Divider />
      {productsList.length &&
        productsList.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <ListComponent item={item} />
              <Divider />
            </React.Fragment>
          );
        })}
      <Text mt="46px" mb="40px" textStyle="md" fontWeight="700">
        주문자 정보
      </Text>
      <InfoInputs field="user" />
      <Flex
        mt="50px"
        mb="40px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text textStyle="md" fontWeight="700">
          배송지 정보
        </Text>
        <Checkbox
          textStyle="md"
          color="gray.600"
          colorScheme="primary"
          onChange={onChangeSame}
        >
          주문자 정보와 동일
        </Checkbox>
      </Flex>
      <InfoInputs field="ship" />
      <BottomForm totalPrice={totalPrice} />
      <PaymentButton orderInfo={orderInfo} productsList={productsList} />
    </Box>
  );
};

export default PaymentPageView;
