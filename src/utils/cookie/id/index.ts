import { Cookies } from 'react-cookie';

import { cookieOption } from '@utils/cookie/token';

export const getId = () => {
  if (typeof window === 'undefined') return null;
  const cookies = new Cookies();
  const id: string = cookies.get('@id');
  if (id) {
    return id;
  }
  return null;
};

export const setId = (id: number) => {
  const cookies = new Cookies();
  const stringifyToken = JSON.stringify(id);
  cookies.set('@id', stringifyToken, cookieOption);
};

export const deleteId = () => {
  const cookies = new Cookies();
  cookies.remove('@id', cookieOption);
};

// export const getIdInSSR = (cookie: string) => {
//   if (!cookie) {
//     return '';
//   } else {
//     cookie = cookie.split('; ');
//     const result = {};
//
//     for (let i = 0; i < cookie.length; i++) {
//       const cur = cookie[i].split('=');
//       result[cur[0]] = cur[1];
//     }
//     return result;
//   }
// };
