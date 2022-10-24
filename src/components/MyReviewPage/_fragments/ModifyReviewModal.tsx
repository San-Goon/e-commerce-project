import React from 'react';

import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

import ModifyReviewButtons from '@components/MyReviewPage/_fragments/ModifyReviewButtons';
import ModifyReviewSection from '@components/MyReviewPage/_fragments/ModifyReviewSection';

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

const ModifyReviewModal = ({ isOpen, onClose, id }: PropsType) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <ModifyReviewSection id={id} />
          <ModifyReviewButtons id={id} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModifyReviewModal;
