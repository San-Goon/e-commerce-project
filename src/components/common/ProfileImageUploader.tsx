import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Flex, Image } from '@chakra-ui/react';

import FilledPlus from '@icons/System/FilledPlus';
import ProfileIcon from '@icons/System/Profile';

import { CloserCircleIcon } from '../../generated/icons/MyIcons';

interface PropsType {
  profileImg?: string;
}

const ProfileImageUploader = ({ profileImg }: PropsType) => {
  const { setValue } = useFormContext();

  const [image, setImage] = useState<(File | string)[]>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([]);

  const onUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const tempArr = [];
        const tempArr2 = [];
        tempArr.push(e.target.files[0]);
        tempArr2.push(URL.createObjectURL(e.target.files[0]));
        setImage(tempArr);
        setPreviewImg(tempArr2);
        e.target.value = '';
      }
    },
    [],
  );

  useEffect(() => {
    setValue('profileImg', image);
  }, [image, setValue]);

  useEffect(() => {
    if (profileImg) {
      setImage([profileImg]);
      setPreviewImg([profileImg]);
    }
  }, [profileImg]);

  const onDelete = useCallback(() => {
    setTimeout(() => {
      setImage([]);
      setPreviewImg([]);
    }, 50);
  }, []);

  return (
    <Flex
      as="label"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
      position="relative"
    >
      {!previewImg.length ? (
        <Box cursor="pointer">
          <ProfileIcon boxSize="120px" />
          <FilledPlus
            boxSize="20px"
            color="primary.500"
            right="0"
            bottom="0"
            position="absolute"
          />
          <input
            id={`inputFile-profilePath`}
            type="file"
            accept="image/png, image/jpg, image/svg"
            style={{ display: 'none' }}
            onChange={onUpload}
          />
        </Box>
      ) : (
        <>
          <Image
            src={previewImg[0]}
            alt="logoImage"
            boxSize="120px"
            borderRadius="50%"
          />
          <CloserCircleIcon
            boxSize="20px"
            color="black"
            position="absolute"
            cursor="pointer"
            top="0"
            right="0"
            onClick={onDelete}
          />
        </>
      )}
    </Flex>
  );
};

export default ProfileImageUploader;
