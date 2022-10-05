import React from 'react';
import { FormProvider } from 'react-hook-form';

import PaymentPageView from '@components/PaymentPage/PaymentPage.view';
import useContactForm, {
  defaultValues,
} from '@components/PaymentPage/_hooks/usePaymentForm';

const PaymentPage = () => {
  const formData = useContactForm({ defaultValues });

  return (
    <FormProvider {...formData}>
      <PaymentPageView formData={formData} />
    </FormProvider>
  );
};

export default PaymentPage;
