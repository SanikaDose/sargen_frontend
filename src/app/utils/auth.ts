import { jwtDecode } from 'jwt-decode';
import { RawToken, Token, UserType } from '../(unprotectedRoutes)/login/login.types';

export const decodeAndStoreToken = (token: string): Token => {
  const decoded = jwtDecode<RawToken>(token);

  const typedToken: Token = {
    ...decoded,
    userType: decoded.userType.map((type: any) => type as UserType),
    accessToken: token,
  };

  // Store in localStorage
  localStorage.setItem('accessToken', token);
  localStorage.setItem('Authorization', token);
  localStorage.setItem('tenantId', decoded.tenantId);
  localStorage.setItem('userName', typedToken.userName || '');

  return typedToken;
};

export const getInitialDecodedToken = (): Token | null => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    return decodeAndStoreToken(token);
  } catch (error) {
    console.error('Token decode failed on load:', error);
    return null;
  }
};
