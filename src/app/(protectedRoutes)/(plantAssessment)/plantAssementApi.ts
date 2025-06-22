import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';

export const plantAssessmentApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getCostCategories: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.getCostCategories}`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Cost Category Data fetched successfully!',
          errorMessage: 'Cost Category Data failed to fetch!',
        });
      },
    }),
    addCostCategories: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.addCostCategories}`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Cost Category Data saved successfully!',
          errorMessage: 'Cost Category Data failed to save!',
        });
      },
    }),
    getKPIDefinition: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.getKpiDefinition}`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'KPI Definition Data fetched successfully!',
          errorMessage: 'KPI Definition Data failed to fetch!',
        });
      },
    }),
    selectKPIDefinition: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.selectKpiDefinition}`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'KPI Definition Data saved successfully!',
          errorMessage: 'KPI Definition Data failed to save!',
        });
      },
    }),
    getPlanningHorizonList: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.getPlanningHorizon}`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Planning Horizon Data fetched successfully!',
          errorMessage: 'Planning Horizon Data failed to fetch!',
        });
      },
    }),
    selectPlanningHorizonList: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.selectPlanningHorizon}`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Planning Horizon Data saved successfully!',
          errorMessage: 'Planning Horizon Data failed to save!',
        });
      },
    }),
    getIndustrySelectionList: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.getIndustrySelectionList}`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Industry Selection List Data fetched successfully!',
          errorMessage: 'Industry Selection List Data failed to fetch!',
        });
      },
    }),
    selectIndustrySelectionList: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.selectIndustrySelectionList}`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Industry Selection List Data saved successfully!',
          errorMessage: 'Industry Selection List Data failed to save!',
        });
      },
    }),
    getQuestionnairesList: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.getQuestionnairesList}`,
        method: 'POST',
        body: payload,
      }),
    }),
    selectQuestionnairesAnswer: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.selectQuestionnairesAnswer}`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});
export const {
  useGetCostCategoriesMutation,
  useAddCostCategoriesMutation,
  useGetKPIDefinitionMutation,
  useSelectKPIDefinitionMutation,
  useGetPlanningHorizonListMutation,
  useSelectPlanningHorizonListMutation,
  useGetIndustrySelectionListMutation,
  useSelectIndustrySelectionListMutation,
  useGetQuestionnairesListMutation,
  useSelectQuestionnairesAnswerMutation,
} = plantAssessmentApi;
