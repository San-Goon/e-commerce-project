import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type FormDataType = {
  rating: number;
  content: string;
  images: [];
};

export const defaultValues: FormDataType = {
  rating: 0,
  content: '',
  images: [],
};

export const ReviewFormSchema = yup.object().shape({
  rating: yup.number().required('별점을 정해주세요.'),
  content: yup.string().min(20, '20자 이상 입력해주세요.').required(),
  images: yup.array(),
});

const useReviewForm = (options?: UseFormProps<FormDataType>) => {
  return useForm<FormDataType>({
    resolver: yupResolver(ReviewFormSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useReviewForm;
