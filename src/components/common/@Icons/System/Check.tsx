import { Icon, IconProps } from '@chakra-ui/react';

const checkIcon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5.843 11.3302L10.532 17.2472L17.465 7.51025"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default checkIcon;
