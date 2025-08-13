import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const publicApi = createApi({
  reducerPath: 'basePublicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1', //.................uncomment this line for production push
    // baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://109.199.109.4:3001/api/v1', //.................deployed backend
    // baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.0.36:3001/api/v1', //.................viren backend
    // baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1', //.................local backend backend
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', token);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
