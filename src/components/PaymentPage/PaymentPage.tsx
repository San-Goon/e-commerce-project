import React from 'react';
import { FormProvider } from 'react-hook-form';

import PaymentPageView from '@components/PaymentPage/PaymentPage.view';
import usePaymentForm, {
  defaultValues,
} from '@components/PaymentPage/_hooks/usePaymentForm';

interface PropsType {
  ids: string;
}

const PaymentPage = ({ ids }: PropsType) => {
  const formData = usePaymentForm({ defaultValues });

  return (
    <FormProvider {...formData}>
      <PaymentPageView ids={ids} />
    </FormProvider>
  );
};

export default PaymentPage;
