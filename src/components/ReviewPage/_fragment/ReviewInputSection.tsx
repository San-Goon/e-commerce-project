import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Center, Textarea } from '@chakra-ui/react';

import RatingStars from '@components/ReviewPage/_fragment/RatingStars';
import ReviewImagesUploader from '@components/ReviewPage/_fragment/ReviewImagesUploader';
import FormHelper from '@components/common/FormHelper';

const ReviewInputSection = () => {
  const { control, register } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name="rating"
        render={({ field: { value, onChange } }) => {
          return (
            <FormHelper mb="20px" label="별점" textStyle="md">
              <Center>
                {[1, 2, 3, 4, 5].map((item) => (
                  <RatingStars
                    rate={item}
                    key={item}
                    value={value}
                    onChange={onChange}
                  />
                ))}
              </Center>
            </FormHelper>
          );
        }}
      />
      <FormHelper mb="20px" label="내용" textStyle="md">
        <Textarea
          {...register('content')}
          placeholder="내용을 작성하세요."
          h="230px"
          focusBorderColor="none"
        />
      </FormHelper>
      <ReviewImagesUploader />
    </>
  );
};

export default ReviewInputSection;
