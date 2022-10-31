import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, Flex, Select, Text } from '@chakra-ui/react';

import { GetMeReturnType } from '@apis/user/UserApi.type';

import FormHelper from '@components/common/FormHelper';
import Input from '@components/common/Input';
import ProfileImageUploader from '@components/common/ProfileImageUploader';

interface PropsType {
  data?: GetMeReturnType;
}

const InfoForm = ({ data }: PropsType) => {
  const { formState, control, setValue } = useFormContext();
  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('nickname', data.nickname);
      setValue('phone', data.phone);
      setValue('email', data.email);
      setValue('age', data.age);
      setValue('gender', data.gender);
    }
  }, [data, setValue]);
  return (
    <>
      <FormHelper mb="40px" label="회원정보입력">
        <Flex justifyContent="center" alignItems="center">
          <Box position="relative">
            <ProfileImageUploader />
          </Box>
        </Flex>
      </FormHelper>

      <FormHelper
        mb="40px"
        label="이름"
        color="primary.500"
        errorText={formState.errors.name?.message}
      >
        <Input
          fieldName="name"
          borderColor={formState.errors.name && 'red'}
          focusBorderColor={formState.errors.nickname ? 'red' : 'primary.500'}
          borderRadius="100px"
          autoComplete="off"
          color="black"
        />
      </FormHelper>

      <FormHelper
        mb="40px"
        label="닉네임"
        color="primary.500"
        errorText={formState.errors.nickname?.message}
      >
        <Input
          fieldName="nickname"
          borderColor={formState.errors.nickname && 'red'}
          focusBorderColor={formState.errors.nickname ? 'red' : 'primary.500'}
          borderRadius="100px"
          autoComplete="off"
          color="black"
        />
      </FormHelper>

      <FormHelper
        mb="40px"
        label="핸드폰 번호"
        color="primary.500"
        errorText={formState.errors.phone?.message}
      >
        <Input
          flexGrow={1}
          fieldName="phone"
          borderColor={formState.errors.phone && 'red'}
          focusBorderColor={formState.errors.nickname ? 'red' : 'primary.500'}
          borderRadius="100px"
          autoComplete="off"
          color="black"
        />
      </FormHelper>

      <FormHelper
        mb="40px"
        label="이메일 주소"
        color="primary.500"
        errorText={formState.errors.email?.message}
      >
        <Input
          fieldName="email"
          borderColor={formState.errors.email && 'red'}
          focusBorderColor={formState.errors.nickname ? 'red' : 'primary.500'}
          borderRadius="100px"
          autoComplete="off"
          color="black"
        />
      </FormHelper>

      <Text fontWeight="700" fontSize="md" mt="80px" mb="40px">
        추가정보입력(선택)
      </Text>

      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <FormHelper
            mb="40px"
            label="성별"
            color="primary.500"
            errorText={formState.errors.gender?.message}
          >
            <Select
              variant="flushed"
              placeholder=""
              value={value}
              onChange={onChange}
              focusBorderColor="primary.500"
              color="black"
            >
              <option value="male">남</option>
              <option value="female">여</option>
            </Select>
          </FormHelper>
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field: { onChange, value } }) => (
          <FormHelper
            mb="40px"
            label="연령대"
            color="primary.500"
            errorText={formState.errors.age?.message}
          >
            <Select
              variant="flushed"
              placeholder=""
              value={value}
              onChange={onChange}
              focusBorderColor="primary.500"
              color="black"
            >
              <option value={10}>10대</option>
              <option value={20}>20대</option>
              <option value={30}>30대</option>
              <option value={40}>40대</option>
              <option value={50}>50대</option>
              <option value={60}>60대</option>
            </Select>
          </FormHelper>
        )}
      />
    </>
  );
};

export default InfoForm;
