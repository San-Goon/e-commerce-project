import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';

import cartApi from '@apis/cart/CartApi';
import { useGetCartQuery } from '@apis/cart/CartApi.query';
import { useGetMeQuery } from '@apis/user/UserApi.query';

import ItemExistComponent from '@components/CartPage/_fragments/ItemExistComponent';
import NoItemComponent from '@components/CartPage/_fragments/NoItemComponent';

// const ITEM_DATA = [
//   {
//     id: 0,
//     name: '바스 & 샴푸',
//     description: '??',
//     price: 27000,
//     capacity: 120,
//   },
// ];

const CartPage = () => {
  const [items, setItems] = useState([]);
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
