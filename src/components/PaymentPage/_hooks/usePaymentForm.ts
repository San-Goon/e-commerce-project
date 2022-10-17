import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type FormDataType = {
  userName: string;
  userPhone: string;
  userAddress: string;
  userExtraAddress: string;
  userAddrPost: string;
  shipName: string;
  shipPhone: string;
  shipAddress: string;
  shipAddrPost: string;
  shipExtraAddress: string;
  orderMessage?: string;
  method: string;
  PIAgree: boolean;
};

export const defaultValues: FormDataType = {
  userName: '',
  userPhone: '',
  userAddress: '',
  userExtraAddress: '',
  userAddrPost: '',
  shipName: '',
  shipPhone: '',
  shipAddress: '',
  shipExtraAddress: '',
  shipAddrPost: '',
  orderMessage: '',
  method: '',
  PIAgree: false,
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
  userName: yup.string().required('해당 항목은 필수값 입니다.'),
  userPhone: yup
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
  userAddress: yup.string().required('해당 항목은 필수값 입니다.'),
  userExtraAddress: yup.string(),
  shipName: yup.string().required('해당 항목은 필수값 입니다.'),
  shipPhone: yup
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
  shipAddress: yup.string().required('해당 항목은 필수값 입니다.'),
  shipExtraAddress: yup.string(),
  orderMessage: yup.string(),
  method: yup.string().oneOf(['CARD']).required('해당 항목은 필수값 입니다.'),
  PIAgree: yup.boolean().oneOf([true], '필수약관에 동의해주세요.'),
});

const usePaymentForm = (options?: UseFormProps<FormDataType>) => {
  return useForm<FormDataType>({
    resolver: yupResolver(PaymentFormSchema),
    mode: 'onChange',
    ...options,
  });
};

export default usePaymentForm;
