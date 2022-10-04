import { FormProvider } from 'react-hook-form';

import SignUpPageView from '@components/SignUpPage/SignUpPage.view';
import useSignUpForm, {
  defaultValues,
} from '@components/SignUpPage/_hook/useSignUpForm';

const SignUpPage = () => {
  const formData = useSignUpForm({ defaultValues });

  return (
    <FormProvider {...formData}>
      <SignUpPageView formData={formData} />
    </FormProvider>
  );
};

export default SignUpPage;
