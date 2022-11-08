import Link from 'next/link';
import { NextRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import {
  usePatchCartItemMutation,
  usePostCartItemMutation,
  usePostCartMutation,
} from '@apis/cart/CartApi.mutation';
import { useGetCartQuery } from '@apis/cart/CartApi.query';
import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';

import DetailModal from '@components/DetailPage/_fragments/DetailModal';

import { useQueryClient } from '@tanstack/react-query';
import { getId } from '@utils/cookie/id';
import { formatPrice } from '@utils/format';

interface PropsType {
  router: NextRouter;
  data: GetProductByIdReturnType;
  onClose: () => void;
  isOpen: boolean;
}

const DetailDrawer = ({ router, data, onClose, isOpen }: PropsType) => {
  const queryClient = useQueryClient();
  const { mutate: cartMutate } = usePostCartItemMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-cart']);
        onOpenModal();
      },
    },
  });
  const { mutate: patchMutate } = usePatchCartItemMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-cart']);
        onOpenModal();
      },
      onError: (error) => {
        console.error(error);
      },
    },
  });
  const { mutate: postCartMutate } = usePostCartMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-cart']);
        onOpenModal();
      },
    },
  });
  const [count, setCount] = useState(1);
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const myId = getId();

  const { data: cart } = useGetCartQuery({
    variables: myId as string,
  });

  useEffect(() => {
    if (cart) {
      if (cart.length === 0) {
        postCartMutate(Number(myId));
      }
    }
  }, [cart, myId, postCartMutate]);

  const onClickCart = () => {
    if (cart) {
      const cartItem = cart[0].cartitem.find((v) => v.productId === data.id);
      if (cartItem) {
        patchMutate({
          id: cartItem.id,
          count: cartItem.count + count,
        });
      } else {
        cartMutate({ productId: data.id, cartId: cart[0].id, count });
      }
    }
  };

  const onClickMinus = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const onClickPlus = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent
          pt="20px"
          borderRadius="20px 20px 0px 0px"
          boxShadow=" 0px 0px 10px rgba(26, 26, 26, 0.1)"
        >
          <DrawerBody>
            <Box bg="gray.200" p="10px">
              <Text textStyle="md" color="gray.600">
                {data.name}
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
                    {count}
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
                  {formatPrice(data.price * count)}원
                </Text>
              </Flex>
            </Box>
            <Flex justifyContent="space-between" mt="5px">
              <Text textStyle="md">
                총 수량{' '}
                <Text as="span" color="primary.500" fontWeight="700">
                  {count}
                </Text>{' '}
                개
              </Text>
              <Text textStyle="md">
                합계{' '}
                <Text as="span" fontWeight="700">
                  {formatPrice(data.price * count)}원
                </Text>
              </Text>
            </Flex>
            <Flex justifyContent="space-around" mt="15px" mb="30px">
              <Button
                colorScheme="primary"
                w="165px"
                h="50px"
                onClick={onClickCart}
              >
                장바구니
              </Button>
              <Link
                href={{
                  pathname: '/payment',
                  query: { id: router.query.id, count },
                }}
                passHref
              >
                <Button colorScheme="primary" w="165px" h="50px">
                  바로구매
                </Button>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <DetailModal isOpen={isOpenModal} onClose={onCloseModal} />
    </>
  );
};

export default DetailDrawer;
