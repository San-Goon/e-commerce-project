import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Box } from '@chakra-ui/react';

import ModifyButtons from '@components/ModifyPage/_fragments/ModifyButtons';
import InfoForm from '@components/common/InfoForm';

import useModifyForm, { defaultValues } from './_hooks/useModifyForm';

const ModifyPage = () => {
  const formData = useModifyForm({ defaultValues });
  const router = useRouter();

  return (
    <FormProvider {...formData}>
      <Box m="16px">
        <InfoForm data={router.query} />
        <ModifyButtons />
      </Box>
    </FormProvider>
  );
};

export default ModifyPage;
