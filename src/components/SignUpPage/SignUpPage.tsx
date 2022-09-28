import { FormProvider } from 'react-hook-form';

import { usePostRegisterMutation } from '@apis/user/UserApi.mutation';

import SignUpPageView from '@components/SignUpPage/SignUpPage.view';
import useSignUpForm, {
  defaultValues,
} from '@components/SignUpPage/_hook/useSignUpForm';

const SignUpPage = () => {
  const formData = useSignUpForm({ defaultValues });
  const { handleSubmit } = formData;
  const { mutate } = usePostRegisterMutation();
  const onSubmit = handleSubmit(
    ({ name, nickname, gender, phone, email, age }) => {
      console.log(name, nickname, gender, phone, email, age);
      mutate({
        name,
        nickname,
        gender,
        phone,
        email,
        age,
        profile: 'hi',
        socialToken: 'hi',
      });
    },
  );

  return (
    <FormProvider {...formData}>
      <SignUpPageView onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default SignUpPage;
