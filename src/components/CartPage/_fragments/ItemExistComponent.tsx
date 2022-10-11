import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react';

import { useDeleteCartItemMutation } from '@apis/cart/CartApi.mutation';

import ShowItemComponent from '@components/CartPage/_fragments/ShowItemComponent';

import { formatPrice } from '@utils/format';
import { CartItem } from '@utils/types';

interface IProps {
  items: CartItem[];
}

const ItemExistComponent = ({ items }: IProps) => {
  const [priceList, setPriceList] = useState<number[]>(
    Array(items.length).fill(0),
  );
  const [checked, setChecked] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { mutate: deleteMutate } = useDeleteCartItemMutation();

  useEffect(() => {
    setTotalPrice(priceList.reduce((a, b) => a + b));
  }, [priceList]);

  const allChecked = checked.length === items.length;
  const onChangeCheckAll = () => {
    if (allChecked) {
      setChecked([]);
    } else {
      const tempArr = [];
      for (const item of items) {
        tempArr.push(item.id);
      }
      setChecked(tempArr);
    }
  };
  const onClickDelete = () => {
    for (const id of checked) {
      deleteMutate(id);
    }
  };

  return (
    <>
      <Flex
        h="50px"
        mx="16px"
        justifyContent="space-between"
        alignItems="center"
        textColor="gray.600"
        textStyle="md"
      >
        <Checkbox
          colorScheme="primary"
          isChecked={allChecked}
          onChange={onChangeCheckAll}
        >
          모두 선택
        </Checkbox>
        <Text cursor="pointer" onClick={onClickDelete}>
          선택삭제
        </Text>
      </Flex>
      <Box w="100vw" h="10px" backgroundColor="gray.100" />
      {items.map((item, index) => {
        return (
          <React.Fragment key={item.id}>
            <ShowItemComponent
              item={item}
              index={index}
              priceList={priceList}
              setPriceList={setPriceList}
              checked={checked}
              setChecked={setChecked}
              deleteMutate={deleteMutate}
            />
            <Box w="100vw" h="10px" backgroundColor="gray.100" />
          </React.Fragment>
        );
      })}
      <Flex
        mx="16px"
        mt="20px"
        justifyContent="space-between"
        alignItems="center"
        textColor="gray.600"
        textStyle="md"
      >
        <Text>총 상품금액</Text>
        <Text>{formatPrice(totalPrice)}원</Text>
      </Flex>
      <Flex
        mx="16px"
        mt="10px"
        justifyContent="space-between"
        alignItems="center"
        textColor="gray.600"
        textStyle="md"
      >
        <Text>총 배송비</Text>
        <Text>{totalPrice < 30000 ? '3,000원' : '무료'}</Text>
      </Flex>
      <Divider my="20px" mx="16px" />
      <Flex
        my="20px"
        mx="16px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>결제금액</Text>
        <Text color="primary.500">
          {totalPrice < 30000
            ? formatPrice(totalPrice + 3000)
            : formatPrice(totalPrice)}
          원
        </Text>
      </Flex>
      <Center>
        <Button colorScheme="primary">결제하기</Button>
      </Center>
    </>
  );
};

export default ItemExistComponent;
