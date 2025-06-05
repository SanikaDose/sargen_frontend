import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';
import { EditPlantApi } from './EditPlant.types';

export const plantInfoApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlantById: builder.query({
      query: ({ tenantId, plantId }) => ({
        url: `${apiControllerPath.plantInfo.root}/${tenantId}/${plantId}${apiControllerPath.plantInfo.getPlantInfoById}`,
        method: 'GET',
      }),
    }),

    editPlantInfo: builder.mutation<void, { tenantId: string; plantId: string; body: EditPlantApi }>({
      query: ({ tenantId, plantId, body }) => ({
        url: `${apiControllerPath.plantInfo.root}/${tenantId}/${plantId}${apiControllerPath.plantInfo.updatePlantInfo}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { tenantId }) => [{ type: 'Plant', id: tenantId }],
    }),

    // 📤 Upload Plant Logo
    uploadPlantLogo: builder.mutation<void, { tenantId: string; plantId: string; formData: FormData }>({
      query: ({ tenantId, plantId, formData }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadPlantLogo}/${tenantId}/${plantId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: (result, error, { plantId }) => [{ type: 'PlantLogo', id: plantId }],
    }),

    // 📥 Get Plant Logo
    getPlantLogo: builder.query<string, { tenantId: string; plantId: string }>({
      query: ({ tenantId, plantId }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.getPlantLogo}/${tenantId}/${plantId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { plantId }) => [{ type: 'PlantLogo', id: plantId }],
    }),
  }),
});

export const { useEditPlantInfoMutation, useGetPlantByIdQuery, useUploadPlantLogoMutation } = plantInfoApi;
