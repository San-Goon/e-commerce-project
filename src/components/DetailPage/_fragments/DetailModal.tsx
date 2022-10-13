import Link from 'next/link';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react';

const DetailModal = ({ isOpen, onClose }: Omit<ModalProps, 'children'>) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textStyle="md" fontWeight="700">
            장바구니에 상품이 담겼습니다.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Link href="/cart" passHref>
            <Button colorScheme="primary" variant="outline">
              장바구니 이동
            </Button>
          </Link>
          <Button colorScheme="primary" onClick={onClose}>
            쇼핑 계속하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailModal;
