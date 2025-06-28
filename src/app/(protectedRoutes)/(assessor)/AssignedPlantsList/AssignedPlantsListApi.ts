import { apiRoutes } from '@/constants/apiRoutes';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { GetAllAssignedPlantsResponse } from './AssignPlantList.type';

export const assessorAsignPlantApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignPlant: builder.query<GetAllAssignedPlantsResponse, string>({
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
  }),
});

export const { useGetSpecificPlantInfoQuery, useGetAllAssignPlantQuery } = assessorAsignPlantApi;
