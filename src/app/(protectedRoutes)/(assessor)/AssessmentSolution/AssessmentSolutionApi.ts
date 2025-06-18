import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { apiRoutes } from '@/constants/apiRoutes';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';

export const solutionSelectionApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getSolutionsByImpact: builder.query({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.getSolutionsByImpactValuesSelected}`,
        method: 'POST',
        body,
      }),
      providesTags: ['Solutions'],
    }),
    selectSolutionsByImpact: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.selectSolutionsByImpactValuesSelected}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Solutions'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Solutions submitted successfully!',
          errorMessage: 'Failed to submit solutions!',
        });
      },
    }),
  }),
});

export const { useGetSolutionsByImpactQuery, useSelectSolutionsByImpactMutation } = solutionSelectionApi;
