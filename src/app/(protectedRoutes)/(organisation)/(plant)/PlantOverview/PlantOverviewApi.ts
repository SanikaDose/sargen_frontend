import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';
import { PlantInfoResponse } from './PlantOverview.type';
import { AsseessmentStatus } from '@/constants/enums';

export const plantInfoApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get plant info
    getAllPlantInfo: builder.query<PlantInfoResponse, { tenantId: string; search?: string }>({
      query: ({ tenantId, search }) => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);

        return {
          url: `${apiControllerPath.plantInfo.root}/${tenantId}${apiControllerPath.plantInfo.getAllPlantsInfo}?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, { tenantId }) => [{ type: 'Plant', id: tenantId }],
    }),

    // plantAssessmentApi.ts
    changeAssessmentStatus: builder.mutation<
      boolean,
      { tenantId: string; plantId: string; assessment: AsseessmentStatus.REQUESTED_ASSESSMENT }
    >({
      query: (body) => ({
        url: `${apiControllerPath.plantAssessment.root}${apiControllerPath.plantAssessment.changeAssessmentStatus}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: 'Plant', id: tenantId }],
    }),

    // 📥 Get Plant Logo
    getPlantLogo: builder.query<string, { tenantId: string; plantId: string }>({
      query: ({ tenantId, plantId }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.getPlantLogo}/${tenantId}/${plantId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { plantId }) => [{ type: 'PlantLogo', id: plantId }],
    }),

    //get assesment status
  }),
});

// Export hooks for using the endpoints in components
export const { useGetAllPlantInfoQuery, useGetPlantLogoQuery, useChangeAssessmentStatusMutation } = plantInfoApi;
