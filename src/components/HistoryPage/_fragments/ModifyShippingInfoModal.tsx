import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

import ModifyShippingInfoButtons from '@components/HistoryPage/_fragments/ModifyShippingInfoButtons';
import ModifyShippingInfoSection from '@components/HistoryPage/_fragments/ModifyShippingInfoSection';

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const ModifyShippingInfoModal = ({ isOpen, onClose, orderId }: PropsType) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <ModifyShippingInfoSection orderId={orderId} />
          <ModifyShippingInfoButtons orderId={orderId} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModifyShippingInfoModal;
