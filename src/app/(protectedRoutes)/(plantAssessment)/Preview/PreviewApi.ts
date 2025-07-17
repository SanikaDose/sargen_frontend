import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { AsseessmentStatus } from '@/constants/enums';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';

export const plantAssessmentPreviewApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    changeAssessmentStatus: builder.mutation<
      boolean, // Verify this return type matches what your API actually returns
      { tenantId: string; plantId: string; assessment: AsseessmentStatus.COMPLETED_ASSESSMENT }
    >({
      query: (body) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.changeAssessmentStatus}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: 'Plant', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Assessment status updated successfully!',
          errorMessage: 'Failed to update assessment status!',
        });
      },
    }),
  }),
});

export const { useChangeAssessmentStatusMutation } = plantAssessmentPreviewApi;
