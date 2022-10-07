import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';

import FormHelper from '@components/common/FormHelper';
import Input from '@components/common/Input';
import {useRouter} from "next/router";

const WithdrawPageView = ({ onSubmit }: any) => {
  const { formState, control } = useFormContext();
  const { query } = useRouter();

  return (
    <Box mt="130px">
      <Text textStyle="lg" fontWeight="700" ml="16px">
        회원탈퇴
      </Text>
      <Text mt="80px" p="18px" bg="gray.100" textStyle="md">
        회원 탈퇴 시 개인 정보 및 인코스런에서 만들어진 모든 데이터는
        삭제됩니다. 한 번 삭제된 정보는 복구가 불가능합니다.
      </Text>
      <Text my="14px" fontStyle="md" fontWeight="700" ml="16px">
        회원 정보
      </Text>
      <Flex mb="20px" ml="16px">
        <Box>
          <Text mt="15px" mb="10px">
            이름
          </Text>
          <Text mb="10px">핸드폰 번호</Text>
          <Text>이메일 주소</Text>
        </Box>
        <Box ml="24px" textColor="gray.700">
          <Text mt="15px" mb="10px">
            {query.name}
          </Text>
          <Text mb="10px">{query.phone}</Text>
          <Text>{query.email}</Text>
        </Box>
      </Flex>
      <Box w="100vw" h="10px" backgroundColor="gray.100" />
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
                      <Input fieldName="etcReason" w="90%" />
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
      <Flex mt="80px" mb="30px" mx="16px">
        <Button colorScheme="primary" variant="outline">
          취소
        </Button>
        <Button colorScheme="primary">탈퇴하기</Button>
      </Flex>
    </Box>
  );
};

export default WithdrawPageView;
