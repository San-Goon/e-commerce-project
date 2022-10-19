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

const WithdrawModal = ({ isOpen, onClose }: Omit<ModalProps, 'children'>) => {
  const { push } = useRouter();
  const onClickConfirm = useCallback(() => {
    onClose();
    push('/');
    deleteToken();
  }, [onClose, push]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textStyle="md" fontWeight="700">
            탈퇴가 완료되었습니다.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" onClick={onClickConfirm}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawModal;
