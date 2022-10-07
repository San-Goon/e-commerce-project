import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import { Box } from '@chakra-ui/react';

import ModifyButtons from '@components/ModifyPage/_fragments/ModifyButtons';
import InfoForm from '@components/common/InfoForm';

import { getToken } from '@utils/localStorage/token';

import useModifyForm, { defaultValues } from './_hook/useModifyForm';

const ModifyPage = () => {
  const formData = useModifyForm({ defaultValues });
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
      <Box m="16px">
        <InfoForm />
        <ModifyButtons />
      </Box>
    </FormProvider>
  );
};

export default ModifyPage;
