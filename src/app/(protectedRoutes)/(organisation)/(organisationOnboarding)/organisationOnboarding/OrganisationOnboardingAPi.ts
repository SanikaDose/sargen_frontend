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
  };
}

export interface PocPayload {
  message: string;
  success: boolean;
  data: {
    firstName: string;
    lastName: string;
    employeeId: string;
    email: string;
    contactNumber: string;
    designation: string;
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

      // Invalidate the Organization tag when new data is submitted
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'Organisation', id: tenantId }],

      // Show toast on success/failure using reusable utility
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Organization Onboarded successfully!',
          errorMessage: 'Organization Onboarding failed!',
          duration: 4000,
        });
      },
    }),

    // Submit Point of Contact (invalidates the corresponding cache)
    submitPointOfContact: builder.mutation<void, { tenantId: string; body: PocPayload }>({
      query: ({ tenantId, body }) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.addPointOfContact}`,
        method: 'POST',
        body,
      }),

      // Invalidate the Point of Contact tag when new data is submitted
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'Poc', id: tenantId }],

      
    }),

    // Get Organization Info (provides a tag)
    getOrganizationInfo: builder.query<getOrgPayload, string>({
      query: (tenantId) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.getOrganizationsInformation}`,
        method: 'GET',
      }),
      // Provide a tag so that the cache can be updated later when necessary
      providesTags: (result, error, tenantId) => [{ type: 'Organisation', id: tenantId }],
    }),

    // Get Point of Contact Info (provides a tag)
    getPointOfConnectInfo: builder.query<PocPayload, string>({
      query: (tenantId) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.getPointOfContact}`,
        method: 'GET',
      }),
      // Provide a tag so that the cache can be updated later when necessary
      providesTags: (result, error, tenantId) => [{ type: 'Poc', id: tenantId }],
    }),
    // 📤 Upload Plant Logo
    uploadOrganizationLogo: builder.mutation<void, { tenantId: string; formData: FormData }>({
      query: ({ tenantId, formData }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadLogo}/${tenantId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: (result, error, { tenantId }) => [{ type: 'PlantLogo', id: tenantId }],
    }),
  }),
});

export const {
  useSubmitOrganizationInfoMutation,
  useSubmitPointOfContactMutation,
  useGetOrganizationInfoQuery,
  useGetPointOfConnectInfoQuery,
  useUploadOrganizationLogoMutation,
} = onboardingApi;
