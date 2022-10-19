import { NextRouter } from 'next/router';
import { useCallback } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface PropsType {
  router: NextRouter;
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal = ({ router, isOpen, onClose }: PropsType) => {
  const onClickConfirm = useCallback(() => {
    onClose();
    router.push('/');
  }, [onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textStyle="md" fontWeight="700">
            회원가입에 성공했습니다!
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

export default SignUpModal;
