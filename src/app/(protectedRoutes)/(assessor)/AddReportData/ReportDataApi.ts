import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { apiRoutes } from '@/constants/apiRoutes';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';

export const reportDataApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportData: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.getReportData}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assessor'],
    }),
    addAboutTheCompany: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.addAboutTheCompany}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assessor'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'About Company submitted successfully!',
          errorMessage: 'Failed to submit About Company!',
        });
      },
    }),
    addIntroduction: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.addIntroduction}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assessor'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Introduction submitted successfully!',
          errorMessage: 'Failed to submit introduction!',
        });
      },
    }),
    addSummaryOfObservationsAndRecommendations: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.addSummaryOfObservationsAndRecommendations}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assessor'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Summary submitted successfully!',
          errorMessage: 'Failed to submit summary!',
        });
      },
    }),
    addRoi: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.addRoi}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assessor'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'ROI submitted successfully!',
          errorMessage: 'Failed to submit ROI!',
        });
      },
    }),
    addComment: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.addComment}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assessor'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Comment submitted successfully!',
          errorMessage: 'Failed to submit comment!',
        });
      },
    }),
  }),
});

export const {
  useGetReportDataMutation,
  useAddAboutTheCompanyMutation,
  useAddIntroductionMutation,
  useAddSummaryOfObservationsAndRecommendationsMutation,
  useAddRoiMutation,
  useAddCommentMutation,
} = reportDataApi;
