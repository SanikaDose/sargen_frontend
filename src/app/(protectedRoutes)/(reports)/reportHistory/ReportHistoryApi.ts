// ReportHistoryApi.ts
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { apiRoutes } from '@/constants/apiRoutes';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { ReportData } from './ReportHistory.types';

export const onboardingApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query<ReportData[], { tenantId: string }>({
      query: ({ tenantId }) => ({
        url: `${apiRoutes.report.root}${apiRoutes.report.getAllReports}`,
        method: 'POST',
        body: { tenantId },
      }),
      providesTags: (result, error, { tenantId }) => [{ type: 'Poc', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Reports fetched successfully!',
          errorMessage: 'Failed to fetch reports!',
        });
      },
    }),

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
  }),
});

export const { useGetAllReportsQuery, useDownloadReportMutation } = onboardingApi;
