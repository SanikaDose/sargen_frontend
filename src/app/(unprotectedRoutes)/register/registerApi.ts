// login/loginApi.ts
import { publicApi } from '@/store/api/publicApis/basePublicApi';
import { apiControllerPath } from '@/store/api/routes';
import { ActivateAccountRequest, ActivateAccountResponse, RegisterRequest, RegisterResponse } from './register.types';

/**
 * Redux slice for handling login-related API calls.
 *
 * - Provides mutations for user registration and account activation.
 * - Sends requests to the authentication endpoints for sign-up and email validation.
 * - Displays success/error toast notifications on API responses.
 *
 * @author Pranay Mahalle
 * @date 2025-04-15
 */

export const registerApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Mutation to register a new user.
     *
     * - Sends user credentials to the signup endpoint.
     * - Displays toast notifications on success or failure.
     *
     * @param {RegisterRequest} credentials - The user's credentials (email, password).
     * @returns {RegisterResponse} - The response containing login details.
     */

    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: `${apiControllerPath.authentication.root}${apiControllerPath.authentication.signup}`,
        method: 'POST',
        body: credentials,
      }),
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     await rtkAPIToast(queryFulfilled, dispatch, {
      //       successMessage: 'Registration successfully!',
      //       errorMessage: 'Registeration failed!',
      //       duration: 4000,
      //     });
      //   },
    }),

    /**
     * Mutation to activate a user's account.
     *
     * - Sends activation credentials to the validate email endpoint.
     * - Displays toast notifications on success or failure.
     *
     * @param {ActivateAccountRequest} credentials - The credentials required to activate the account (typically email).
     * @returns {ActivateAccountResponse} - The response indicating whether account activation was successful.
     */

    activeAccount: builder.mutation<ActivateAccountResponse, ActivateAccountRequest>({
      query: (credentials) => ({
        url: `${apiControllerPath.authentication.root}${apiControllerPath.authentication.validateEmailAddress}`,
        method: 'POST',
        body: credentials,
      }),
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     await rtkAPIToast(queryFulfilled, dispatch, {
      //       successMessage: 'Activated Account successfully!',
      //       errorMessage: 'Account Activation failed!',
      //       duration: 4000,
      //     });
      //   },
    }),
  }),
  overrideExisting: true,
});

export const { useRegisterUserMutation, useActiveAccountMutation } = registerApi;
