import { SubmitHandler, useFormContext } from 'react-hook-form';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { usePatchOrderByIdMutation } from '@apis/order/OrderApi.mutation';
import useAppStore from '@features/useAppStore';

import { ModifyShippingInfoFormDataType } from '@components/HistoryPage/_hooks/useModifyShippingInfoForm';
import ModifyDoneModal from '@components/MyReviewPage/_fragments/ModifyDoneModal';

import { useQueryClient } from '@tanstack/react-query';

interface PropsType {
  orderId: string;
  onClose: () => void;
}

const ModifyShippingInfoButtons = ({ orderId, onClose }: PropsType) => {
  const queryClient = useQueryClient();
  const queryKey = useAppStore((store) => store.QUERY_KEY.orderQueryKey);
  const { isOpen: isOpenDoneModal, onOpen: onOpenDoneModal } = useDisclosure();
  const { handleSubmit } = useFormContext<ModifyShippingInfoFormDataType>();

  const { mutate } = usePatchOrderByIdMutation({
    options: {
      onSuccess: () => {
        onOpenDoneModal();
        queryClient.invalidateQueries(queryKey);
      },
    },
  });

  const onSubmit: SubmitHandler<ModifyShippingInfoFormDataType> = (data) => {
    mutate({ id: orderId, body: { ...data, method: 'CARD' } });
  };
  return (
    <Flex>
      <Button colorScheme="primary" onClick={handleSubmit(onSubmit)}>
        수정하기
      </Button>
      <Button
        ml="10px"
        variant="outline"
        colorScheme="primary"
        onClick={onClose}
      >
        닫기
      </Button>
      <ModifyDoneModal isOpen={isOpenDoneModal} onClose={onClose} />
    </Flex>
  );
};

export default ModifyShippingInfoButtons;
