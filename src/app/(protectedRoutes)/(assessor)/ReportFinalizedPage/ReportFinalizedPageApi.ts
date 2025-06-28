import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiRoutes } from '@/constants/apiRoutes';
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';

export const ReportApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.report.root}${apiRoutes.report.createReport}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SpecificPlantInfo'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Generating report',
          errorMessage: 'Failed To Generate Report!',
        });
      },
    }),
    viewReport: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.report.root}${apiRoutes.report.previewReport}`,
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
  }),
});

export const { useCreateReportMutation, useViewReportMutation } = ReportApi;
