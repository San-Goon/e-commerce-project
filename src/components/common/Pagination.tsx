import React from 'react';

import { Center, Text } from '@chakra-ui/react';

import { ArrowLeftIcon, ArrowRightIcon } from '../../generated/icons/MyIcons';

interface PropsType {
  numPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ numPages, page, setPage }: PropsType) => {
  const onClickLeft = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const onClickRight = () => {
    if (page !== numPages) {
      setPage(page + 1);
    }
  };
  const onClickNumber = (page: number) => () => {
    setPage(page);
  };
  return (
    <Center mt="50px">
      {page !== 1 && (
        <ArrowLeftIcon
          boxSize="24px"
          onClick={onClickLeft}
          mx="15px"
          cursor={page === 1 ? 'default' : 'pointer'}
        />
      )}
      {Array(numPages)
        .fill(0)
        .map((_, index) => (
          <Text
            key={index + 1}
            onClick={onClickNumber(index + 1)}
            textStyle="md"
            mx="15px"
            color={page === index + 1 ? 'black' : 'gray.400'}
            cursor={page === index + 1 ? 'default' : 'pointer'}
            boxSize="24px"
          >
            {index + 1}
          </Text>
        ))}
      {page !== numPages && (
        <ArrowRightIcon
          boxSize="24px"
          onClick={onClickRight}
          mx="15px"
          cursor={page === numPages ? 'default' : 'pointer'}
        />
      )}
    </Center>
  );
};

export default Pagination;
