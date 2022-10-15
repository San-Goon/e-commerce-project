import React from 'react';
import { FormProvider } from 'react-hook-form';

import PaymentPageView from '@components/PaymentPage/PaymentPage.view';
import usePaymentForm, {
  defaultValues,
} from '@components/PaymentPage/_hooks/usePaymentForm';

const PaymentPage = () => {
  const formData = usePaymentForm({ defaultValues });

  return (
    <FormProvider {...formData}>
      <PaymentPageView />
    </FormProvider>
  );
};

export default PaymentPage;
