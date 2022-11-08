import React from 'react';

import { Box } from '@chakra-ui/react';

import { useGetCartQuery } from '@apis/cart/CartApi.query';

import ItemExistComponent from '@components/CartPage/_fragments/ItemExistComponent';
import NoItemComponent from '@components/CartPage/_fragments/NoItemComponent';

import { getId } from '@utils/cookie/id';

const CartPage = () => {
  const myId = getId();

  const { data: cart } = useGetCartQuery({
    variables: myId as string,
  });

  return (
    <Box my="80px">
      {cart && cart[0].cartitem.length !== 0 ? (
        <ItemExistComponent items={cart[0].cartitem} />
      ) : (
        <NoItemComponent />
      )}
    </Box>
  );
};

export default CartPage;
