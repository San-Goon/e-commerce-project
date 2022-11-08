import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

import { Button, Center, CircularProgress, Text } from '@chakra-ui/react';

import { usePostSocialLoginMutation } from '@apis/user/UserApi.mutation';
import { useGetMeQuery } from '@apis/user/UserApi.query';

import { setId } from '@utils/cookie/id';
import { TokenType, setToken } from '@utils/cookie/token';

interface PropsType {
  queries: {
    code: string;
    state: string;
  };
}

const CallbackPage = ({ queries }: PropsType) => {
  const router = useRouter();
  const {
    data: tokenData,
    mutate,
    isError: isMutateError,
    isSuccess: isSuccessMutate,
  } = usePostSocialLoginMutation({
    options: {
      onSuccess: (data) => {
        setToken(data as TokenType);
      },
    },
  });

  const { isError: isQueryError } = useGetMeQuery({
    options: {
      enabled: isSuccessMutate,
      onSuccess: (data) => {
        setId(data.id);
        {
          if (tokenData?.isRegister) {
            router.push('/');
          } else {
            router.push('/signup');
          }
        }
      },
    },
  });

  useEffect(() => {
    mutate({
      code: queries.code,
      state: queries.state,
    });
  }, [mutate, queries]);

  const onClickButton = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <Center minH="100vh" flexDir="column">
      {isMutateError || isQueryError ? (
        <>
          <Text textStyle="lg" mt="10px">
            로그인 정보 확인에 실패했습니다. 다시 시도해주세요.
          </Text>
          <Button colorScheme="primary" onClick={onClickButton} mt="30px">
            돌아가기
          </Button>
        </>
      ) : (
        <>
          <CircularProgress isIndeterminate size="100px" color="primary.500" />
          <Text textStyle="lg" mt="10px">
            로그인 정보를 확인중입니다.
          </Text>
        </>
      )}
    </Center>
  );
};

export default CallbackPage;
