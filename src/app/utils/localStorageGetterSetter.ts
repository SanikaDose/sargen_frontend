import { jwtDecode } from 'jwt-decode';
import { Token } from '../(unprotectedRoutes)/login/login.types';

export function setValueLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getValueLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem(key);
  }
  return null;
}
export function emptyLocalStorage(key: string) {
  console.log('emptyLocalStorage');

  return localStorage.removeItem(key);
}

export const decodeToken = (token: string) => {
  try {
    return jwtDecode<Token>(token);
  } catch (e) {
    console.log('e', e);
    return null;
  }
};
