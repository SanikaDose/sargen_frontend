import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiRoutes } from '@/constants/apiRoutes';
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { AsseessmentStatus } from '@/constants/enums';
import { apiControllerPath } from '@/store/api/routes';

export const AssessorApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch assessor metadata
    getAssessorMetadata: builder.query({
      query: (tenantId) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.getAllMetaData}/${tenantId}`,
        method: 'GET',
      }),
      providesTags: ['AssessorMetadata'],
    }),

    // Post assessor metadata to a specific plant
    postAssessorMetadataToPlant: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.assignMetadata}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AssessorMetadata', 'SpecificPlantInfo'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Metadata Assigned Successfully!',
          errorMessage: 'Failed To Assign Metadata!',
        });
      },
    }),

    // Change assessment status for a plant
    changeAssessmentStatus: builder.mutation<
      boolean, // Verify this return type matches what your API actually returns
      { tenantId: string; plantId: string; assessment: AsseessmentStatus.REVIEW_ASSESSMENT }
    >({
      query: (body) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.changeAssessmentStatus}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { plantId }) => [{ type: 'Plant', id: plantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Assessment status updated successfully!',
          errorMessage: 'Failed to update assessment status!',
        });
      },
    }),
  }),
});

export const { useGetAssessorMetadataQuery, usePostAssessorMetadataToPlantMutation, useChangeAssessmentStatusMutation } = AssessorApi;
