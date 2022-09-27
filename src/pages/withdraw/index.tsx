import Head from 'next/head';

import WithdrawPage from '@components/WithdrawPage';
import HomeLayout from "@components/common/@Layout/HomeLayout";

const Withdraw = () => {
  return (
    <>
      <Head>
        <title>회원탈퇴</title>
      </Head>
      <HomeLayout content={<WithdrawPage />}/>
    </>
  );
};

export default Withdraw;

