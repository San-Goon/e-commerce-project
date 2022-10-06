import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import WithdrawPageView from '@components/WithdrawPage/WithdrawPage.view';
import useWithdrawForm, {
  defaultValues,
} from '@components/WithdrawPage/_hooks/useWithdrawForm';

import { getToken } from '@utils/localStorage/token';

const WithdrawPage = () => {
  const formData = useWithdrawForm({ defaultValues });
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(({ reason, typo }) => {
    console.log(reason, typo);
  });
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
      <WithdrawPageView onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default WithdrawPage;
