import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiRoutes } from '@/constants/apiRoutes';
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { AsseessmentStatus } from '@/constants/enums';

export const ReportApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    // createReport: builder.mutation({
    //   query: (body) => ({
    //     url: `${apiRoutes.report.root}${apiRoutes.report.createReport}`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['SpecificPlantInfo'],
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     await rtkAPIToast(queryFulfilled, dispatch, {
    //       successMessage: 'Generating report',
    //       errorMessage: 'Failed To Generate Report!',
    //     });
    //   },
    // }),
    viewReport: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.report.root}${apiRoutes.report.finalizedReport}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SpecificPlantInfo'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Preview The Report',
          errorMessage: 'Failed to Preview Report',
        });
      },
    }),
    downloadReport: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.report.root}${apiRoutes.report.downloadreport}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SpecificPlantInfo'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Download report',
          errorMessage: 'Failed To Download Report!',
        });
      },
    }),

    changeAssessmentStatus: builder.mutation<
      boolean,
      { tenantId: string; plantId: string; assessment: AsseessmentStatus.FINISH_ASSESSMENT }
    >({
      query: (body) => ({
        url: `${apiRoutes.plantAssessment.root}${apiRoutes.plantAssessment.changeAssessmentStatus}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: 'Plant', id: tenantId }],
    }),
  }),
});

export const { useViewReportMutation, useDownloadReportMutation, useChangeAssessmentStatusMutation } = ReportApi;
