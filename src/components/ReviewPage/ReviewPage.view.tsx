import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, Button, Center, Text, Textarea } from '@chakra-ui/react';

import RatingStars from '@components/ReviewPage/_fragment/RatingStars';
import FormHelper from '@components/common/FormHelper';

import { RatingStarIcon } from '../../generated/icons/MyIcons';

const ReviewPageView = ({ onSubmit }: any) => {
  const { formState, control } = useFormContext();
  const [clicked, setClicked] = React.useState(0);
  console.log('clicked', clicked);
  return (
    <Box p="16px" mt="114px">
      <Text textStyle="lg" fontWeight="700">
        리뷰작성
      </Text>
      <Box mt="80px">상품정보</Box>
      <Box w="100vw" h="10px" backgroundColor="gray.100" />
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
          placeholder="내용을 작성하세요."
          h="230px"
          focusBorderColor="none"
        />
      </FormHelper>
      {/*<FormHelper mb="30px" label="사진첨부" textStyle="md">*/}
      {/*  희희*/}
      {/*</FormHelper>*/}
      <Center>
        <Button colorScheme="primary" mb="30px">
          작성하기
        </Button>
      </Center>
    </Box>
  );
};

export default ReviewPageView;
