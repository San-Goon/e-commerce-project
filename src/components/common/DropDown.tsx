import React from 'react';

import { Select, chakraComponents } from 'chakra-react-select';

import { Box, Icon } from '@chakra-ui/react';

interface IProps {
  placeholder: string;
  options?: { value: string; label: string }[];
}

const DropDown = ({ placeholder, options }: IProps) => {
  return (
    <Select
      chakraStyles={{
        control: () => ({
          display: 'flex',
          alignItems: 'center',
          border: '1px',
          borderColor: 'gray.100',
          borderRadius: '8px',
          padding: 0,
          paddingInline: 0,
          bg: 'gray.100',
          transitionProperty: 'common',
          transitionDuration: 'normal',
          _focus: {
            borderColor: `gray.500`,
          },
        }),
        valueContainer: (provided) => ({
          ...provided,
          h: '48px',
          border: 'none',
          paddingInlineStart: '16px',
          cursor: 'pointer',
        }),
        placeholder: () => ({
          margin: 0,
          marginInline: 0,
          textStyle: 'body2',
          color: 'gray.600',
        }),
        singleValue: () => ({
          textStyle: 'body2',
          color: 'black',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          px: '14px',
        }),
        menu: (provided) => ({
          ...provided,
          mt: '8px',
          boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.08)',
        }),
        menuList: (provided) => ({
          ...provided,
          py: '8px',
          minH: '304px',
        }),
        option: (_, state) => ({
          h: '48px',
          p: '13.5px 16px',
          textStyle: 'body2',
          color: state.isSelected ? `primary.500` : 'gray.900',
          _hover: {
            bg: 'gray.100',
          },
        }),
      }}
      components={{
        DropdownIndicator: (props) => {
          return (
            <chakraComponents.DropdownIndicator {...props}>
              <Icon></Icon>
            </chakraComponents.DropdownIndicator>
          );
        },
        Menu: (props) => {
          return (
            <chakraComponents.Menu {...props}>
              <Box
                sx={{
                  '> div': {
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                  },
                  '> div::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {props.children}
              </Box>
            </chakraComponents.Menu>
          );
        },
        Option: (props) => {
          return (
            <chakraComponents.Option {...props}>
              {props.children}
              {props.isSelected && <Icon w="12px" h="12px" ml="8px"></Icon>}
            </chakraComponents.Option>
          );
        },
      }}
      isSearchable={false}
      options={options}
      placeholder={placeholder}
    />
  );
};

export default DropDown;
