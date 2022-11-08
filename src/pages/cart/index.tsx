import { GetServerSideProps } from 'next';

import cookie from 'cookie';

import cartApi from '@apis/cart/CartApi';
import { GetCartReturnType } from '@apis/cart/CartApi.type';
import productApi from '@apis/product/ProductApi';

import CartPage from '@components/CartPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

import { QueryClient, dehydrate } from '@tanstack/react-query';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const myCookie = cookie.parse((ctx.req && ctx.req.headers.cookie) || '');
  const userId: string = myCookie['@id'];
  await queryClient.prefetchQuery(['get-cart'], () => cartApi.getCart(userId));
  const data = (
    queryClient.getQueryData(['get-cart']) as GetCartReturnType[]
  )[0].cartitem;
  await Promise.all(
    data.map(async ({ productId }) => {
      await queryClient.prefetchQuery(['product-by-id', productId], () =>
        productApi.getProductById(productId),
      );
    }),
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const Cart = () => {
  return <HomeLayout content={<CartPage />} />;
};

export default Cart;
