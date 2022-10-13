import { GetStaticProps } from 'next';

import productApi from '@apis/product/ProductApi';

import DetailPage from '@components/DetailPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

import { QueryClient, dehydrate } from '@tanstack/react-query';

export async function getStaticPaths() {
  const productsList = await productApi.getProductList();
  const paths = [];
  for (let i = 0; i <= productsList.results[0].id; i++) {
    paths.push({ params: { id: `${i}` } });
  }
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['product-by-id', params?.id], () =>
    productApi.getProductById(params?.id as string),
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
