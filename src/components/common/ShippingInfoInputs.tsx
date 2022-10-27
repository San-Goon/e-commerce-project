import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { PaymentFormDataType } from '@components/PaymentPage/_hooks/usePaymentForm';
import AddressSearcherModal from '@components/common/AddressSearcherModal';
import FormHelper from '@components/common/FormHelper';
import Input from '@components/common/Input';

interface PropsType {
  field: 'user' | 'ship';
}

const ShippingInfoInputs = ({ field }: PropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formState } = useFormContext<PaymentFormDataType>();

  return (
    <>
      <FormHelper
        mb="50px"
        label="이름"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={
          field === 'ship'
            ? formState.errors.shipName?.message
            : formState.errors.userName?.message
        }
      >
        <Input fieldName={`${field}Name`} placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="핸드폰번호"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={
          field === 'ship'
            ? formState.errors.shipPhone?.message
            : formState.errors.userPhone?.message
        }
      >
        <Input fieldName={`${field}Phone`} placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="주소"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={
          field === 'ship'
            ? formState.errors.shipAddr?.message
            : formState.errors.userAddr?.message
        }
      >
        <Flex>
          <Input fieldName={`${field}Addr`} placeholder="" isReadOnly={true} />
          <Button
            w="30%"
            ml="10px"
            borderRadius="5px"
            onClick={onOpen}
            colorScheme="primary"
          >
            주소검색
          </Button>
        </Flex>
        <Input
          mt="10px"
          fieldName={`${field}AddrDetail`}
          placeholder="상세주소를 입력해주세요."
        />
      </FormHelper>
      <AddressSearcherModal
        addr={`${field}Addr`}
        addrPost={`${field}AddrPost`}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ShippingInfoInputs;
