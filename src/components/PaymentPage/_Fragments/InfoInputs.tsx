import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import AddressSearcherModal from '@components/PaymentPage/_Fragments/AddressSearcherModal';
import { FormDataType } from '@components/PaymentPage/_hooks/usePaymentForm';
import FormHelper from '@components/common/FormHelper';
import Input from '@components/common/Input';

interface PropsType {
  field: 'user' | 'ship';
}

const InfoInputs = ({ field }: PropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formState } = useFormContext<FormDataType>();

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
            ? formState.errors.shipAddress?.message
            : formState.errors.userAddress?.message
        }
      >
        <Flex>
          <Input
            fieldName={`${field}Address`}
            placeholder=""
            isReadOnly={true}
          />
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
          fieldName={`${field}ExtraAddress`}
          placeholder="상세주소를 입력해주세요."
        />
      </FormHelper>
      <AddressSearcherModal
        address={`${field}Address`}
        addrPost={`${field}AddrPost`}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default InfoInputs;
