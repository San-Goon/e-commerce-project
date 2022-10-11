import React, { useState } from 'react';

import { Box, Checkbox, Flex, Image, Text } from '@chakra-ui/react';

import { usePatchCartItemMutation } from '@apis/cart/CartApi.mutation';
import { useGetProductByIdQuery } from '@apis/product/ProductApi.query';

import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '@utils/format';
import { CartItem, IProduct } from '@utils/types';

import { XIcon } from '../../../generated/icons/MyIcons';

interface IProps {
  item: CartItem;
  index: number;
  priceList: number[];
  setPriceList: React.Dispatch<React.SetStateAction<number[]>>;
  checked: number[];
  setChecked: React.Dispatch<React.SetStateAction<number[]>>;
  deleteMutate: UseMutateFunction<any, any, any, unknown>;
}

const ShowItemComponent = ({
  item,
  index,
  priceList,
  setPriceList,
  checked,
  setChecked,
  deleteMutate,
}: IProps) => {
  const [itemData, setItemData] = useState<IProduct | undefined>(undefined);
  const queryClient = useQueryClient();
  const { mutate: patchMutate } = usePatchCartItemMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['me']);
      },
      onError: (error) => {
        console.error(error);
      },
    },
  });
  useGetProductByIdQuery({
    variables: item.productId.toString(),
    options: {
      onSuccess: (data) => {
        setItemData(data);
      },
    },
  });

  const onClickX = () => {
    deleteMutate(item.id);
  };

  const onChangeCheckbox = () => {
    let tempCheck = [...checked];
    const tempPrice = [...priceList];
    if (tempCheck.includes(item.id)) {
      tempCheck = tempCheck.filter((data) => data !== item.id);
      tempPrice[index] = 0;
    } else {
      tempCheck.push(item.id);
      tempPrice[index] = itemData!.price * item.count;
    }
    setChecked(tempCheck);
    setPriceList(tempPrice);
  };

  const onClickMinus = () => {
    const tempPrice = [...priceList];
    if (item.count > 1) {
      if (tempPrice[index] && itemData) {
        tempPrice[index] -= itemData.price;
        setPriceList(tempPrice);
      }
      patchMutate({ id: item.id, count: item.count + 1 });
    }
  };

  const onClickPlus = () => {
    const tempPrice = [...priceList];
    if (tempPrice[index] && itemData) {
      tempPrice[index] += itemData.price;
      setPriceList(tempPrice);
    }
    patchMutate({ id: item.id, count: item.count + 1 });
  };

  return (
    <Box m="16px">
      {itemData && (
        <>
          <Flex mb="15px">
            <Checkbox
              colorScheme="primary"
              isChecked={checked.includes(item.id)}
              onChange={onChangeCheckbox}
            />
            <Box bg="gray.100" ml="10px">
              <Image src={itemData.photo} boxSize="90px" />
            </Box>
            <Box ml="10px" textStyle="md">
              <Text fontWeight="700">{itemData.name}</Text>
              <Text color="gray.600">{`${itemData.name} | ${itemData.capacity}ml`}</Text>
              <Text color="primary.500" fontWeight="700">
                {formatPrice(itemData.price)}원
              </Text>
            </Box>
            <XIcon
              boxSize="20px"
              cursor="pointer"
              onClick={onClickX}
              ml="auto"
            />
          </Flex>
          <Box bg="gray.200" p="10px" ml="30px">
            <Text textStyle="md" color="gray.600">
              {itemData.name}
            </Text>
            <Flex justifyContent="space-between">
              <Flex textAlign="center" bg="white">
                <Box
                  boxSize="25px"
                  border="1px"
                  borderColor="gray.300"
                  onClick={onClickMinus}
                  cursor="pointer"
                >
                  -
                </Box>
                <Box boxSize="25px" border="1px" borderColor="gray.300">
                  {item.count}
                </Box>
                <Box
                  boxSize="25px"
                  border="1px"
                  borderColor="gray.300"
                  onClick={onClickPlus}
                  cursor="pointer"
                >
                  +
                </Box>
              </Flex>
              <Text textStyle="md" color="gray.600" fontWeight="700">
                {formatPrice(itemData.price * item.count)}원
              </Text>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ShowItemComponent;
