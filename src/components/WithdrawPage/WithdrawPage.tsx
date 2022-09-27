import { FormProvider } from 'react-hook-form';

import WithdrawPageView from '@components/WithdrawPage/WithdrawPage.view';
import useWithdrawForm, {
  defaultValues,
} from '@components/WithdrawPage/_hooks/useWithdrawForm';

const WithdrawPage = () => {
  const formData = useWithdrawForm({ defaultValues });
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(({ reason, typo }) => {
    console.log(reason, typo);
  });
  return (
    <FormProvider {...formData}>
      <WithdrawPageView onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default WithdrawPage;
