import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getToken } from '@utils/localStorage/token';

import HistoryPageView from './HistoryPage.view';

const HistoryPage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert('로그인 후 이용해주세요.');
      router.push('/login');
    }
  }, []);
  return <HistoryPageView />;
};

export default HistoryPage;
