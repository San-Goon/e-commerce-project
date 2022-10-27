import React from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';

import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { PaymentFormDataType } from '@components/PaymentPage/_hooks/usePaymentForm';

interface PropsType {
  addr: 'userAddr' | 'shipAddr';
  addrPost: 'userAddrPost' | 'shipAddrPost';
  isOpen: boolean;
  onClose: () => void;
}

const AddressSearcherModal = ({
  addr,
  addrPost,
  isOpen,
  onClose,
}: PropsType) => {
  const { setValue } = useFormContext<PaymentFormDataType>();
  const handleCompleteAddressSearcher = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setValue(addr, fullAddress);
    setValue(addrPost, data.zonecode);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <DaumPostcode
            onComplete={handleCompleteAddressSearcher}
            onClose={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddressSearcherModal;
