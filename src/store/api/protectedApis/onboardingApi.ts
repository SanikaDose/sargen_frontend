import { apiControllerPath } from '../routes';
import { protectedApi } from './baseProtectedApi';

export const onboarding = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrganizationsInformation: builder.mutation<void, { tenantId: string; body: unknown }>({
      query: ({ tenantId, body }) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.addOrganizationsInformation}`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useAddOrganizationsInformationMutation } = onboarding;
