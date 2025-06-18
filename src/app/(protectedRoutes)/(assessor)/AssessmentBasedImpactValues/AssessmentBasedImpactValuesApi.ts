import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { apiRoutes } from '@/constants/apiRoutes';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';

export const AssessmentBasedImpactValuesApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getImpactValues: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.getImpactValues}`,
        method: 'POST',
        body,
      }),
    }),
    getSelectedImpactValues: builder.mutation({
      query: ({ tenantId, plantId }: { tenantId: string; plantId: string }) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.getSelectedImpactValues}`,
        method: 'POST',
        body: { tenantId, plantId },
      }),
    }),
    selectImpactValues: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.selectImpactValues}`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Dimension Selected Data successfully!',
          errorMessage: 'Dimension Selected failed to Post!',
          duration: 4000,
        });
      },
      invalidatesTags: ['Solutions'],
    }),
  }),
});

export const { useGetImpactValuesMutation, useSelectImpactValuesMutation, useGetSelectedImpactValuesMutation } =
  AssessmentBasedImpactValuesApi;
