import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Center, Flex, Image, Input, Text } from '@chakra-ui/react';

import PlusIcon from '@icons/System/Plus';

import { CloserCircleIcon } from '../../../generated/icons/MyIcons';

const ReviewImagesUploader = () => {
  const { setValue } = useFormContext();

  const [images, setImages] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([]);

  useEffect(() => {
    setValue('images', images);
  }, [images, setValue]);

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

  const onClickDeleteIcon = useCallback(
    (idx) => () => {
      const tempArr1 = [...images].filter((item, index) => index !== idx);
      const tempArr2 = [...previewImg].filter((item, index) => index !== idx);
      setImages(tempArr1);
      setPreviewImg(tempArr2);
    },
    [images, previewImg, setPreviewImg, setImages],
  );

  return (
    <>
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
        {previewImg.map((item, idx) => {
          return (
            <Box ml="20px" position="relative" key={idx}>
              <Image alt="preview" src={item} w="80px" h="80px" />
              <CloserCircleIcon
                boxSize="20px"
                top="-10px"
                right="-10px"
                onClick={onClickDeleteIcon(idx)}
                cursor="pointer"
                position="absolute"
                color="gray.500"
              />
            </Box>
          );
        })}
      </Flex>
    </>
  );
};

export default ReviewImagesUploader;
