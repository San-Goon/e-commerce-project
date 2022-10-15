import Link from 'next/link';

import {
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react';

const DetailModal = ({ isOpen, onClose }: Omit<ModalProps, 'children'>) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Center flexDir="column">
            <Text mt="110px" fontSize="20px" fontWeight="700">
              장바구니에 상품이 담겼습니다.
            </Text>
            <Flex mt="80px" w="100%" mb="30px" justifyContent="space-between">
              <Link href="/cart" passHref>
                <Button colorScheme="primary" w="45%" variant="outline">
                  장바구니 이동
                </Button>
              </Link>
              <Button colorScheme="primary" w="45%" onClick={onClose}>
                쇼핑 계속하기
              </Button>
            </Flex>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailModal;
