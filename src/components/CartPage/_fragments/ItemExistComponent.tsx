import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

import * as _ from 'lodash';

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
import { useGetProductsByIdQueries } from '@apis/product/ProductApi.query';

import ShowItemComponent from '@components/CartPage/_fragments/ShowItemComponent';

import { useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '@utils/format';
import { CartItem } from '@utils/types';

interface IProps {
  items: CartItem[];
}

const ItemExistComponent = ({ items }: IProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [checked, setChecked] = useState<boolean[]>([]);
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useDeleteCartItemMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-cart']);
      },
    },
  });

  const products = Object.values(
    useGetProductsByIdQueries(items.map((item) => item.productId.toString())),
  );

  const productsList = useMemo(() => {
    const returnArr = [];
    for (let i = 0; i < products.length; i++) {
      const mergedObj = _.merge((products[i] as any).data, items[i]);
      returnArr.push(mergedObj);
    }
    return returnArr;
  }, [products, items]);

  const allChecked = useMemo(() => {
    return checked.every((v) => v);
  }, [checked]);

  const onChangeCheckAll = () => {
    if (allChecked) {
      for (let i = 0; i < items.length; i++) {
        setChecked(Array(items.length).fill(false));
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        setChecked(Array(items.length).fill(true));
      }
    }
  };

  const productIdsForQuery = useMemo(() => {
    let temp = '';
    for (let i = 0; i < items.length; i++) {
      if (checked[i]) {
        temp += `${items[i].productId}n`;
      }
    }
    return temp;
  }, [checked, items]);

  const onClickDelete = () => {
    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) {
        deleteMutate(productsList[i].id.toString());
      }
    }
    setChecked(Array(items.length).fill(false));
  };

  useEffect(() => {
    setChecked(Array(items.length).fill(false));
  }, [items]);

  useEffect(() => {
    let totalPrice = 0;
    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) {
        totalPrice += productsList[i].price * productsList[i].count;
      }
    }
    setTotalPrice(totalPrice);
  }, [checked, productsList]);

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
      {productsList.map((product, index) => {
        return (
          <React.Fragment key={index}>
            <ShowItemComponent
              product={product}
              index={index}
              deleteMutate={deleteMutate}
              checked={checked}
              setChecked={setChecked}
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
        <Link
          href={{
            pathname: '/payment',
            query: { ids: productIdsForQuery },
          }}
        >
          <Button colorScheme="primary">결제하기</Button>
        </Link>
      </Center>
    </>
  );
};

export default ItemExistComponent;
