import { GetServerSideProps } from 'next';

import SuccessPage from '@components/SuccessPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const orderId = context.query.orderId;

  return {
    props: {
      orderId,
    },
  };
};

const Success = () => {
  return <HomeLayout content={<SuccessPage />} />;
};

export default Success;
