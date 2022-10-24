import React from 'react';

import { Box } from '@chakra-ui/react';

import Section1 from './_fragments/Section1';
import Section2 from './_fragments/Section2';
import Section3 from './_fragments/Section3';
import Section4 from './_fragments/Section4';
import Section5 from './_fragments/Section5';
import Section6 from './_fragments/Section6';
import Section7 from './_fragments/Section7';

function HomePageContent() {
  return (
    <Box maxW="600px" m="auto">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
    </Box>
  );
}

export default HomePageContent;
