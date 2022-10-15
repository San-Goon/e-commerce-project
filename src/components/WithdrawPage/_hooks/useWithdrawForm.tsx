import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type FormDataType = {
  reason: string;
  typo: string;
  additionalReason: string;
};

export const defaultValues: FormDataType = {
  reason: '',
  typo: '',
  additionalReason: '',
};

export const withdrawFormSchema = yup.object().shape({
  reason: yup.string(),
  typo: yup.string().oneOf(['인코스런']),
  additionalReason: yup
    .string()
    .nullable()
    .transform((o, c) => (o === '' ? null : c))
    .min(1, '기타 사유를 입력해주세요'),
});

const useWithdrawForm = (options?: UseFormProps<FormDataType>) => {
  return useForm<FormDataType>({
    resolver: yupResolver(withdrawFormSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useWithdrawForm;
