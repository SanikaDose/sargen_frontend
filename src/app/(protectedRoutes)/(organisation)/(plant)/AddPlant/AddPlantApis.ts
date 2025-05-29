// import { protectedApi } from "@/services/api";
// import { apiControllerPath } from "@/services/routeConstants";
// import { rtkAPIToast } from "@/utils/rtkAPIToast";

// interface AddPlant {
//   name: string;
//   location: string;
//   registrationNo: string;
//   revenue: number;
//   type: string;
//   age: number;
//   numberOfEmployees: number;
//   numberOfLines: number;
//   assessmentStartDate: string;
//   debriefDate: string;
// }

// export const plantInfoApi = protectedApi.injectEndpoints({
//   endpoints: (builder) => ({
//     addPlantInfo: builder.mutation<void, { tenantId: string; body: AddPlant }>({
//       query: ({ tenantId, body }) => ({
//         url: `${apiControllerPath.plantInfo.root}/${tenantId}${apiControllerPath.plantInfo.addPlantInfo}`,
//         method: "POST",
//         body,
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         await rtkAPIToast(queryFulfilled, dispatch, {
//           successMessage: "Plant Information Added Succesfully!",
//           errorMessage: "Failed To Add Plant Information!",
//           duration: 4000,
//         });
//       },
//       invalidatesTags: (result, error, { tenantId }) => [{ type: "Plant", id: tenantId }],
//     }),
//   }),
// });

// export const { useAddPlantInfoMutation } = plantInfoApi;
