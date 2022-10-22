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

const CancelDoneModal = ({ isOpen, onClose }: Omit<ModalProps, 'children'>) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textStyle="md" fontWeight="700">
            주문취소가 완료되었습니다.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CancelDoneModal;
