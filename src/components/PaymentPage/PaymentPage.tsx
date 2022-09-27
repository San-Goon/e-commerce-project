import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Box, Input, Text } from '@chakra-ui/react';

import PaymentPageView from '@components/PaymentPage/PaymentPage.view';
import useContactForm, {
  defaultValues,
} from '@components/PaymentPage/_hooks/usePaymentForm';
import FormHelper from '@components/common/FormHelper';

const PaymentPage = () => {
  const formData = useContactForm({ defaultValues });
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(
    ({
      orderName,
      orderPhone,
      orderAddress,
      getName,
      getPhone,
      getAddress,
      request,
    }) => {
      console.log(
        `submitted: ${orderName}, ${orderPhone}, ${orderAddress}, ${getName}, ${getPhone}, ${getAddress}, ${request}`,
      );
    },
  );
  return (
    <FormProvider {...formData}>
      <PaymentPageView onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default PaymentPage;
