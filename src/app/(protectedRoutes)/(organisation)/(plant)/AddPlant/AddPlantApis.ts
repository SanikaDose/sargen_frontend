import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';
import { AddPlantApi } from './AddPlant.types';
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';

export const plantInfoApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    addPlantInfo: builder.mutation<void, { tenantId: string; body: AddPlantApi }>({
      query: ({ tenantId, body }) => ({
        url: `${apiControllerPath.plantInfo.root}/${tenantId}${apiControllerPath.plantInfo.addPlantInfo}`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Plant Information Added successfully!',
          errorMessage: 'Falied To Add Plant Information',
          duration: 4000,
        });
      },

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

export const { useAddPlantInfoMutation, useGetPlantLogoQuery, useUploadPlantLogoMutation } = plantInfoApi;
