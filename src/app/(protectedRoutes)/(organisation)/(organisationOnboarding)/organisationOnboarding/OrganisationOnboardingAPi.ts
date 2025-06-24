import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';

export interface OrgPayload {
  companyName: string;
  website: string;
  gstin: string;
  revenue: string;
  about: string;
  numberOfEmployees: string;
}

interface getOrgPayload {
  message: string;
  success: boolean;
  data: {
    name: string;
    website: string;
    gstin: string;
    revenue: string;
    about: string;
    numberOfEmployees: string;
    country: string;
    uom: string;
  };
}

export const onboardingApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit Organization Info (invalidates the corresponding cache)
    submitOrganizationInfo: builder.mutation<void, { tenantId: string; body: OrgPayload }>({
      query: ({ tenantId, body }) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.addOrganizationsInformation}`,
        method: 'POST',
        body,
      }),

      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'Organisation', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Organization details submitted successfully!',
          errorMessage: 'Failed to submit organization details!',
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
      // async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Fetched organization details successfully!',
      //     errorMessage: 'Failed to fetch organization details!',
      //     duration: 4000,
      //   });
      // },
    }),

    // 📤 Upload Plant Logo
    uploadOrganizationLogo: builder.mutation<void, { tenantId: string; formData: FormData }>({
      query: ({ tenantId, formData }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadLogo}/${tenantId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'PlantLogo', id: tenantId }],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Logo uploaded successfully!',
          errorMessage: 'Logo upload failed!',
          duration: 4000,
        });
      },
    }),

    //get user logo
    getLogo: builder.query<{ logoUrl: string }, { tenantId: string }>({
      query: ({ tenantId }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.getLogo}/${tenantId}`,
        method: 'GET',
      }),

      providesTags: (result, error, { tenantId }) => [{ type: 'OrganizationLogo', id: tenantId }],

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Logo Fetch successfully!',
      //     errorMessage: 'Failed to Fetch logo!',
      //     duration: 4000,
      //   });
      // },
    }),
  }),
});

export const { useSubmitOrganizationInfoMutation, useGetOrganizationInfoQuery, useUploadOrganizationLogoMutation, useGetLogoQuery } =
  onboardingApi;
