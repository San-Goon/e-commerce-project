import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type FormDataType = {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  gender?: string;
  age?: string;
  serviceAgree: boolean;
  PIAgree: boolean;
  marketingAdAgree: boolean;
};

export const defaultValues = {
  name: '',
  nickname: '',
  email: '',
  phone: '',
  gender: '',
  age: '',
  serviceAgree: false,
  PIAgree: false,
  marketingAdAgree: false,
};

/**
 * yup 을 이용하여 form의 유효성 검사를 도와줍니다.
 * react-hook-form과 yup을 연결해 줄 yupResolver 을 함께 사용합니다.
 *
 * validation에 반복되는 값은 상수로 빼서 관리합니다.
 *
 *
 *
 * @see https://github.com/jquense/yup#getting-started
 * @see https://yarnpkg.com/package/@hookform/resolvers#readme
 * */

export const signUpFormSchema = yup.object().shape({
  name: yup.string().min(2, '최소 2자 이상 입력해주세요.'),
  nickname: yup
    .string()
    .min(2, '최소길이는 2자 입니다.')
    .max(8, '최대길이는 8자 입니다.'),
  phone: yup
    .string()
    .test(
      'isNumber',
      '숫자만 입력 가능합니다.',
      (val) => !Number.isNaN(Number(val)),
    )
    .matches(
      /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
      '정확한 핸드폰 번호를 입력해주세요.',
    ),
  email: yup
    .string()
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
      '이메일 주소를 정확하게 입력해주세요.',
    ),
  gender: yup.string(),
  age: yup.string(),
  serviceAgree: yup.boolean().oneOf([true], 'Field must be checked'),
  PIAgree: yup.boolean().oneOf([true], 'Field must be checked'),
  marketingAdAgree: yup.boolean(),
});

const useSignUpForm = (options?: UseFormProps<FormDataType>) => {
  return useForm<FormDataType>({
    resolver: yupResolver(signUpFormSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useSignUpForm;
