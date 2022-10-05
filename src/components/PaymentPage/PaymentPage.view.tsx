import React from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import {
  Controller,
  UseFormReturn,
  useFormContext,
} from 'react-hook-form';

import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { FormDataType } from '@components/PaymentPage/_hooks/usePaymentForm';
import FormHelper from '@components/common/FormHelper';
import Input from '@components/common/Input';

import { CreditCardIcon } from '../../generated/icons/MyIcons';

interface FormPageProps extends BoxProps {
  formData?: UseFormReturn<FormDataType>;
}

const PaymentPageView = ({ formData }: FormPageProps) => {
  const { formState, control, handleSubmit, setValue, getValues } =
    useFormContext();
  const {
    isOpen: isOpenUserAddressSearcher,
    onOpen: onOpenUserAddressSearcher,
    onClose: onCloseUserAddressSearcher,
  } = useDisclosure();
  const {
    isOpen: isOpenShipAddressSearcher,
    onOpen: onOpenShipAddressSearcher,
    onClose: onCloseShipAddressSearcher,
  } = useDisclosure();

  const handleCompleteUserAddressSearcher = (data: Address) => {
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

    setValue('userAddress', fullAddress);
  };

  const handleCompleteShipAddressSearcher = (data: Address) => {
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
    setValue('shipAddress', fullAddress);
  };

  const onSubmit = handleSubmit(
    ({
      userName,
      userPhone,
      userAddress,
      userExtraAddress,
      shipName,
      shipPhone,
      shipAddress,
      shipExtraAddress,
      orderMessage,
      method,
    }) => {
      console.log(
        `submitted: ${userName}, ${userPhone}, ${userAddress}, ${userExtraAddress}, ${shipName}, ${shipPhone}, ${shipAddress}, ${shipExtraAddress}, ${orderMessage}, ${method}`,
      );
    },
  );

  const onChangeSame = () => {
    setValue('shipName', getValues('userName'));
    setValue('shipPhone', getValues('userPhone'));
    setValue('shipAddress', getValues('userAddress'));
    setValue('shipExtraAddress', getValues('userExtraAddress'));
  };

  return (
    <Box mt="130px" px="16px" as="form" onSubmit={onSubmit}>
      <Text textStyle="lg" fontWeight="700">
        주문결제
      </Text>
      <Text mt="80px" textStyle="md" fontWeight="700">
        주문상품
      </Text>
      <Box h="80px">여기에 상품 넣어주세용</Box>
      <Text mt="46px" mb="40px" textStyle="md" fontWeight="700">
        주문자정보
      </Text>
      <FormHelper
        mb="50px"
        label="이름"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.userName?.message}
      >
        <Input fieldName="userName" placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="핸드폰번호"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.userPhone?.message}
      >
        <Input fieldName="userPhone" placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="주소"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.userAddress?.message}
      >
        <Flex>
          <Input fieldName="userAddress" placeholder="" isReadOnly={true} />
          <Button onClick={onOpenUserAddressSearcher}>주소검색</Button>
        </Flex>
        <Input
          mt="10px"
          fieldName="userExtraAddress"
          placeholder="상세주소를 입력해주세요."
        />
        <Modal
          isOpen={isOpenUserAddressSearcher}
          onClose={onCloseUserAddressSearcher}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <DaumPostcode
                onComplete={handleCompleteUserAddressSearcher}
                onClose={onCloseUserAddressSearcher}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </FormHelper>
      <Flex
        mt="50px"
        mb="40px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text textStyle="md" fontWeight="700">
          배송지 정보
        </Text>
        <Checkbox
          textStyle="md"
          color="gray.600"
          colorScheme="primary"
          onChange={onChangeSame}
        >
          주문자 정보와 동일
        </Checkbox>
      </Flex>

      <FormHelper
        mb="50px"
        label="이름"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.shipName?.message}
      >
        <Input fieldName="shipName" placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="핸드폰번호"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.shipPhone?.message}
      >
        <Input fieldName="shipPhone" placeholder="" />
      </FormHelper>

      <FormHelper
        mb="50px"
        label="주소"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.shipAddress?.message}
      >
        <Flex>
          <Input fieldName="shipAddress" placeholder="" isReadOnly={true} />
          <Button onClick={onOpenShipAddressSearcher}>주소검색</Button>
        </Flex>
        <Input
          mt="10px"
          fieldName="shipExtraAddress"
          placeholder="상세주소를 입력해주세요."
        />
        <Modal
          isOpen={isOpenShipAddressSearcher}
          onClose={onCloseShipAddressSearcher}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <DaumPostcode
                onComplete={handleCompleteShipAddressSearcher}
                onClose={onCloseShipAddressSearcher}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </FormHelper>
      <FormHelper
        mb="50px"
        label="배송요청사항"
        color="primary.500"
        labelProps={{ fontSize: '12px' }}
        errorText={formState.errors.orderMessage?.message}
      >
        <Input fieldName="orderMessage" placeholder="" />
      </FormHelper>
      <Divider />
      <Text mt="40px" mb="10px" textStyle="md" fontWeight="700">
        결제수단
      </Text>
      <Controller
        control={control}
        name="method"
        render={({ field: { onChange, value } }) => {
          return (
            <RadioGroup onChange={onChange} value={value}>
              <Stack direction="row">
                <Radio
                  defaultChecked
                  textStyle="md"
                  colorScheme="primary"
                  value="CARD"
                >
                  <CreditCardIcon boxSize="50px" mr="10px" />
                  신용카드 결제
                </Radio>
              </Stack>
            </RadioGroup>
          );
        }}
      />

      <Text mt="30px" mb="40px" textStyle="md" fontWeight="700">
        최종 결제금액
      </Text>
      <Flex justifyContent="space-between">
        <Text textStyle="md" color="gray.600">
          총 상품금액
        </Text>
        <Text textStyle="md" color="gray.600">
          얼마입니당
        </Text>
      </Flex>
      <Flex mt="10px" mb="20px" justifyContent="space-between">
        <Text textStyle="md" color="gray.600">
          총 배송비
        </Text>
        <Text textStyle="md" color="gray.600">
          얼마입니당
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" alignItems="center" h="68px">
        <Text textStyle="md">결제금액</Text>
        <Text textStyle="md" fontWeight="700 " color="primary.500">
          얼마입니당
        </Text>
      </Flex>
      <Divider />
      <Controller
        control={control}
        name="PIAgree"
        render={({ field: { onChange } }) => {
          return (
            <Checkbox
              onChange={onChange}
              colorScheme="primary"
              mt="20px"
              mb="40px"
              textStyle="md"
              color="gray.600"
            >
              개인정보 수집 이용 동의(필수)
            </Checkbox>
          );
        }}
      />
      <Flex justifyContent="center" mb="80px">
        <Button colorScheme="primary">결제하기</Button>
      </Flex>
    </Box>
  );
};

export default PaymentPageView;
