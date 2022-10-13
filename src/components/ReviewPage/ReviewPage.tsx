import { FormProvider } from 'react-hook-form';

import { usePostReviewMutation } from '@apis/review/ReviewApi.mutation';

import ReviewPageView from '@components/ReviewPage/ReviewPage.view';
import useReviewForm, {
  defaultValues,
} from '@components/ReviewPage/_hooks/useReviewForm';

const ReviewPage = () => {
  const formData = useReviewForm({ defaultValues });
  const { mutate } = usePostReviewMutation();
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
