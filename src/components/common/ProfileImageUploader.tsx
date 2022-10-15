import React, { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Box, BoxProps, Flex, Image } from '@chakra-ui/react';

import FilledPlus from '@icons/System/FilledPlus';
import ProfileIcon from '@icons/System/Profile';

import { CloserCircleIcon } from '../../generated/icons/MyIcons';
import useProfileUpload from '../../hooks/useProfileUpload';

interface PropsType extends BoxProps {
  fieldName: string;
}
const ProfileImageUploader = ({ fieldName }: PropsType) => {
  const filesValue = useWatch({ name: fieldName });
  const { register, setValue } = useFormContext();
  const { uploadFilesToS3 } = useProfileUpload();
  const onUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = Array.from(e.target.files)[0];
        const imgUrl = await uploadFilesToS3(file);
        if (imgUrl) setValue(fieldName, imgUrl);
        e.target.value = '';
      }
    },
    [fieldName, setValue, uploadFilesToS3],
  );

  const onDelete = useCallback(() => {
    setTimeout(() => {
      setValue(fieldName, null);
    }, 50);
  }, [fieldName, setValue]);

  return (
    <Flex
      as="label"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
      position="relative"
    >
      {!filesValue ? (
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
            {...register(fieldName)}
            id={`inputFile-${fieldName}`}
            type="file"
            accept="image/png, image/jpg, image/svg"
            style={{ display: 'none' }}
            onChange={onUpload}
          />
        </Box>
      ) : (
        <>
          <Image
            src={filesValue}
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
