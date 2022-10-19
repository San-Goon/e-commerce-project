import { Cookies } from 'react-cookie';

import { CookieSetOptions } from 'universal-cookie';

import { CONFIG } from '@config';

const TOKEN_KEY = CONFIG.AUTH_TOKEN_KEY || '@token';

export type TokenType = {
  access?: string;
  refresh?: string;
  isRegister: boolean;
  socialToken?: string;
};

export const cookieOption: CookieSetOptions = {
  path: '/',
  maxAge: 60 * 60 * 24 * 90,
  sameSite: 'strict',
  secure: true,
};

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  const cookies = new Cookies();
  const token: TokenType = cookies.get(TOKEN_KEY);
  if (token) {
    return token;
  }
  return null;
};

export const setToken = (token: TokenType) => {
  const cookies = new Cookies();
  const stringifyToken = JSON.stringify(token);
  cookies.set(TOKEN_KEY, stringifyToken, cookieOption);
};

export const deleteToken = () => {
  const cookies = new Cookies();
  cookies.remove(TOKEN_KEY, cookieOption);
};
