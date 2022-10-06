import { GetStaticProps } from 'next';

import productApi from '@apis/product/ProductApi';

import DetailPage from '@components/DetailPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

import { IProduct } from '@utils/types';

export async function getStaticPaths() {
  const productsList = await productApi.getProductList();
  const paths = [];
  for (let i = 0; i < productsList.results[0].id; i++) {
    paths.push({ params: { id: `${i}` } });
  }
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productData = await productApi.getProductById(params?.id as string);
  return { props: { productData } };
};

interface IProps {
  productData: IProduct;
}

const Detail = ({ productData }: IProps) => {
  return <HomeLayout content={<DetailPage productData={productData} />} />;
};

export default Detail;
