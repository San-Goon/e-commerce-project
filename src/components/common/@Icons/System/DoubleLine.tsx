import { Icon, IconProps } from '@chakra-ui/react';

const DoubleLineIcon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M21 5H3V7.5H21V5Z" fill="#1A1A1A" />
      <path d="M21 16H3V18.5H21V16Z" fill="#1A1A1A" />
    </Icon>
  );
};

export default DoubleLineIcon;
