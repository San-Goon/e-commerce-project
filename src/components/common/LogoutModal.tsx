import { useRouter } from 'next/router';
import { useCallback } from 'react';

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

import { deleteToken } from '@utils/cookie/token';

const LogoutModal = ({ isOpen, onClose }: Omit<ModalProps, 'children'>) => {
  const router = useRouter();
  const onClickConfirm = useCallback(() => {
    deleteToken();
    router.push('/login');
  }, [router]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textStyle="md" fontWeight="700">
            로그아웃 하시겠습니까?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button colorScheme="primary" onClick={onClickConfirm}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
