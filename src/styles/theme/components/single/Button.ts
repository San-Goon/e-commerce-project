import { ComponentSingleStyleConfig } from '@chakra-ui/react';
import { StyleObjectOrFn } from '@chakra-ui/styled-system';

type AccessibleColor = {
  bg?: string;
  color?: string;
  hoverBg?: string;
  activeBg?: string;
  border?: string;
};

const accessibleColorMap: { [key: string]: AccessibleColor } = {
  kakao: {
    bg: 'kakao.500',
    color: '#1A1A1A',
    hoverBg: 'kakao.600',
    activeBg: 'kakao.700',
  },
  naver: {
    bg: 'naver.500',
    color: '#FFFFFF',
    hoverBg: 'naver.600',
    activeBg: 'naver.700',
  },
  facebook: {
    bg: 'facebook.500',
    color: '#FFFFFF',
    hoverBg: 'facebook.600',
    activeBg: 'facebook.700',
  },
  apple: {
    bg: 'apple.500',
    color: '#FFFFFF',
    hoverBg: 'apple.600',
    activeBg: 'apple.700',
  },
  google: {
    bg: 'google.500',
    color: '#808080',
    hoverBg: 'google.600',
    activeBg: 'google.700',
    border: '#DDDDDD',
  },
};

const buttonDisabled = {
  opacity: 1,
  bg: 'gray.200',
  borderColor: 'gray.200',
  color: 'gray.500',
};

const variantSolid: StyleObjectOrFn = ({ colorScheme: c }) => {
  const {
    bg = `${c}.500`,
    color = 'white',
    hoverBg = `${c}.400`,
    activeBg = `${c}.400`,
    border = `${c}.500`,
  } = accessibleColorMap[c] ?? {};

  const background = bg;
  const borderColor = border;

  return {
    bg: background,
    color: color,
    borderWidth: 1,
    borderColor: borderColor,
    _disabled: buttonDisabled,
    borderRadius: '25px',
    _hover: {
      bg: hoverBg,
      borderColor: hoverBg,
      _disabled: buttonDisabled,
    },
    _active: { bg: activeBg, borderColor: activeBg },
  };
};

const variantSub: StyleObjectOrFn = ({ colorScheme: c }) => {
  const {
    bg = `${c}.100`,
    color = `${c}.500`,
    hoverBg = `${c}.200`,
    activeBg = `${c}.200`,
    border = `${c}.100`,
  } = accessibleColorMap[c] ?? {};

  const background = bg;
  const borderColor = border;

  return {
    bg: background,
    color: color,
    borderWidth: 1,
    borderColor: borderColor,
    _disabled: buttonDisabled,
    _hover: {
      bg: hoverBg,
      borderColor: hoverBg,
      _disabled: buttonDisabled,
    },
    _active: { bg: activeBg, borderColor: activeBg },
  };
};

const variantOutline: StyleObjectOrFn = ({ colorScheme: c }) => {
  const {
    bg = `white`,
    color = `${c}.500`,
    hoverBg = `${c}.100`,
    activeBg = `${c}.100`,
    border = `${c}.500`,
  } = accessibleColorMap[c] ?? {};

  const background = bg;
  const borderColor = border;

  return {
    bg: background,
    color: color,
    borderWidth: 1,
    borderColor: borderColor,
    _disabled: buttonDisabled,
    borderRadius: '25px',
    _hover: {
      bg: hoverBg,
      borderColor: border,
      _disabled: buttonDisabled,
    },
    _active: { bg: activeBg, borderColor: border },
  };
};
const variantGrayOutline: StyleObjectOrFn = ({ colorScheme: c }) => {
  const {
    bg = `transparent`,
    color = `gray.900`,
    hoverBg = `transparent`,
    activeBg = `transparent`,
    border = `gray.300`,
  } = accessibleColorMap[c] ?? {};

  const background = bg;
  const borderColor = border;

  return {
    bg: background,
    color: color,
    borderWidth: 1,
    borderColor: borderColor,
    _disabled: buttonDisabled,
    _hover: {
      bg: hoverBg,
      borderColor: `${c}.300`,
      _disabled: buttonDisabled,
    },
    _active: { bg: activeBg, borderColor: `${c}.300` },
  };
};

export const Button: ComponentSingleStyleConfig = {
  baseStyle: {
    w: 'fit-content',
    h: 'fit-content',
    _focus: { boxShadow: 'none' },
  },
  defaultProps: {
    variant: 'primary',
    size: 'xl',
  },
  variants: {
    primary: variantSolid,
    primarySub: variantSub,
    outline: variantOutline,
    grayOutline: variantGrayOutline,
  },
  sizes: {
    xl: {
      w: '343px',
      h: '50px',
      fontSize: ['16px'],
      lineHeight: ['28px'],
      fontWeight: ['700'],
    },
    l: {
      w: '180px',
      h: '48px',
      fontSize: ['16px'],
      lineHeight: [1.5],
      fontWeight: ['semibold'],
    },
    m: {
      w: '116px',
      h: '40px',
      fontSize: ['14px'],
      lineHeight: [1.5],
      fontWeight: ['semibold'],
    },
  },
};
