import { Box, useDisclosure } from '@chakra-ui/react';

import {
  usePostOrderMutation,
  usePostOrderStatusMutation,
} from '@apis/order/OrderApi.mutation';

import SuccessModal from '@components/SuccessPage/_fragments/SuccessModal';

import { getShipInfo } from '@utils/localStorage/shipInfo';

const SuccessPage = () => {
  const session = getShipInfo();
  console.log(session);
  const { mutate: postOrderMutate } = usePostOrderMutation();
  const { mutate: postOrderStatusMutate } = usePostOrderStatusMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mt="100px">
      <SuccessModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default SuccessPage;
