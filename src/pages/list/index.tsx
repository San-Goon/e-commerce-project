import { GetStaticProps } from 'next';
import Head from 'next/head';

import productApi from '@apis/product/ProductApi';

import ListPage from '@components/ListPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

import { IProductsList } from '@utils/types';

export const getStaticProps: GetStaticProps = async () => {
  const initialData = await productApi.getProductList();
  return {
    props: { initialData },
  };
};

interface IProps {
  initialData: IProductsList;
}

const list = ({ initialData }: IProps) => {
  return (
    <>
      <Head>
        <title>상품 리스트</title>
      </Head>
      <HomeLayout content={<ListPage initialData={initialData} />} />
    </>
  );
};

export default list;
