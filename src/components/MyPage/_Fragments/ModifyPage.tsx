import { FormProvider } from 'react-hook-form';

import SignUpPageView from '@components/SignUpPage/SignUpPage.view';

import useModifyForm, { defaultValues } from './_hook/useModifyForm';

const ModifyPage = () => {
  const formData = useModifyForm({ defaultValues });
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(
    ({ name, nickname, gender, phone, email, age }) => {
      console.log(name, nickname, gender, phone, email, age);
    },
  );

  return (
    <FormProvider {...formData}>
      <SignUpPageView onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default ModifyPage;
