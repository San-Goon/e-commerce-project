import React from 'react';
import { UseFormReturn, useFormContext } from 'react-hook-form';

import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Divider,
  Flex,
  Radio,
  Text,
} from '@chakra-ui/react';

import { FormDataType } from '@components/PaymentPage/_hooks/usePaymentForm';
import FormHelper from '@components/common/FormHelper';
import Input from '@components/common/Input';

import { CreditCardIcon } from '../../generated/icons/MyIcons';

interface FormPageProps extends BoxProps {
  formData?: UseFormReturn<FormDataType>;
}

const PaymentPageView = ({ onSubmit, ...basisProps }: FormPageProps) => {
  const { formState } = useFormContext();

  return (
    <Box mt="130px" px="16px">
      <Text textStyle="lg" fontWeight="700">
        주문결제
      </Text>
      <Text mt="80px" textStyle="md" fontWeight="700">
        주문상품
      </Text>
      <Box h="80px">여기에 상품 넣어주세용</Box>
      <Text mt="46px" mb="40px" textStyle="md" fontWeight="700">
        주문자정보
      </Text>
      <FormHelper
        mb="50px"
        label="이름"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.orderName?.message}
      >
        <Input fieldName="orderName" placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="핸드폰번호"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.orderPhone?.message}
      >
        <Input fieldName="orderPhone" placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="주소"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.orderAddress?.message}
      >
        <Input fieldName="orderAddress" placeholder="" />
      </FormHelper>
      <Flex
        mt="50px"
        mb="40px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text textStyle="md" fontWeight="700">
          배송지 정보
        </Text>
        <Checkbox textStyle="md" color="gray.600" colorScheme="primary">
          주문자 정보와 동일
        </Checkbox>
      </Flex>

      <FormHelper
        mb="50px"
        label="이름"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.getName?.message}
      >
        <Input fieldName="getName" placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="핸드폰번호"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.getPhone?.message}
      >
        <Input fieldName="getPhone" placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="주소"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.getAddress?.message}
      >
        <Input fieldName="getAddress" placeholder="" />
      </FormHelper>
      <FormHelper
        mb="50px"
        label="배송요청사항"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.request?.message}
      >
        <Input fieldName="request" placeholder="" />
      </FormHelper>
      <Divider />
      <Text mt="40px" mb="10px" textStyle="md" fontWeight="700">
        결제수단
      </Text>
      <Radio defaultChecked textStyle="md" colorScheme="primary">
        <CreditCardIcon boxSize="50px" mr="10px" />
        신용카드 결제
      </Radio>
      <Text mt="30px" mb="40px" textStyle="md" fontWeight="700">
        최종 결제금액
      </Text>
      <Flex justifyContent="space-between">
        <Text textStyle="md" color="gray.600">
          총 상품금액
        </Text>
        <Text textStyle="md" color="gray.600">
          얼마입니당
        </Text>
      </Flex>
      <Flex mt="10px" mb="20px" justifyContent="space-between">
        <Text textStyle="md" color="gray.600">
          총 배송비
        </Text>
        <Text textStyle="md" color="gray.600">
          얼마입니당
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" alignItems="center" h="68px">
        <Text textStyle="md">결제금액</Text>
        <Text textStyle="md" fontWeight="700 " color="primary.500">
          얼마입니당
        </Text>
      </Flex>
      <Divider />
      <Checkbox
        colorScheme="primary"
        mt="20px"
        mb="40px"
        textStyle="md"
        color="gray.600"
      >
        개인정보 수집 이용 동의(필수)
      </Checkbox>
      <Flex justifyContent="center" mb="80px">
        <Button colorScheme="primary">결제하기</Button>
      </Flex>
    </Box>
  );
};

export default PaymentPageView;
