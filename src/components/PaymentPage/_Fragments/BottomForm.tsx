import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Checkbox,
  Divider,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';

import { PaymentFormDataType } from '@components/PaymentPage/_hooks/usePaymentForm';
import FormHelper from '@components/common/FormHelper';
import Input from '@components/common/Input';

import { formatPrice } from '@utils/format';

import { CreditCardIcon } from '../../../generated/icons/MyIcons';

interface PropsType {
  totalPrice: number;
}

const BottomForm = ({ totalPrice }: PropsType) => {
  const { formState, control } = useFormContext<PaymentFormDataType>();
  return (
    <>
      <FormHelper
        mb="50px"
        label="배송요청사항"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.orderMessage?.message}
      >
        <Input fieldName="orderMessage" placeholder="" />
      </FormHelper>
      <Divider />
      <Text mt="40px" mb="10px" textStyle="md" fontWeight="700">
        결제수단
      </Text>
      <Controller
        control={control}
        name="method"
        render={({ field: { onChange, value } }) => {
          return (
            <RadioGroup onChange={onChange} value={value}>
              <Stack direction="row">
                <Radio
                  defaultChecked
                  textStyle="md"
                  colorScheme="primary"
                  value="CARD"
                >
                  <CreditCardIcon boxSize="50px" mr="10px" />
                  신용카드 결제
                </Radio>
              </Stack>
            </RadioGroup>
          );
        }}
      />

      <Text mt="30px" mb="40px" textStyle="md" fontWeight="700">
        최종 결제금액
      </Text>
      <Flex justifyContent="space-between">
        <Text textStyle="md" color="gray.600">
          총 상품금액
        </Text>
        <Text textStyle="md" color="gray.600">
          {formatPrice(totalPrice)}원
        </Text>
      </Flex>
      <Flex mt="10px" mb="20px" justifyContent="space-between">
        <Text textStyle="md" color="gray.600">
          총 배송비
        </Text>
        <Text textStyle="md" color="gray.600">
          {totalPrice < 30000 ? '3,000원' : '무료'}
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" alignItems="center" h="68px">
        <Text textStyle="md">결제금액</Text>
        <Text textStyle="md" fontWeight="700 " color="primary.500">
          {totalPrice < 30000
            ? formatPrice(totalPrice + 3000)
            : formatPrice(totalPrice)}
          원
        </Text>
      </Flex>
      <Divider />
      <Controller
        control={control}
        name="PIAgree"
        render={({ field: { onChange } }) => {
          return (
            <Checkbox
              onChange={onChange}
              colorScheme="primary"
              mt="20px"
              mb="40px"
              textStyle="md"
              color="gray.600"
            >
              개인정보 수집 이용 동의(필수)
            </Checkbox>
          );
        }}
      />
    </>
  );
};

export default BottomForm;
