import { apiRoutes } from '@/constants/apiRoutes';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';

export const assessorAsignPlantApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignPlant: builder.query<any, string>({
      query: (tenantId) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.getAllAssignedPlants}/${tenantId}`,
        method: 'GET',
      }),
      providesTags: (result, error, tenantId) => [{ type: 'Plant', id: tenantId }],
    }),
    getSpecificPlantInfo: builder.query({
      query: ({ organisationId, plantId }) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.getAssignedPlantinfo}/${organisationId}/${plantId}`,
        method: 'GET',
      }),
      providesTags: ['SpecificPlantInfo'],
    }),
    getAssessorMetadata: builder.query({
      query: (tenantId) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.getAllMetaData}/${tenantId}`,
        method: 'GET',
      }),
      providesTags: ['AssessorMetadata'],
    }),
    postAssessorMetadataToPlant: builder.mutation({
      query: (body) => ({
        url: `${apiRoutes.assessorFlow.root}${apiRoutes.assessorFlow.assignMetadata}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AssessorMetadata', 'SpecificPlantInfo'],
    }),
  }),
});

export const {
  useGetSpecificPlantInfoQuery,
  useGetAssessorMetadataQuery,
  usePostAssessorMetadataToPlantMutation,
  useGetAllAssignPlantQuery,
} = assessorAsignPlantApi;
