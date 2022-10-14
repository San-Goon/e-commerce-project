import React from 'react';

import { Box } from '@chakra-ui/react';

import { useGetCartQuery } from '@apis/cart/CartApi.query';
import { useGetMeQuery } from '@apis/user/UserApi.query';

import ItemExistComponent from '@components/CartPage/_fragments/ItemExistComponent';
import NoItemComponent from '@components/CartPage/_fragments/NoItemComponent';

const CartPage = () => {
  const { data: me } = useGetMeQuery();

  const { data: cart } = useGetCartQuery({
    variables: me!.id.toString(),
    options: {
      enabled: !!me,
    },
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
