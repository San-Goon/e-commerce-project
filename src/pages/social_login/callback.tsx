import { GetServerSideProps } from 'next';
import React from 'react';

import CallbackPage from '@components/CallbackPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queries = context.query;
  return {
    props: { queries },
  };
};

interface PropsType {
  queries: {
    code: string;
    state: string;
  };
}

const Callback = ({ queries }: PropsType) => {
  return <CallbackPage queries={queries} />;
};

export default Callback;
