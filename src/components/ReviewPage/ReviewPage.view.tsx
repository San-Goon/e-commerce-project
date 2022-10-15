import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';

import RatingStars from '@components/ReviewPage/_fragment/RatingStars';
import FormHelper from '@components/common/FormHelper';
import PlusIcon from '@icons/System/Plus';

import { CloserCircleIcon } from '../../generated/icons/MyIcons';

const ReviewPageView = ({ onSubmit }: any) => {
  const { control, register } = useFormContext();
  const { setValue } = useFormContext();
  const [images, setImages] = useState<any>([]);
  const [previewImg, setPreviewImg] = useState<any>([]);

  const onImageUploaded = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (images.length >= 3) {
        alert('사진은 3장까지 업로드 가능합니다.');
      } else {
        if (e.target.files) {
          const tempArr = [...images];
          const tempArr2 = [...previewImg];
          tempArr.push(e.target.files[0]);
          tempArr2.push(URL.createObjectURL(e.target.files[0]));
          setImages(tempArr);
          setPreviewImg(tempArr2);
          e.target.value = '';
        }
      }
    },
    [images, previewImg],
  );

  useEffect(() => {
    setValue('images', images);
  }, [images]);

  return (
    <Box as="form" onSubmit={onSubmit} p="16px" mt="114px">
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
          {...register('content')}
          placeholder="내용을 작성하세요."
          h="230px"
          focusBorderColor="none"
        />
      </FormHelper>
      <Text fontWeight="700">사진첨부 ({images.length} / 3)</Text>
      <Flex mt="30px" mb="100px">
        {images.length < 3 && (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            border="1px dashed"
            borderColor="gray.400"
            borderRadius="5px"
            cursor="pointer"
            transitionProperty="common"
            transitionDuration="normal"
            boxSize="80px"
          >
            <Flex
              as="label"
              htmlFor={`inputFile-images`}
              w="100%"
              h="100%"
              alignItems="center"
              justifyContent="space-between"
              cursor="pointer"
            >
              <Center w="100%">
                <PlusIcon boxSize="50px" color="gray.400" />
              </Center>
              <Input
                id={`inputFile-images`}
                type="file"
                display="none"
                onChange={onImageUploaded}
              />
            </Flex>
          </Flex>
        )}
        {previewImg.map((item: any, idx: number) => {
          return (
            <Box ml="20px" position="relative" key={idx}>
              <Image alt="preview" src={item} w="80px" h="80px" />
              <CloserCircleIcon
                boxSize="20px"
                top="-10px"
                right="-10px"
                onClick={() => {
                  const tempArr1 = [...images].filter(
                    (item, index) => index !== idx,
                  );
                  const tempArr2 = [...previewImg].filter(
                    (item, index) => index !== idx,
                  );
                  setImages(tempArr1);
                  setPreviewImg(tempArr2);
                }}
                cursor="pointer"
                position="absolute"
                color="gray.500"
              />
            </Box>
          );
        })}
      </Flex>
      <Center>
        <Button colorScheme="primary" mb="30px">
          작성하기
        </Button>
      </Center>
    </Box>
  );
};

export default ReviewPageView;
