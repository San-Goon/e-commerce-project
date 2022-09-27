import { Icon, IconProps } from '@chakra-ui/react';

const CurveIcon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 375 39" fill="none" {...props}>
      <path
        d="M376 4.17195C322.562 25.5821 163.296 69.7897 -1.00001 1"
        stroke="#FF710B"
        strokeWidth="2"
      />
    </Icon>
  );
};

export default CurveIcon;
