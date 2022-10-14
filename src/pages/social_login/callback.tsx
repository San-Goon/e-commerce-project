import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { usePostSocialLoginMutation } from '@apis/user/UserApi.mutation';

import { TokenType, setToken } from '@utils/cookie/token';

const Callback = () => {
  const router = useRouter();
  const { data, mutate } = usePostSocialLoginMutation();

  React.useEffect(() => {
    if (router.query) {
      mutate({
        code: router.query.code as string,
        state: router.query.state as string,
      });
    }
  }, [mutate, router.query]);

  useEffect(() => {
    if (data) {
      if (data.isRegister) {
        setToken(data as TokenType);
        router.push('/');
      } else {
        router.push({
          pathname: '/signup',
          query: { token: data.socialToken },
        });
      }
    }
  }, [router, data]);
  return <div>callback</div>;
};

export default Callback;
