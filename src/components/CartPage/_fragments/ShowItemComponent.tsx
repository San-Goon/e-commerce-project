import React, { useEffect, useState } from 'react';

import { Box, Checkbox, Flex, Image, Text } from '@chakra-ui/react';

import {
  useDeleteCartItemMutation,
  usePatchCartItemMutation,
} from '@apis/cart/CartApi.mutation';
import { useGetProductByIdQuery } from '@apis/product/ProductApi.query';

import { formatPrice } from '@utils/format';
import { CartItem, IProduct } from '@utils/types';

import { XIcon } from '../../../generated/icons/MyIcons';

interface IProps {
  item: CartItem;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const ShowItemComponent = ({ item, setTotalPrice }: IProps) => {
  const [itemData, setItemData] = useState<IProduct | undefined>(undefined);
  const [count, setCount] = useState(item.count);
  const { mutate: deleteMutate } = useDeleteCartItemMutation();
  const { mutate: patchMutate } = usePatchCartItemMutation();
  useGetProductByIdQuery({
    variables: item.productId.toString(),
    options: {
      onSuccess: (data) => {
        setItemData(data);
      },
    },
  });
  useEffect(() => {
    if (itemData) {
      setTotalPrice((prev) => prev + itemData.price * count);
    }
  }, [itemData]);

  const onClickX = () => {
    deleteMutate(item.id);
  };
  return (
    <Box>
      {itemData && (
        <>
          <Flex>
            <Checkbox colorScheme="primary" />
            <Box bg="gray.100">
              <Image src={itemData.photo} boxSize="90px" />
            </Box>
            <Box>
              <Text>{itemData.name}</Text>
              <Text>{`${itemData.name} | ${itemData.capacity}ml`}</Text>
              <Text>{formatPrice(itemData.price)}원</Text>
            </Box>
            <XIcon boxSize="20px" cursor="pointer" onClick={onClickX} />
          </Flex>
          <Box bg="gray.200" p="10px">
            <Text textStyle="md" color="gray.600">
              {itemData.name}
            </Text>
            <Flex justifyContent="space-between">
              <Flex textAlign="center" bg="white">
                <Box
                  boxSize="25px"
                  border="1px"
                  borderColor="gray.300"
                  onClick={() => {
                    if (count > 1) {
                      setCount((prev) => prev - 1);
                      setTotalPrice((prev) => prev - itemData.price);
                    }
                  }}
                  cursor="pointer"
                >
                  -
                </Box>
                <Box boxSize="25px" border="1px" borderColor="gray.300">
                  {count}
                </Box>
                <Box
                  boxSize="25px"
                  border="1px"
                  borderColor="gray.300"
                  onClick={() => {
                    setCount((prev) => prev + 1);
                    setTotalPrice((prev) => prev + itemData.price);
                  }}
                  cursor="pointer"
                >
                  +
                </Box>
              </Flex>
              <Text textStyle="md" color="gray.600" fontWeight="700">
                {formatPrice(itemData.price * count)}원
              </Text>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ShowItemComponent;
