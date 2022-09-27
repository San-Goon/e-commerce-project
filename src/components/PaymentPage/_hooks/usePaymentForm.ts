import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type FormDataType = {
  orderName: string;
  orderPhone: string;
  orderAddress: string;
  getName: string;
  getPhone: string;
  getAddress: string;
  request?: string;
};

export const defaultValues: FormDataType = {
  orderName: '',
  orderPhone: '',
  orderAddress: '',
  getName: '',
  getPhone: '',
  getAddress: '',
  request: '',
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
export const PaymentFormSchema = yup.object().shape({
  orderName: yup.string().required('해당 항목은 필수값 입니다.'),
  orderPhone: yup
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
  orderAddress: yup.string().required('해당 항목은 필수값 입니다.'),
  getName: yup.string().required('해당 항목은 필수값 입니다.'),
  getPhone: yup
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
  getAdress: yup.string().required('해당 항목은 필수값 입니다.'),
  request: yup.string(),
});

const useContactForm = (options?: UseFormProps<FormDataType>) => {
  return useForm<FormDataType>({
    resolver: yupResolver(PaymentFormSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useContactForm;
