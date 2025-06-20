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
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Get Cost Category Data successfully!',
      //     errorMessage: 'Cost Category Data failed to Get!',
      //     duration: 4000,
      //   });
      // },
    }),
    addCostCategories: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.addCostCategories}`,
        method: 'POST',
        body: payload,
      }),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Posted Cost Category Data successfully!',
      //     errorMessage: 'Cost Category Data failed to Post!',
      //     duration: 4000,
      //   });
      // },
    }),
    getKPIDefinition: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.getKpiDefinition}`,
        method: 'POST',
        body: payload,
      }),
    }),
    selectKPIDefinition: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.selectKpiDefinition}`,
        method: 'POST',
        body: payload,
      }),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Post KPI Definition Data successfully!',
      //     errorMessage: 'KPI Definition Data failed to Post!',
      //     duration: 4000,
      //   });
      // },
    }),
    getPlanningHorizonList: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.getPlanningHorizon}`,
        method: 'POST',
        body: payload,
      }),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Got Planning Horizon Data successfully!',
      //     errorMessage: 'Planning Horizon Data failed to GET!',
      //     duration: 4000,
      //   });
      // },
    }),
    selectPlanningHorizonList: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.selectPlanningHorizon}`,
        method: 'POST',
        body: payload,
      }),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Posted Planning Horizon Data successfully!',
      //     errorMessage: 'Planning Horizon Data failed to Post!',
      //     duration: 4000,
      //   });
      // },
    }),
    getIndustrySelectionList: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.getIndustrySelectionList}`,
        method: 'POST',
        body: payload,
      }),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Got Industry Selection List Data successfully!',
      //     errorMessage: 'Industry Selection List Data failed to Post!',
      //     duration: 4000,
      //   });
      // },
    }),
    selectIndustrySelectionList: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.selectIndustrySelectionList}`,
        method: 'POST',
        body: payload,
      }),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Posted Industry SelectionList Data successfully!',
      //     errorMessage: 'Industry SelectionList Data failed to Post!',
      //     duration: 4000,
      //   });
      // },
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
    getAssesmentStatus: builder.mutation({
      query: (payload) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.getAssessmentStatus}`,
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
  useGetAssesmentStatusMutation,
} = plantAssessmentApi;
