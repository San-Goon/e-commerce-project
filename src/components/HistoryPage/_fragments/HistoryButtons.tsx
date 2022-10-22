import Link from 'next/link';
import React, { useCallback } from 'react';

import { Button, useDisclosure } from '@chakra-ui/react';

import { useGetMeQuery } from '@apis/user/UserApi.query';

import HistoryModal from '@components/HistoryPage/_fragments/HistoryModal';

interface PropsType {
  shippingStatus:
    | '배송중'
    | '상품준비'
    | '주문취소'
    | '배송완료'
    | '결제완료'
    | undefined;
  productId: number;
  orderId: number;
}

const HistoryButtons = ({ shippingStatus, productId, orderId }: PropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = useGetMeQuery();

  const onClickCancel = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      {shippingStatus === '결제완료' && (
        <>
          <Button
            w="70px"
            h="20px"
            borderRadius="5px"
            colorScheme="primary"
            fontSize="12px"
            fontWeight="700"
            onClick={onClickCancel}
          >
            주문취소
          </Button>
          <HistoryModal isOpen={isOpen} onClose={onClose} userId={data?.id} />
        </>
      )}
      {shippingStatus === '배송완료' && (
        <Button
          w="70px"
          h="20px"
          colorScheme="primary"
          borderRadius="5px"
          variant="outline"
          fontSize="12px"
          fontWeight="700"
        >
          <Link
            href={{
              pathname: '/review',
              query: { productId, orderId },
            }}
          >
            리뷰작성
          </Link>
        </Button>
      )}
    </>
  );
};

export default HistoryButtons;
