import { GetServerSideProps } from 'next';

import PaymentPage from '@components/PaymentPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ids = context.query.ids;

  return {
    props: { ids },
  };
};

interface PropsType {
  ids: string;
}

const Payment = ({ ids }: PropsType) => {
  return <HomeLayout content={<PaymentPage ids={ids} />} />;
};

export default Payment;
