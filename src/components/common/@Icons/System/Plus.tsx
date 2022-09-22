import { Icon, IconProps } from '@chakra-ui/react';

const PlusIcon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 50 50" fill="none" {...props}>
      <path
        d="M25 16V34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M34 25H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
};

export default PlusIcon;
