import { useRouter } from 'next/router';
import React from 'react';

import { CONFIG } from '@config';

import { Box, Flex } from '@chakra-ui/react';

import { usePostSocialLoginMutation } from '@apis/user/UserApi.mutation';

import SocialButton, { SocialType } from '@components/common/SocialButton';
import Logo from '@icons/System/Logo';

import { SOCIAL } from '@constants/social';

const SOCIAL_REDIRECT_URL = `${CONFIG.REDIRECT_DOMAIN}`;

const SOCIAL_LIST: Array<{ social: SocialType; link: string }> = [
  {
    social: 'kakao',
    // link: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${SOCIAL.KAKAO_CLIENT_ID}&redirect_uri=${SOCIAL_REDIRECT_URL}&state=kakao`,
    link: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${SOCIAL.KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/social_login/callback&state=kakao`
  },
];

function LogInPage() {
  const { query } = useRouter();
  const json = JSON.stringify(query);
  console.log(query);
  const data = usePostSocialLoginMutation();
  console.log(SOCIAL.KAKAO_CLIENT_ID)

  React.useEffect(() => {
    if (query.code) {
      data.mutate({
        code: query.code,
        state: query.state,
      });
    }
  }, [query]);

  return (
    <Flex
      bg="primary.500"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      direction="column"
      position="relative"
    >
      <Logo boxSize="262px" color="white" />
      <Box w="315px" h="45px" position="absolute" bottom="50">
        {SOCIAL_LIST.map((social) => {
          return <SocialButton key={social.social} data={social} size="md" />;
        })}
      </Box>
    </Flex>
  );
}

export default LogInPage;
