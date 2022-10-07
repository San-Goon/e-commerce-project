import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react';

import FormHelper from '@components/common/FormHelper';
import Input from '@components/common/Input';

const WithdrawForm = () => {
  const { formState, control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="reason"
        render={({ field: { value, onChange } }) => {
          return (
            <FormHelper my="14px" label="탈퇴 사유" textStyle="md" ml="16px">
              <RadioGroup onChange={onChange} colorScheme="primary">
                <Stack>
                  <Radio value="아이디 변경(재가입)">아이디 변경(재가입)</Radio>
                  <Radio value="낮은 구매 빈도">낮은 구매 빈도</Radio>
                  <Radio value="서비스 및 고객지원 불만족">
                    서비스 및 고객지원 불만족
                  </Radio>
                  <Radio value="타 브랜드 이용">타 브랜드 이용</Radio>
                  <Radio value="기타">기타</Radio>
                  {value === '기타' && (
                    <FormHelper errorText={formState.errors.etcReason?.message}>
                      <Input fieldName="additionalReason" w="90%" />
                    </FormHelper>
                  )}
                </Stack>
              </RadioGroup>
            </FormHelper>
          );
        }}
      />
      <Box w="100vw" h="10px" mb="14px" backgroundColor="gray.100" />
      <FormHelper
        mb="20px"
        label="인코스런을 입력해주세요."
        textStyle="md"
        mx="16px"
      >
        <Input fieldName="typo" w="90%" />
      </FormHelper>
    </>
  );
};

export default WithdrawForm;
