import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';

import cartApi from '@apis/cart/CartApi';
import { useGetMeQuery } from '@apis/user/UserApi.query';

import ItemExistComponent from '@components/CartPage/_fragments/ItemExistComponent';
import NoItemComponent from '@components/CartPage/_fragments/NoItemComponent';

import { CartItem } from '@utils/types';

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  useGetMeQuery({
    options: {
      onSuccess: async ({ data }) => {
        const cart = await cartApi.getCart(data.id.toString());
        setItems(cart[0].cartitem);
      },
    },
  });

  return (
    <Box my="80px">
      {items.length !== 0 ? (
        <ItemExistComponent items={items} />
      ) : (
        <NoItemComponent />
      )}
    </Box>
  );
};

export default CartPage;
