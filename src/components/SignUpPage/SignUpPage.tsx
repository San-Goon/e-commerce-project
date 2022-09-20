import React from 'react';
import { Controller } from 'react-hook-form';

import { Box, Flex, Image, Input, Select, Text } from '@chakra-ui/react';

import useSignUpForm from '@components/SignUpPage/_hook/useSignInForm';
import FormHelper from '@components/common/FormHelper';
import Check from '@icons/System/Check';
import CircledCheck from '@icons/System/CircledCheck';
import FilledPlus from '@icons/System/FilledPlus';
import ProfileIcon from '@icons/System/Profile';

function SignUpPage() {
  const [agreeAll, setAgreeAll] = React.useState(false);
  const [serviceAgree, setServiceAgree] = React.useState(false);
  const [PIAgree, setPIAgree] = React.useState(false);
  const [marketingAgree, setMarketingAgree] = React.useState(false);

  const onClickAll = React.useCallback(() => {
    if (agreeAll) {
      setServiceAgree(false);
      setPIAgree(false);
      setMarketingAgree(false);
      setAgreeAll(false);
    } else {
      setServiceAgree(true);
      setPIAgree(true);
      setMarketingAgree(true);
      setAgreeAll(true);
    }
  }, [agreeAll]);

  const onClickService = React.useCallback(() => {
    setServiceAgree((prev) => !prev);
  }, []);

  const onClickPI = React.useCallback(() => {
    setPIAgree((prev) => !prev);
  }, []);

  const onClickMarketing = React.useCallback(() => {
    setMarketingAgree((prev) => !prev);
  }, []);

  React.useEffect(() => {
    if (serviceAgree && PIAgree && marketingAgree) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }, [serviceAgree, PIAgree, marketingAgree]);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useSignUpForm();
  const onSubmit = handleSubmit(
    ({ name, nickname, gender, phone, email, age }) => {
      console.log(name, nickname, gender, phone, email, age);
    },
  );

  console.log('Error!', errors);
  return (
    <Box as="form" m="16px" onSubmit={onSubmit}>
      <Image mt="16px" src="/images/signup/logo.png" />
      <Text fontWeight="700" fontSize="xl" mt="41px" mb="60px">
        회원가입
      </Text>
      <FormHelper mb="40px" label="회원정보입력">
        <Flex justifyContent="center" alignItems="center">
          <Box position="relative">
            <ProfileIcon boxSize="70px" />
            <FilledPlus
              boxSize="20px"
              color="primary.500"
              right="0"
              bottom="0"
              position="absolute"
            />
          </Box>
        </Flex>
      </FormHelper>

      <FormHelper
        mb="40px"
        label="이름"
        color="primary.500"
        errorText={errors.name?.message}
      >
        <Input
          {...register('name')}
          borderColor={errors.name && 'red'}
          focusBorderColor={errors.nickname ? 'red' : 'primary.500'}
          borderRadius="100px"
          autoComplete="off"
          color="black"
        />
      </FormHelper>

      <FormHelper
        mb="40px"
        label="닉네임"
        color="primary.500"
        errorText={errors.nickname?.message}
      >
        <Input
          {...register('nickname')}
          borderColor={errors.nickname && 'red'}
          focusBorderColor={errors.nickname ? 'red' : 'primary.500'}
          borderRadius="100px"
          autoComplete="off"
          color="black"
        />
      </FormHelper>

      <FormHelper
        mb="40px"
        label="핸드폰 번호"
        color="primary.500"
        errorText={errors.phone?.message}
      >
        <Input
          flexGrow={1}
          {...register('phone')}
          borderColor={errors.phone && 'red'}
          focusBorderColor={errors.nickname ? 'red' : 'primary.500'}
          borderRadius="100px"
          autoComplete="off"
          color="black"
        />
      </FormHelper>

      <FormHelper
        mb="40px"
        label="이메일 주소"
        color="primary.500"
        errorText={errors.email?.message}
      >
        <Input
          {...register('email')}
          borderColor={errors.email && 'red'}
          focusBorderColor={errors.nickname ? 'red' : 'primary.500'}
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
        render={({ field: { onChange } }) => (
          <FormHelper
            mb="40px"
            label="성별"
            color="primary.500"
            errorText={errors.gender?.message}
          >
            <Select
              variant="flushed"
              placeholder=""
              onChange={onChange}
              focusBorderColor="primary.500"
              color="black"
            >
              <option value="남">남</option>
              <option value="여">여</option>
            </Select>
          </FormHelper>
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field: { onChange } }) => (
          <FormHelper
            mb="40px"
            label="연령대"
            color="primary.500"
            errorText={errors.age?.message}
          >
            <Select
              variant="flushed"
              placeholder=""
              onChange={onChange}
              focusBorderColor="primary.500"
              color="black"
            >
              <option value="teens">10대</option>
              <option value="twenties">20대</option>
              <option value="thirties">30대</option>
              <option value="forties">40대</option>
              <option value="fifties">50대</option>
              <option value="sixties">60대</option>
              <option value="seventies">70대</option>
              <option value="eighties">80대</option>
              <option value="etc">그 외</option>
            </Select>
          </FormHelper>
        )}
      />
      <Text fontWeight="700" fontSize="md" mt="80px" mb="40px">
        이용약관동의
      </Text>

      <Box>
        <Flex
          h="40px"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="2px"
          borderColor="primary.500"
        >
          <Text color="primary.500" fontWeight="700" fontSize="md">
            아래 약관에 모두 동의합니다.
          </Text>
          <CircledCheck
            boxSize="24px"
            color={agreeAll ? 'primary.500' : '#CBCED6'}
            onClick={onClickAll}
            cursor="pointer"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" h="50px">
          <Text
            color="gray.600"
            textDecor="underline"
            fontWeight="400"
            fontSize="sm"
          >
            서비스 이용을 위한 필수약관 동의
          </Text>
          <Check
            boxSize="24px"
            color={serviceAgree ? 'primary.500' : '#CBCED6'}
            onClick={onClickService}
            cursor="pointer"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" h="50px">
          <Text
            color="gray.600"
            textDecor="underline"
            fontWeight="400"
            fontSize="sm"
          >
            개인정보수집 및 이용, 제3자 제공 동의
          </Text>
          <Check
            boxSize="24px"
            color={PIAgree ? 'primary.500' : '#CBCED6'}
            onClick={onClickPI}
            cursor="pointer"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" h="50px">
          <Text
            color="gray.600"
            textDecor="underline"
            fontWeight="400"
            fontSize="sm"
          >
            마케팅 정보 수신 및 맞춤형 광고 동의(선택)
          </Text>
          <Check
            boxSize="24px"
            color={marketingAgree ? 'primary.500' : '#CBCED6'}
            onClick={onClickMarketing}
            cursor="pointer"
          />
        </Flex>
      </Box>

      <Flex justifyContent="center" alignItems="center" mt="80px">
        <Box
          type="submit"
          as="button"
          height="50px"
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          px="125.5px"
          borderRadius="100px"
          fontSize="16px"
          fontWeight="700"
          bg="primary.500"
          color="white"
          _hover={{ bg: '#ebedf0' }}
          _active={{
            bg: '#dddfe2',
            transform: 'scale(0.98)',
            borderColor: '#bec3c9',
          }}
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
          }}
        >
          회원가입완료
        </Box>
      </Flex>
    </Box>
  );
}

export default SignUpPage;
