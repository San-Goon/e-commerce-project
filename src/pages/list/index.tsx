import { GetServerSideProps } from 'next';
import Head from 'next/head';

import productApi from '@apis/product/ProductApi';

import ListPage from '@components/ListPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

import { QueryClient, dehydrate } from '@tanstack/react-query';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(['products-list'], () =>
    productApi.getProductList(),
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

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
