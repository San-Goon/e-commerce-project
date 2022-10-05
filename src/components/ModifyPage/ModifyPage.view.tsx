import React from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';

import InfoForm from '@components/common/InfoForm';

const ModifyPageView = ({ onSubmit }: any) => {
  return (
    <Box as="form" m="16px" onSubmit={onSubmit}>
      <InfoForm />
      <Flex justifyContent="space-between">
        <Button
          w="165px"
          h="50px"
          textStyle="md"
          fontWeight="700"
          colorScheme="primary"
          variant="outline"
        >
          취소
        </Button>
        <Button colorScheme="primary" textStyle="md" fontWeight="700">
          저장
        </Button>
      </Flex>
    </Box>
  );
};

export default ModifyPageView;
