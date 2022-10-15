import Link from 'next/link';

import { Button, Center, Text } from '@chakra-ui/react';

const NoItemComponent = () => {
  return (
    <Center h="316px" flexDirection="column">
      <Text textAlign="center" textStyle="md" fontWeight="700">
        장바구니가 비어있습니다. <br />
        상품을 추가해보세요!
      </Text>
      <Link href="/list" passHref>
        <Button mt="30px" colorScheme="primary">
          상품보러가기
        </Button>
      </Link>
    </Center>
  );
};

export default NoItemComponent;
