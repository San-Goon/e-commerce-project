import { FormProvider } from 'react-hook-form';

import ReviewPageView from '@components/ReviewPage/ReviewPage.view';
import useReviewForm, {
  defaultValues,
} from '@components/ReviewPage/_hooks/useReviewForm';

const ReviewPage = () => {
  const formData = useReviewForm({ defaultValues });
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(({ rating, content, images }) => {
    console.log(rating, content, images);
  });
  return (
    <FormProvider {...formData}>
      <ReviewPageView onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default ReviewPage;
