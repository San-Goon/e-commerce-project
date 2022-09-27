import Head from 'next/head';

import ListPage from '@components/ListPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

const list = () => {
  return (
    <>
      <Head>
        <title>상품 리스트</title>
      </Head>
      <HomeLayout content={<ListPage />} />
    </>
  );
};

export default list;
