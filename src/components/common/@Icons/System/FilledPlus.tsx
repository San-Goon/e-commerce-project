import { Icon, IconProps } from '@chakra-ui/react';

const FilledPlusIcon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
        fill="currentColor"
      />
      <path
        d="M9.666 5.16602V14.166"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.166 9.66602H5.166"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
};

export default FilledPlusIcon;
