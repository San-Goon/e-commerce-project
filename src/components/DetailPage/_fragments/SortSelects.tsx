import React, { useEffect } from 'react';

import { ChakraStylesConfig, Select } from 'chakra-react-select';

import { Box, Flex } from '@chakra-ui/react';

import {
  GetProductByIdReturnType,
  ReviewListType,
} from '@apis/product/ProductApi.type';

const chakraSelectStyle: ChakraStylesConfig = {
  dropdownIndicator: (provided) => ({
    ...provided,
    p: 0,
    bg: 'gray.200',
  }),
  container: (provided) => ({
    ...provided,
    w: '86px',
    bg: 'gray.200',
    borderRadius: '5px',
    cursor: 'pointer',
  }),
  control: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontWeight: '700',
    m: 0,
    borderRadius: '5px',
  }),
  menu: (provided) => ({
    ...provided,
    my: 0,
    bg: 'gray.200',
    borderRadius: '5px',
  }),
  menuList: (provided) => ({
    ...provided,
    bg: 'gray.200',
    border: '0px',
  }),
  option: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontWeight: '700',
  }),
};

interface Props {
  data: GetProductByIdReturnType;
  sortValue: string;
  showValue: string;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
  setShowValue: React.Dispatch<React.SetStateAction<string>>;
  setSortedArray: React.Dispatch<React.SetStateAction<ReviewListType[]>>;
}

const SortSelects = ({
  data,
  sortValue,
  showValue,
  setSortValue,
  setShowValue,
  setSortedArray,
}: Props) => {
  useEffect(() => {
    if (data) {
      if (data.reviewList) {
        let tempArr = [...data.reviewList];
        if (sortValue === '최신순') {
          tempArr.sort(
            (a, b) => Number(new Date(b.created)) - Number(new Date(a.created)),
          );
        } else if (sortValue === '평점 높은순') {
          tempArr.sort((a, b) => b.rate - a.rate);
        } else if (sortValue === '평점 낮은순') {
          tempArr.sort((a, b) => a.rate - b.rate);
        }
        if (showValue === '포토리뷰') {
          tempArr = tempArr.filter((item) => item.reviewimageSet.length !== 0);
        }
        setSortedArray(tempArr);
      }
    }
  }, [setSortedArray, sortValue, showValue, data]);

  const onChangeSort = (option: any) => {
    setSortValue(option.value);
  };

  const onChangeShow = (option: any) => {
    setShowValue(option.value);
  };
  return (
    <Flex>
      <Box>
        <Select
          size="sm"
          instanceId="sortSelect"
          focusBorderColor="gray.200"
          isSearchable={false}
          onChange={onChangeSort}
          options={SORT_OPTIONS.map((item) => ({
            value: item.value,
            label: item.label,
          }))}
          defaultValue={SORT_OPTIONS[0]}
          chakraStyles={chakraSelectStyle}
        />
      </Box>
      <Box ml="10px">
        <Select
          size="sm"
          instanceId="filterSelect"
          isSearchable={false}
          focusBorderColor="gray.200"
          onChange={onChangeShow}
          options={SHOW_OPTIONS.map((item) => ({
            value: item.value,
            label: item.label,
          }))}
          defaultValue={SHOW_OPTIONS[0]}
          chakraStyles={chakraSelectStyle}
        />
      </Box>
    </Flex>
  );
};

const SORT_OPTIONS = [
  { value: '최신순', label: '최신순' },
  { value: '평점 높은순', label: '평점 높은순' },
  { value: '평점 낮은순', label: '평점 낮은순' },
];

const SHOW_OPTIONS = [
  { value: '전체보기', label: '전체보기' },
  { value: '포토리뷰', label: '포토리뷰' },
];

export default SortSelects;
