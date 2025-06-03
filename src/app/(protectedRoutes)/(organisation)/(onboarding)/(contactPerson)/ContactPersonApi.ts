import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { PocPayload } from './ContactPerson.types';
import { apiControllerPath } from '@/store/api/routes';

export const onboardingApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    addPointOfContact: builder.mutation<void, { tenantId: string; body: PocPayload }>({
      query: ({ tenantId, body }) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.addPointOfContact}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Poc'],
    }),
    getPointOfContact: builder.query<PocPayload, string>({
      query: (tenantId) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.getPointOfContact}`,
        method: 'GET',
      }),
      providesTags: (result, error, tenantId) => [{ type: 'Poc', id: tenantId }],
    }),
  }),
  overrideExisting: false,
});

export const { useAddPointOfContactMutation, useGetPointOfContactQuery } = onboardingApi;
