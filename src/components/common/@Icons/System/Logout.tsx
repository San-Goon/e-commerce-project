import { Icon, IconProps } from '@chakra-ui/react';

const LogoutIcon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 24 25" fill="none" {...props}>
      <path
        d="M16.3136 8.5625L20.2501 12.5L16.3136 16.4375"
        stroke="#1A1A1A"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 12.5H20.2472"
        stroke="#1A1A1A"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 20.75H4.5C4.30109 20.75 4.11032 20.671 3.96967 20.5303C3.82902 20.3897 3.75 20.1989 3.75 20V5C3.75 4.80109 3.82902 4.61032 3.96967 4.46967C4.11032 4.32902 4.30109 4.25 4.5 4.25H9.75"
        stroke="#1A1A1A"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default LogoutIcon;
