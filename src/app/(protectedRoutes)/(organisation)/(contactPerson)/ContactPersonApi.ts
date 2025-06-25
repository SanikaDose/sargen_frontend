import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { ContactPersonApiResponse, OnboardingStatusResponse, PocPayload } from './ContactPerson.types';
import { apiRoutes } from '@/constants/apiRoutes';
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';

export const onboardingApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    addPointOfContact: builder.mutation<void, { tenantId: string; body: PocPayload }>({
      query: ({ tenantId, body }) => ({
        url: `${apiRoutes.onboarding.root}/${tenantId}${apiRoutes.onboarding.addPointOfContact}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Poc'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Contact Details submitted successfully!',
          errorMessage: 'Failed to submit Contact Details!',
        });
      },
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
        url: `${apiRoutes.userLogos.root}${apiRoutes.userLogos.uploadPocProfilePic}/${tenantId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: (result, error, { tenantId }) => [{ type: 'ProfilePic', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Profile Image uploaded successfully!',
          errorMessage: 'Failed to upload Profile Image!',
        });
      },
    }),

    getPocProfilePic: builder.query<string, { tenantId: string }>({
      query: ({ tenantId }) => ({
        url: `${apiRoutes.userLogos.root}${apiRoutes.userLogos.getPocProfilePic}/${tenantId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { tenantId }) => [{ type: 'ProfilePic', id: tenantId }],
    }),

    getOnboardingStatus: builder.query<OnboardingStatusResponse, { tenantId: string }>({
      query: ({ tenantId }) => ({
        url: `${apiRoutes.onboardingStatus.root}/${tenantId}${apiRoutes.onboardingStatus.getOnboardingStatus}`,
        method: 'GET',
      }),
      providesTags: (result, error, { tenantId }) => [{ type: 'Poc', id: tenantId }],
    }),
  }),
});

export const {
  useAddPointOfContactMutation,
  useGetPointOfContactQuery,
  useUploadPocProfilePicMutation,
  useGetPocProfilePicQuery,
  useLazyGetOnboardingStatusQuery,
} = onboardingApi;
