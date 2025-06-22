import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) headers.set('Authorization', token);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if (result.data === null) {

  if (result.error && result.error.status === 401) {
    console.log('In if');

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      localStorage.clear();
      window.location.href = '/login';
      return result;
    }

    // Perform the refresh token request
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh', // adjust if needed
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    // Check if the refresh request was successful and contains data
    if (refreshResult.data) {
      const { accessToken, refreshToken: newRefreshToken } = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
      };

      // Save new tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      // Retry the original request with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Handle case where refresh token request failed
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  return result;
};

export const protectedApi = createApi({
  reducerPath: 'protectedApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}), // Placeholder, will inject endpoints later
  tagTypes: ['SpecificPlantInfo', 'Assessor', 'AssessorMetadata', 'Plant', 'Organisation', 'Poc', 'Solutions', 'PlantLogo', 'ProfilePic'],
  tagTypes: [
    'SpecificPlantInfo',
    'Assessor',
    'AssessorMetadata',
    'Plant',
    'Organisation',
    'Poc',
    'Solutions',
    'PlantLogo',
    'ProfilePic',
    'AssessorLogo',
  ],
});
