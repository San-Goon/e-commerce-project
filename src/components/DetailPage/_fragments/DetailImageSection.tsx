import { useState } from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';

import ArrowDown from '@icons/System/ArrowDown';
import ArrowUp from '@icons/System/ArrowUp';

interface PropsType {
  detail: string;
}

const DetailImageSection = ({ detail }: PropsType) => {
  const [showAll, setShowAll] = useState(false);
  const onClickShowAll = () => {
    setShowAll((prev) => !prev);
  };
  return (
    <Flex
      justifyContent="center"
      position="relative"
      {...(!showAll && { height: '500px' })}
      overflow="hidden"
    >
      <Box dangerouslySetInnerHTML={{ __html: detail }} />
      <Flex position="absolute" bottom="10px">
        <Button onClick={onClickShowAll}>
          {showAll ? (
            <>
              상세정보 접기 <ArrowUp boxSize="16px" />
            </>
          ) : (
            <>
              상세정보 펼쳐보기
              <ArrowDown boxSize="16px" />
            </>
          )}
        </Button>
      </Flex>
    </Flex>
  );
};

export default DetailImageSection;
