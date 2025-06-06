import { publicApi } from '@/store/api/publicApis/basePublicApi';
import { ResetPasswordRequest, ResetPasswordResponse } from './resetPassword.model';
import { apiControllerPath } from '@/store/api/routes';

/**
 * Redux slice for handling password reset functionality.
 *
 * - Provides mutation to reset user password.
 * - Sends password reset request to the corresponding API endpoint.
 * - Displays success/error toast notifications on API responses.
 *
 * @author Pranay Mahalle
 * @date 2025-04-09
 */

export const resetPassword = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Mutation to reset a user's password.
     *
     * - Sends the user's credentials to the reset password endpoint.
     * - Displays success/error toast notifications based on the result of the request.
     *
     * @param {ResetPasswordRequest} credentials - The user's credentials (typically email and password).
     * @returns {ResetPasswordResponse} - The response containing login details after password reset.
     */

    resetPass: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (credentials) => ({
        url: `${apiControllerPath.authentication.root}${apiControllerPath.authentication.restpassword}`,
        method: 'POST',
        body: credentials,
      }),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Login successful!',
      //     errorMessage: 'Login failed!',
      //     duration: 4000,
      //   });
      // },
    }),
  }),
});

export const { useResetPassMutation } = resetPassword;
