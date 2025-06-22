import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiRoutes } from '@/constants/apiRoutes';
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';

export const AssessorApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssessorMetadata: builder.query<any, string>({
      query: (tenantId) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.getAllMetaData}/${tenantId}`,
        method: 'GET',
      }),
      providesTags: ['AssessorMetadata'],
    }),

    postAssessorMetadataToPlant: builder.mutation<any, any>({
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
          duration: 4000,
        });
      },
    }),
  }),
});

export const { useGetAssessorMetadataQuery, usePostAssessorMetadataToPlantMutation } = AssessorApi;
