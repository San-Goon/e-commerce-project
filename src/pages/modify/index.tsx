import Head from 'next/head';

import ModifyPage from '@components/ModifyPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

const Modify = () => {
  return (
    <>
      <Head>
        <title>정보 수정</title>
      </Head>
      <HomeLayout content={<ModifyPage />} />
    </>
  );
};

export default Modify;
