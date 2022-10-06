import Head from 'next/head';
import React from 'react';

import { useGetMeQuery } from '@apis/user/UserApi.query';

import SignUpPage from '@components/SignUpPage';

function SignUp() {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <SignUpPage />
    </>
  );
}

export default SignUp;
