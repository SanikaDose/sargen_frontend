import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';
import { OrgPayload, getOrgPayload } from './EditOrganisationOnboarding.types';
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';

export const onboardingApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit Organization Info (invalidates the corresponding cache)
    submitOrganizationInfo: builder.mutation<void, { tenantId: string; body: OrgPayload }>({
      query: ({ tenantId, body }) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.addOrganizationsInformation}`,
        method: 'POST',
        body,
      }),

      // Invalidate the Organization tag when new data is submitted
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'Organisation', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Organization information submitted successfully!',
          errorMessage: 'Failed to submit organization information!',
          duration: 4000,
        });
      },
    }),

    // Get Organization Info (provides a tag)
    getOrganizationInfo: builder.query<getOrgPayload, string>({
      query: (tenantId) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.getOrganizationsInformation}`,
        method: 'GET',
      }),
      // Provide a tag so that the cache can be updated later when necessary
      providesTags: (result, error, tenantId) => [{ type: 'Organisation', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Organization information fetched successfully!',
          errorMessage: 'Failed to fetch organization information!',
          duration: 4000,
        });
      },
    }),

    // 📤 Upload Plant Logo
    uploadOrganizationLogo: builder.mutation<void, { tenantId: string; formData: FormData }>({
      query: ({ tenantId, formData }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadLogo}/${tenantId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: (result, error, { tenantId }) => [{ type: 'PlantLogo', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Logo uploaded successfully!',
          errorMessage: 'Failed to upload logo!',
          duration: 4000,
        });
      },
    }),
  }),
});

export const { useSubmitOrganizationInfoMutation, useGetOrganizationInfoQuery, useUploadOrganizationLogoMutation } =
  onboardingApi;
