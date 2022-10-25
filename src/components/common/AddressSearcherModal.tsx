import React from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';

import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { FormDataType } from '@components/PaymentPage/_hooks/usePaymentForm';

interface PropsType {
  address: 'userAddress' | 'shipAddress';
  addrPost: 'userAddrPost' | 'shipAddrPost';
  isOpen: boolean;
  onClose: () => void;
}

const AddressSearcherModal = ({
  address,
  addrPost,
  isOpen,
  onClose,
}: PropsType) => {
  const { setValue } = useFormContext<FormDataType>();
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
    setValue(address, fullAddress);
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
