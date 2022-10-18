import { NextRouter } from 'next/router';
import React from 'react';

import { Button, Flex } from '@chakra-ui/react';

interface PropsType {
  router: NextRouter;
}

const SuccessButtons = ({ router }: PropsType) => {
  const onClickGoMain = () => {
    router.push('/');
  };
  const onClickGoHistory = () => {
    router.push('/history');
  };
  return (
    <Flex justifyContent="space-between" mb="30px">
      <Button colorScheme="primary" variant="outline" onClick={onClickGoMain}>
        메인화면 이동
      </Button>
      <Button colorScheme="primary" onClick={onClickGoHistory}>
        주문내역 이동
      </Button>
    </Flex>
  );
};

export default SuccessButtons;
