import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import { usePostReviewMutation } from '@apis/review/ReviewApi.mutation';

import ReviewPageView from '@components/ReviewPage/ReviewPage.view';
import useReviewForm, {
  defaultValues,
} from '@components/ReviewPage/_hooks/useReviewForm';

import { getToken } from '@utils/localStorage/token';

const ReviewPage = () => {
  const formData = useReviewForm({ defaultValues });
  const router = useRouter();
  const { mutate } = usePostReviewMutation();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert('로그인 후 이용해주세요.');
      router.push('/login');
    }
  }, []);
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(({ rating, content, images }) => {
    console.log(rating, content, images);
    mutate({
      userId: 5,
      productId: 1,
      orderItemId: 1,
      rate: rating,
      content,
      reviewimageSet: images,
    });
  });
  return (
    <FormProvider {...formData}>
      <ReviewPageView onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default ReviewPage;
