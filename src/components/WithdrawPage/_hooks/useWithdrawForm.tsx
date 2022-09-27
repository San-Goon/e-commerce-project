import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type FormDataType = {
  reason: string;
  typo: string;
};

export const defaultValues: FormDataType = {
  reason: '',
  typo: '',
};

export const withdrawFormSchema = yup.object().shape({
  reason: yup.string(),
  typo: yup.string().oneOf(['인코스런']),
});

const useWithdrawForm = (options?: UseFormProps<FormDataType>) => {
  return useForm<FormDataType>({
    resolver: yupResolver(withdrawFormSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useWithdrawForm;
