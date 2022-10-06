import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import ReviewPageView from '@components/ReviewPage/ReviewPage.view';
import useReviewForm, {
  defaultValues,
} from '@components/ReviewPage/_hooks/useReviewForm';

import { getToken } from '@utils/localStorage/token';

const ReviewPage = () => {
  const formData = useReviewForm({ defaultValues });
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(({ rating, content, images }) => {
    console.log(rating, content, images);
    const router = useRouter();
    useEffect(() => {
      const token = getToken();
      if (!token) {
        alert('로그인 후 이용해주세요.');
        router.push('/login');
      }
    }, []);
  });
  return (
    <FormProvider {...formData}>
      <ReviewPageView onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default ReviewPage;
