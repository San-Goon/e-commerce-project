import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { usePostSocialLoginMutation } from '@apis/user/UserApi.mutation';

const Callback = () => {
  const router = useRouter();
  const { data, mutate } = usePostSocialLoginMutation();

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
