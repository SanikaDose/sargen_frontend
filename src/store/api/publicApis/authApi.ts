import { apiControllerPath } from '../routes';
import { publicApi } from './basePublicApi';

export const authApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `${apiControllerPath.authentication.root}${apiControllerPath.authentication.login}`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: 'throw',
});

export const { useLoginUserMutation } = authApi;
