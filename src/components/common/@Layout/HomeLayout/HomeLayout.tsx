import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

import HomeFooter from './_fragments/HomeFooter';
import HomeHeader from './_fragments/HomeHeader';

interface HomeLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const HomeLayout = ({
  //
  header = <HomeHeader />,
  footer = <HomeFooter />,
  containerProps,
  content,
}: HomeLayoutProps) => {
  return (
    <>
      {header}
      <Container p="0" mt="100px" {...containerProps}>
        {content}
      </Container>
      {footer}
    </>
  );
};

export default HomeLayout;
