import React from 'react';

import { Box, Button, Center, Divider, Flex, Text } from '@chakra-ui/react';

import CheckBox from '@components/common/CheckBox';
import ItemExistComponent from "@components/CartPage/_fragments/ItemExistComponent";
import NoItemComponent from "@components/CartPage/_fragments/NoItemComponent";

const CART_DATA = [{}];

const ITEM_DATA = [
  {
    id: 0,
    name: '바스 & 샴푸',
    description: '??',
    price: 27000,
    capacity: 120,
  },
];

const CartPage = () => {
  return (
    <Box my="80px">
      {/*<ItemExistComponent />*/}
      <NoItemComponent />
    </Box>
  );
};

export default CartPage;
