import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Checkbox, Flex, Text } from '@chakra-ui/react';

import { ModifyShippingInfoFormDataType } from '@components/HistoryPage/_hooks/useModifyShippingInfoForm';
import FormHelper from '@components/common/FormHelper';
import Input from '@components/common/Input';
import ShippingInfoInputs from '@components/common/ShippingInfoInputs';

const ModifyShippingInfoSection = () => {
  const { setValue, getValues, formState } =
    useFormContext<ModifyShippingInfoFormDataType>();

  const onChangeSame = useCallback(() => {
    setValue('shipName', getValues('userName'));
    setValue('shipPhone', getValues('userPhone'));
    setValue('shipAddrPost', getValues('userAddrPost'));
    setValue('shipAddr', getValues('userAddr'));
    setValue('shipAddrDetail', getValues('userAddrDetail'));
  }, [setValue, getValues]);

  return (
    <>
      <Text mt="46px" mb="40px" textStyle="md" fontWeight="700">
        주문자 정보
      </Text>
      <ShippingInfoInputs field="user" />
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
      <ShippingInfoInputs field="ship" />
      <FormHelper
        mb="50px"
        label="배송요청사항"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.orderMessage?.message}
      >
        <Input fieldName="orderMessage" placeholder="" />
      </FormHelper>
    </>
  );
};

export default ModifyShippingInfoSection;
