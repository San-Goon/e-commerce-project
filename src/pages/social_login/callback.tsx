import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { usePostSocialLoginMutation } from '@apis/user/UserApi.mutation';

import { setToken } from '@utils/cookie/token';

const Callback = () => {
  const router = useRouter();
  const { data, mutate } = usePostSocialLoginMutation();
  console.log(data);

  console.log(router.query);

  React.useEffect(() => {
    if (router.query.code) {
      mutate({
        code: router.query.code,
        state: router.query.state,
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (data) {
      setToken(data.data);
      if (data.data.isRegister) {
        router.push('/');
      } else {
        router.push({
          pathname: '/signup',
          query: { token: data.data.socialToken },
        });
      }
    }
  }, [data]);
  return <div>callback</div>;
};

export default Callback;
