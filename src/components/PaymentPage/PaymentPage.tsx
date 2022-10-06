import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import PaymentPageView from '@components/PaymentPage/PaymentPage.view';
import useContactForm, {
  defaultValues,
} from '@components/PaymentPage/_hooks/usePaymentForm';

import { getToken } from '@utils/localStorage/token';

const PaymentPage = () => {
  const formData = useContactForm({ defaultValues });
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert('로그인 후 이용해주세요.');
      router.push('/login');
    }
  }, []);

  return (
    <FormProvider {...formData}>
      <PaymentPageView formData={formData} />
    </FormProvider>
  );
};

export default PaymentPage;
