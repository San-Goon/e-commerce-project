import { GetServerSideProps } from 'next';

import productApi from '@apis/product/ProductApi';

import DetailPage from '@components/DetailPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

import { QueryClient, dehydrate } from '@tanstack/react-query';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const { id } = ctx.query;
  await queryClient.prefetchQuery(['product-by-id', id], () =>
    productApi.getProductById(Number(id as string)),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const Detail = () => {
  return <HomeLayout content={<DetailPage />} />;
};

export default Detail;
