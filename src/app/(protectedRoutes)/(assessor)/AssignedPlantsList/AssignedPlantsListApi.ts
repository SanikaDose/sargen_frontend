import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';

export const assessorAsignPlantApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecificPlantInfo: builder.query({
      query: ({ organisationId, plantId }) => ({
        url: `${apiControllerPath.assessorFlow.root}${apiControllerPath.assessorFlow.getAssignedPlantinfo}/${organisationId}/${plantId}`,
        method: 'GET',
      }),
      providesTags: ['SpecificPlantInfo'],
    }),
    getAssessorMetadata: builder.query({
      query: (tenantId) => ({
        url: `${apiControllerPath.assessorFlow.root}${apiControllerPath.assessorFlow.getAllMetaData}/${tenantId}`,
        method: 'GET',
      }),
      providesTags: ['AssessorMetadata'],
    }),
    postAssessorMetadataToPlant: builder.mutation({
      query: (body) => ({
        url: `${apiControllerPath.assessorFlow.root}${apiControllerPath.assessorFlow.assignMetadata}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AssessorMetadata', 'SpecificPlantInfo'],
    }),
  }),
});

export const { useGetSpecificPlantInfoQuery, useGetAssessorMetadataQuery, usePostAssessorMetadataToPlantMutation } =
  assessorAsignPlantApi;
