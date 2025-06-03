import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';
import { PlantPointOfContactType } from './PointOfContact.types';

export const plantInfoApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    addPlantInfo: builder.mutation<void, { tenantId: string; body: PlantPointOfContactType }>({
      query: ({ tenantId, body }) => ({
        url: `${apiControllerPath.plantInfo.root}/${tenantId}${apiControllerPath.plantInfo.addPlantInfo}`,
        method: 'POST',
        body,
      }),

      invalidatesTags: (result, error, { tenantId }) => [{ type: 'Plant', id: tenantId }],
    }),
    //edit plant information
    editPlantInfo: builder.mutation<void, { tenantId: string; plantId: string; body: PlantPointOfContactType }>({
      query: ({ tenantId, plantId, body }) => ({
        url: `${apiControllerPath.plantInfo.root}/${tenantId}/${plantId}${apiControllerPath.plantInfo.updatePlantInfo}`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: (result, error, { tenantId }) => [{ type: 'Plant', id: tenantId }],
    }),

    // 📤 Upload Plant Logo
    uploadPlantPointOfContactLogo: builder.mutation<void, { tenantId: string; plantId: string; formData: FormData }>({
      query: ({ tenantId, plantId, formData }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadPlantPointOfContactLogo}/${tenantId}/${plantId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: (result, error, { plantId }) => [{ type: 'PlantLogo', id: plantId }],
    }),

    // 📥 Get Plant Logo
    getPlantPointOfLogo: builder.query<string, { tenantId: string; plantId: string }>({
      query: ({ tenantId, plantId }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.getPlantPointOfContactLogo}/${tenantId}/${plantId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { plantId }) => [{ type: 'PlantLogo', id: plantId }],
    }),
  }),
});

export const {
  useAddPlantInfoMutation,
  useEditPlantInfoMutation,
  useGetPlantPointOfLogoQuery,
  useUploadPlantPointOfContactLogoMutation,
} = plantInfoApi;
