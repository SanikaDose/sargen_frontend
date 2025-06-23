import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiRoutes } from '@/constants/apiRoutes';
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';

export const RuleEngineApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    startAssessmentRuleEngine: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.plantAssessment.root}${apiRoutes.plantAssessment.startAssessmentRuleEngine}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SpecificPlantInfo'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Rule Engine Started Successfully!',
          errorMessage: 'Failed To start Rule Engine!',
        });
      },
    }),
  }),
});

export const { useStartAssessmentRuleEngineMutation } = RuleEngineApi;
