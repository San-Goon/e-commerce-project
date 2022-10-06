import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import ModifyPageView from '@components/ModifyPage/ModifyPage.view';

import { getToken } from '@utils/localStorage/token';

import useModifyForm, { defaultValues } from './_hook/useModifyForm';

const ModifyPage = () => {
  const formData = useModifyForm({ defaultValues });
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(
    ({ name, nickname, gender, phone, email, age }) => {
      console.log(name, nickname, gender, phone, email, age);
    },
  );
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
      <ModifyPageView onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default ModifyPage;
