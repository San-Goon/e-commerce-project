import { ChakraMultiPartComponentType } from '../type';

const parts = ['control', 'icon', 'container', 'label'] as const;

export const Checkbox: ChakraMultiPartComponentType<typeof parts> = {
  parts,
  baseStyle: {
    container: {
      h: '24px',
    },
    control: {
      borderRadius: '4px',
      borderWidth: '1px',
      borderColor: `gray.400`,
      _focus: { boxShadow: 'none' },
      _checked: {
        _disabled: {
          bg: `gray.500`,
          borderColor: `gray.500`,
          color: `white`,
        },
      },
      _disabled: {
        bg: `gray.200`,
        borderColor: `gray.500`,
      },
      _invalid: {
        borderColor: `gray.400`,
      },
    },
    label: {
      textStyle: 'body2',
      ml: '12px',
      _disabled: {
        opacity: 1,
        color: `gray.900`,
      },
    },
  },
  defaultProps: {
    size: 'default',
  },
  sizes: {
    default: {
      control: { w: '20px', h: '20px' },
    },
  },
  variants: {},
};
