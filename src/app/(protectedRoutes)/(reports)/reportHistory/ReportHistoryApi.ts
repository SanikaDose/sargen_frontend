// Updated ReportHistoryApi.ts
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
  }),
});

export const { useGetAllReportsQuery } = onboardingApi;
