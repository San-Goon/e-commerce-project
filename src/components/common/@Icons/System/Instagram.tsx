import { Icon, IconProps } from '@chakra-ui/react';

const InstagramIcon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M11.922 4.79044C14.3 4.79044 14.582 4.79943 15.522 4.84243C16.0869 4.84923 16.6463 4.95307 17.176 5.14943C17.56 5.29763 17.9088 5.52456 18.1998 5.81562C18.4909 6.10668 18.7178 6.45542 18.866 6.83943C19.0624 7.36909 19.1662 7.92858 19.173 8.49343C19.216 9.43243 19.225 9.71443 19.225 12.0934C19.225 14.4724 19.216 14.7534 19.173 15.6934C19.1662 16.2583 19.0624 16.8178 18.866 17.3474C18.7178 17.7314 18.4909 18.0802 18.1998 18.3712C17.9088 18.6623 17.56 18.8892 17.176 19.0374C16.6463 19.2338 16.0869 19.3376 15.522 19.3444C14.583 19.3874 14.301 19.3964 11.922 19.3964C9.54301 19.3964 9.26201 19.3874 8.32201 19.3444C7.75715 19.3376 7.19768 19.2338 6.66801 19.0374C6.284 18.8892 5.93525 18.6623 5.6442 18.3712C5.35314 18.0802 5.12622 17.7314 4.97801 17.3474C4.78166 16.8178 4.6778 16.2583 4.67101 15.6934C4.62801 14.7544 4.619 14.4724 4.619 12.0934C4.619 9.71443 4.62801 9.43343 4.67101 8.49343C4.67778 7.92858 4.78164 7.36909 4.97801 6.83943C5.12622 6.45542 5.35314 6.10668 5.6442 5.81562C5.93525 5.52456 6.284 5.29763 6.66801 5.14943C7.19768 4.95307 7.75715 4.84923 8.32201 4.84243C9.26101 4.79943 9.54301 4.79044 11.922 4.79044ZM11.922 3.19043C9.50301 3.19043 9.2 3.20043 8.25 3.24443C7.51111 3.25925 6.7801 3.39923 6.08801 3.65843C5.49634 3.8873 4.95898 4.23723 4.51039 4.68582C4.0618 5.13441 3.71187 5.67176 3.483 6.26344C3.2238 6.95552 3.08382 7.68654 3.069 8.42543C3.026 9.37543 3.01501 9.67844 3.01501 12.0974C3.01501 14.5164 3.025 14.8194 3.069 15.7694C3.08382 16.5083 3.2238 17.2393 3.483 17.9314C3.71187 18.5231 4.0618 19.0605 4.51039 19.509C4.95898 19.9576 5.49634 20.3076 6.08801 20.5364C6.7801 20.7956 7.51111 20.9356 8.25 20.9504C9.2 20.9934 9.50301 21.0044 11.922 21.0044C14.341 21.0044 14.644 20.9944 15.594 20.9504C16.3329 20.9356 17.0639 20.7956 17.756 20.5364C18.3477 20.3076 18.885 19.9576 19.3336 19.509C19.7822 19.0605 20.1321 18.5231 20.361 17.9314C20.6202 17.2393 20.7602 16.5083 20.775 15.7694C20.818 14.8194 20.829 14.5164 20.829 12.0974C20.829 9.67844 20.819 9.37543 20.775 8.42543C20.7602 7.68654 20.6202 6.95552 20.361 6.26344C20.1321 5.67176 19.7822 5.13441 19.3336 4.68582C18.885 4.23723 18.3477 3.8873 17.756 3.65843C17.0639 3.39923 16.3329 3.25925 15.594 3.24443C14.644 3.20143 14.341 3.19043 11.922 3.19043Z"
        fill="currentColor"
      />
      <path
        d="M11.922 7.51855C11.0174 7.51855 10.133 7.78682 9.38086 8.28941C8.62867 8.79201 8.04239 9.50636 7.6962 10.3421C7.35 11.1779 7.25942 12.0976 7.43591 12.9849C7.6124 13.8722 8.04803 14.6872 8.68771 15.3269C9.3274 15.9665 10.1424 16.4022 11.0297 16.5787C11.917 16.7551 12.8366 16.6646 13.6724 16.3184C14.5082 15.9722 15.2226 15.3859 15.7252 14.6337C16.2278 13.8815 16.496 12.9972 16.496 12.0925C16.496 10.8794 16.0141 9.71604 15.1563 8.85825C14.2986 8.00045 13.1351 7.51855 11.922 7.51855ZM11.922 15.0616C11.3348 15.0616 10.7608 14.8874 10.2726 14.5612C9.7843 14.235 9.40376 13.7712 9.17905 13.2287C8.95433 12.6862 8.89551 12.0893 9.01007 11.5133C9.12463 10.9374 9.40741 10.4084 9.82263 9.99315C10.2379 9.57793 10.7669 9.29516 11.3428 9.1806C11.9187 9.06604 12.5157 9.12483 13.0582 9.34955C13.6007 9.57427 14.0644 9.9548 14.3907 10.4431C14.7169 10.9313 14.891 11.5053 14.891 12.0925C14.891 12.88 14.5782 13.6351 14.0214 14.1919C13.4646 14.7487 12.7095 15.0616 11.922 15.0616Z"
        fill="currentColor"
      />
      <path
        d="M16.677 8.40753C17.2674 8.40753 17.746 7.92892 17.746 7.33853C17.746 6.74814 17.2674 6.26953 16.677 6.26953C16.0866 6.26953 15.608 6.74814 15.608 7.33853C15.608 7.92892 16.0866 8.40753 16.677 8.40753Z"
        fill="currentColor"
      />
    </Icon>
  );
};

export default InstagramIcon;
