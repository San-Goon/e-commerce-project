import { useRouter } from 'next/router';
import React from 'react';

import { usePostSocialLoginMutation } from '@apis/user/UserApi.mutation';

import { SOCIAL } from '@constants/social';

const Callback = () => {
  const { query } = useRouter();
  console.log(query);
  const data = usePostSocialLoginMutation();

  React.useEffect(() => {
    if (query.code) {
      data.mutate({
        code: query.code,
        state: query.state,
      });
    }
  }, [query]);
  return <div>callback</div>;
};

export default Callback;
