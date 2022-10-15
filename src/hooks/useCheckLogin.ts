import { useEffect, useState } from 'react';

import { getToken } from '@utils/cookie/token';

const useCheckLogin = () => {
  const [isLogIn, setIsLogIn] = useState<null | boolean>(null);
  const token = getToken();

  useEffect(() => {
    setIsLogIn(!!token);
  }, [token]);

  return { isLogIn };
};

export default useCheckLogin;
