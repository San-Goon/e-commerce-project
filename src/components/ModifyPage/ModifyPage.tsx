import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Box } from '@chakra-ui/react';

import { useGetMeQuery } from '@apis/user/UserApi.query';

import ModifyButtons from '@components/ModifyPage/_fragments/ModifyButtons';
import InfoForm from '@components/common/InfoForm';

import useModifyForm, { defaultValues } from './_hooks/useModifyForm';

const ModifyPage = () => {
  const formData = useModifyForm({ defaultValues });
  const { data } = useGetMeQuery();

  return (
    <FormProvider {...formData}>
      <Box m="16px">
        <InfoForm data={data} />
        <ModifyButtons />
      </Box>
    </FormProvider>
  );
};

export default ModifyPage;
