import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Center, Textarea } from '@chakra-ui/react';

import { useGetReviewByIdQuery } from '@apis/review/ReviewApi.query';

import ModifyImagesUploader from '@components/MyReviewPage/_fragments/ModifyImagesUploader';
import RatingStars from '@components/ReviewPage/_fragment/RatingStars';
import FormHelper from '@components/common/FormHelper';

interface PropsType {
  id: number;
}

const ModifyReviewSection = ({ id }: PropsType) => {
  const { control, register, setValue } = useFormContext();

  const { data } = useGetReviewByIdQuery({
    variables: id,
    options: {
      onSuccess: (data) => {
        setValue('rating', data.rate);
        setValue('content', data.content);
      },
    },
  });

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
      <ModifyImagesUploader reviewimageSet={data?.reviewimageSet} />
    </>
  );
};

export default ModifyReviewSection;
