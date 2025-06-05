import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { ContactPersonApiResponse, PocPayload } from './ContactPerson.types';
import { apiRoutes } from '@/constants/apiRoutes';
import { apiControllerPath } from '@/store/api/routes';

export const onboardingApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    addPointOfContact: builder.mutation<void, { tenantId: string; body: PocPayload }>({
      query: ({ tenantId, body }) => ({
        url: `${apiRoutes.onboarding.root}/${tenantId}${apiRoutes.onboarding.addPointOfContact}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Poc'],
    }),

    getPointOfContact: builder.query<ContactPersonApiResponse<PocPayload>, string>({
      query: (tenantId) => ({
        url: `${apiRoutes.onboarding.root}/${tenantId}${apiRoutes.onboarding.getPointOfContact}`,
        method: 'GET',
      }),
      providesTags: (result, error, tenantId) => [{ type: 'Poc', id: tenantId }],
    }),

    uploadPocProfilePic: builder.mutation<void, { tenantId: string; formData: FormData }>({
      query: ({ tenantId, formData }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadPocProfilePic}/${tenantId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: (result, error, { tenantId }) => [{ type: 'ProfilePic', id: tenantId }],
    }),

    getPocProfilePic: builder.query<string, { tenantId: string }>({
      query: ({ tenantId }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.getPocProfilePic}/${tenantId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { tenantId }) => [{ type: 'ProfilePic', id: tenantId }],
    }),
  }),
});

export const {
  useAddPointOfContactMutation,
  useGetPointOfContactQuery,
  useUploadPocProfilePicMutation,
  useGetPocProfilePicQuery,
} = onboardingApi;
