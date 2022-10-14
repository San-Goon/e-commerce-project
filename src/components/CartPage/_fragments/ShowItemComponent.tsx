import React from 'react';

import { Box, Checkbox, Flex, Image, Text } from '@chakra-ui/react';

import { usePatchCartItemMutation } from '@apis/cart/CartApi.mutation';
import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';

import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '@utils/format';
import { CartItem } from '@utils/types';

import { XIcon } from '../../../generated/icons/MyIcons';

interface IProps {
  product: GetProductByIdReturnType & CartItem;
  index: number;
  deleteMutate: UseMutateFunction<void, any, string, unknown>;
  checked: boolean[];
  setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const ShowItemComponent = ({
  product,
  index,
  deleteMutate,
  checked,
  setChecked,
}: IProps) => {
  const queryClient = useQueryClient();
  const { mutate: patchMutate } = usePatchCartItemMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-cart']);
      },
      onError: (error) => {
        console.error(error);
      },
    },
  });

  const onClickX = () => {
    const tempArr = [...checked];
    tempArr[index] = false;
    setChecked(tempArr);
    deleteMutate(product.id.toString());
  };

  const onChangeCheckbox = () => {
    const tempArr = [...checked];
    tempArr[index] = !tempArr[index];
    setChecked(tempArr);
  };

  const onClickMinus = () => {
    if (product.count > 1) {
      patchMutate({ id: product.id.toString(), count: product.count - 1 });
    }
  };

  const onClickPlus = () => {
    patchMutate({ id: product.id.toString(), count: product.count + 1 });
  };

  return (
    <Box m="16px">
      {product && (
        <>
          <Flex mb="15px">
            <Checkbox
              colorScheme="primary"
              isChecked={checked[index]}
              onChange={onChangeCheckbox}
            />
            <Box bg="gray.100" ml="10px">
              <Image src={product.photo} boxSize="90px" />
            </Box>
            <Box ml="10px" textStyle="md">
              <Text fontWeight="700">{product.name}</Text>
              <Text color="gray.600">{`${product.name} | ${product.capacity}ml`}</Text>
              <Text color="primary.500" fontWeight="700">
                {formatPrice(product.price)}원
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
              {product.name}
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
                  {product.count}
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
                {formatPrice(product.price * product.count)}원
              </Text>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ShowItemComponent;
