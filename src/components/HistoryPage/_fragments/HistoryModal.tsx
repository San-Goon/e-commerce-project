import { useCallback } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { usePatchOrderShippingStatus } from '@apis/order/OrderApi.mutation';

import CancelDoneModal from '@components/HistoryPage/_fragments/CancelDoneModal';

import { useQueryClient } from '@tanstack/react-query';

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
}

const HistoryModal = ({ isOpen, onClose, userId }: PropsType) => {
  const queryClient = useQueryClient();

  const {
    isOpen: isOpenCancelDone,
    onOpen: onOpenCancelDone,
    onClose: onCloseCancelDone,
  } = useDisclosure();

  const { mutate: cancelMutate } = usePatchOrderShippingStatus({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-status']);
        onOpenCancelDone();
      },
    },
  });

  const onClickConfirm = useCallback(() => {
    onClose();
    cancelMutate({
      userId: userId as number,
      body: { shippingStatus: 'CANCELED' },
    });
  }, [cancelMutate, onClose, userId]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text textStyle="md" fontWeight="700">
              주문취소 하시겠습니까?
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
      <CancelDoneModal isOpen={isOpenCancelDone} onClose={onCloseCancelDone} />
    </>
  );
};

export default HistoryModal;
