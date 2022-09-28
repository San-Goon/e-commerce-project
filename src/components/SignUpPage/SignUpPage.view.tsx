import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import InfoForm from '@components/common/InfoForm';
import Check from '@icons/System/Check';
import CircledCheck from '@icons/System/CircledCheck';

function SignUpPageView({ onSubmit }: any) {
  const [agreeAll, setAgreeAll] = React.useState(false);
  const [serviceAgree, setServiceAgree] = React.useState(false);
  const [PIAgree, setPIAgree] = React.useState(false);
  const [marketingAgree, setMarketingAgree] = React.useState(false);

  // const [isAgree, setIsAgree] = React.useState({
  //   service: false,
  //   PI: false,
  //   marketing: false,
  // });

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

  return (
    <Box as="form" m="16px" onSubmit={onSubmit}>
      <Image mt="16px" src="/images/signup/logo.png" />
      <Text fontWeight="700" fontSize="xl" mt="41px" mb="60px">
        회원가입
      </Text>
      <InfoForm />
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

export default SignUpPageView;
