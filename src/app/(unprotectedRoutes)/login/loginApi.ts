/**
 * RTK Query API slice for login and forgot password actions.
 *
 * - Handles user login via `useLoginUserMutation`
 * - Handles forgot password requests via `useForgotPasswordApiMutation`
 * - Integrates toast feedback using `rtkAPIToast`
 *
 * @author Pranay Mahalle
 * @date 2025-04-19
 */

import { publicApi } from '@/store/api/publicApis/basePublicApi';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  OnboardingStatusResponse,
} from './login.types';
import { apiControllerPath } from '@/store/api/routes';

export const loginApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Mutation to log in a user.
     *
     * - Sends user credentials to authentication endpoint.
     * - Displays toast notifications on success or failure.
     * - Response includes access token and user info.
     */

    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: `${apiControllerPath.authentication.root}${apiControllerPath.authentication.login}`,
        method: 'POST',
        body: credentials,
      }),
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     await rtkAPIToast(queryFulfilled, dispatch, {
      //       successMessage: 'Login successful!',
      //       errorMessage: 'Login failed!',
      //       duration: 4000,
      //     });
      //   },
    }),

    /**
     * Mutation to initiate forgot password flow.
     *
     * - Sends user email to forgot password endpoint.
     * - Displays toast notifications on success or failure.
     */

    forgotPasswordApi: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: `${apiControllerPath.authentication.root}${apiControllerPath.authentication.forgotPassword}`,
        method: 'POST',
        body: credentials,
      }),
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     await rtkAPIToast(queryFulfilled, dispatch, {
      //       successMessage: 'Forgot Password successful!',
      //       errorMessage: 'Forgot Password failed!',
      //       duration: 4000,
      //     });
      //   },
    }),

    getOnboardingStatus: builder.query<OnboardingStatusResponse, string>({
      query: (tenantId) => ({
        url: `${apiControllerPath.onboardingStatus.root}/${tenantId}${apiControllerPath.onboardingStatus.getOnboardingStatus}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginUserMutation, useLazyGetOnboardingStatusQuery, useForgotPasswordApiMutation } = loginApi;
