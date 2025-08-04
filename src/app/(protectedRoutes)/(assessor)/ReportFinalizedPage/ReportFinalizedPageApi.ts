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
    viewFinalReport: builder.mutation({
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
    // downloadReport: builder.mutation({
    //   query: (body) => ({
    //     url: `${apiRoutes.report.root}${apiRoutes.report.downloadreport}`,
    //     method: 'POST',
    //     body,
    //   }),
    // invalidatesTags: ['SpecificPlantInfo'],
    // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //   await rtkAPIToast(queryFulfilled, dispatch, {
    //     successMessage: 'Download report',
    //     errorMessage: 'Failed To Download Report!',
    //   });
    // },
    // }),
    downloadReport: builder.mutation<{ blob: Blob; filename: string }, { tenantId: string; plantId: string }>({
      query: (body) => ({
        url: `${apiRoutes.report.root}${apiRoutes.report.downloadreport}`,
        method: 'POST',
        body,
        responseHandler: async (response) => {
          const blob = await response.blob();
          const contentDisposition = response.headers.get('Content-Disposition') || '';
          let filename = 'Report.pdf';

          // Extract filename from Content-Disposition header if present
          const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (match && match[1]) {
            filename = match[1].replace(/['"]/g, '');
          }

          return { blob, filename };
        },
        headers: {
          'Content-Type': 'application/json',
        },
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

export const { useViewFinalReportMutation, useDownloadReportMutation, useChangeAssessmentStatusMutation } = ReportApi;
