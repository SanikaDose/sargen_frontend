// import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
// import { apiControllerPath } from '@/store/api/routes';
// // import { rtkAPIToast } from "@/utils/rtkAPIToast";

// interface getOrgPayload {
//   firstName: string;
//   lastName: string;
//   email: string;
//   contactNumber: number;
//   city: string;
//   country: string;
//   yearOfExperience: number;
//   certificationYear: number;
//   siriCertificate: File;
// }

// export const assessorApi = protectedApi.injectEndpoints({
//   endpoints: (builder) => ({
//     addAssessorInformation: builder.mutation({
//       query: ({ tenantId, data, siriCertificate }) => {
//         const formData = new FormData();
//         formData.append('data', JSON.stringify(data));

//         if (siriCertificate) {
//           formData.append('siriCertificate', siriCertificate);
//         }
//         return {
//           url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.addAssessorInformation}${tenantId}`,
//           method: 'POST',
//           body: formData,
//         };
//       },
//       //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//       //     await rtkAPIToast(queryFulfilled, dispatch, {
//       //       successMessage: "Assessor Information added successfully!",
//       //       errorMessage: "Assessor info failed!",
//       //       duration: 4000,
//       //     });
//       //   },
//     }),
//     // updateAssessorInformation: builder.mutation({
//     //   query: ({ tenantId, data, siriCertificate }) => {
//     //     const formData = new FormData();
//     //     formData.append("data", JSON.stringify(data));

//     //     if (siriCertificate) {
//     //       formData.append("siriCertificate", siriCertificate);
//     //     }
//     //     return {
//     //       url: ${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.updateAssessorInformation}${tenantId},
//     //       method: "POST",
//     //       body: formData,
//     //     };
//     //   },
//     //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//     //     await rtkAPIToast(queryFulfilled, dispatch, {
//     //       successMessage: "Assessor Information added successfully!",
//     //       errorMessage: "Assessor info failed!",
//     //       duration: 4000,
//     //     });
//     //   },
//     // }),

//     //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//     //     await rtkAPIToast(queryFulfilled, dispatch, {
//     //       successMessage: "Assessor Information added successfully!",
//     //       errorMessage: "Assessor info failed!",
//     //       duration: 4000,
//     //     });
//     //   },

//     uploadQuestionnaries: builder.mutation({
//       query: ({ tenantId, file }) => {
//         const formData = new FormData();

//         if (file.questionnaires) {
//           formData.append('questionnaires', file.questionnaires);
//         }

//         return {
//           url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadQuestionnaires}${tenantId}`,
//           method: 'POST',
//           body: formData,
//         };
//       },
//       //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//       //     await rtkAPIToast(queryFulfilled, dispatch, {
//       //       successMessage: "Metadata uploaded successful!",
//       //       errorMessage: "Metadata Upload failed!",
//       //       duration: 4000,
//       //     });
//       //   },
//     }),

//     getMetadataFileTemplate: builder.mutation<Response, { userType: string; fileName: string }>({
//       query: ({ userType, fileName }) => ({
//         url: `${apiControllerPath.metadataFileTemplate.root}${apiControllerPath.metadataFileTemplate.getMetadataFile}`,
//         method: 'POST',
//         body: { userType, fileName },
//         responseHandler: (response) => Promise.resolve(response),
//         cache: 'no-cache',
//       }),
//       //   async onQueryStarted({ fileName }, { dispatch, queryFulfilled }) {
//       //     await rtkAPIToast(queryFulfilled, dispatch, {
//       //       successMessage: ${fileName}.xlsx File Template downloaded successfully!,
//       //       errorMessage: "Failed to download!",
//       //       // duration: 8000,
//       //     });
//       //   },
//     }),

//     getMetadataInformation: builder.query({
//       query: (tenantId: string) => ({
//         url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.getMetadataInformation}`,
//         method: 'POST',
//         body: { tenantId },
//       }),
//       //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//       //     await rtkAPIToast(queryFulfilled, dispatch, {
//       //       successMessage: "Fetched Metadata Information successfully!",
//       //       errorMessage: "Fetching Metadata Information failed!",
//       //       duration: 4000,
//       //     });
//       //   },
//     }),

//     uploadAssessorLogo: builder.mutation<void, { tenantId: string; formData: FormData }>({
//       query: ({ tenantId, formData }) => ({
//         url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadLogo}/${tenantId}`,
//         method: 'POST',
//         body: formData,
//       }),

//       //  invalidatesTags: (result, error, { tenantId }) => [{ type: 'PlantLogo', id: tenantId }],
//     }),

//     getAssessorInfo: builder.query<getOrgPayload & { id: number; createdAt: string; updatedAt: string }, string>({
//       query: (tenantId) => ({
//         url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.getAssessorInformation}${tenantId}`,
//         method: 'GET',
//       }),
//     }),
//   }),

//   overrideExisting: false,
// });

// export const {
//   useAddAssessorInformationMutation,
//   useGetMetadataFileTemplateMutation,
//   useUploadQuestionnariesMutation,
//   useGetMetadataInformationQuery,
//   useGetAssessorInfoQuery,

//   useUploadAssessorLogoMutation,
// } = assessorApi;

import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';
// import { rtkAPIToast } from "@/utils/rtkAPIToast";

interface getOrgPayload {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number;
  city: string;
  country: string;
  yearOfExperience: number;
  certificationYear: number;
  siriCertificate: File;
}

export const assessorApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    addAssessorInformation: builder.mutation({
      query: ({ tenantId, data, siriCertificate }) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (siriCertificate) {
          formData.append('siriCertificate', siriCertificate);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.addAssessorInformation}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadQuestionnaries: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('questionnaires_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadQuestionnaires}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadCostProfile: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('cost_profile_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadCostProfile}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadKPI: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('kpi_selection_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadKPI}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadPlanningHorizon: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('planning_horizon_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadPlanningHorizon}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadIndustrySelection: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('industry_selection_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadIndustrySelection}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadCostProfileLookup: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('cost_lookup_table_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadCostProfileLookup}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadIndustrySelectionLookup: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('industry_selection_lookup_table_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadIndustrySelectionLookup}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadKPILookup: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('kpi_lookup_table_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadKPILookup}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadIndustryAssessmentMatrix: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('assessment_matrix_score_lookup_table_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadIndustryAssessmentMatrix}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadSolutionMetadata: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('solutions_with_band_weights_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadSolutionMetadata}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadBandDefinition: builder.mutation({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('band_definition_table_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadBandDefinition}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    getMetadataFileTemplate: builder.mutation<Response, { userType: string; fileName: string }>({
      query: ({ userType, fileName }) => ({
        url: `${apiControllerPath.metadataFileTemplate.root}${apiControllerPath.metadataFileTemplate.getMetadataFile}`,
        method: 'POST',
        body: { userType, fileName },
        responseHandler: (response) => Promise.resolve(response),
        cache: 'no-cache',
      }),
    }),

    getMetadataInformation: builder.query({
      query: (tenantId: string) => ({
        url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.getMetadataInformation}`,
        method: 'POST',
        body: { tenantId },
      }),
    }),

    uploadAssessorLogo: builder.mutation<void, { tenantId: string; formData: FormData }>({
      query: ({ tenantId, formData }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadLogo}/${tenantId}`,
        method: 'POST',
        body: formData,
      }),
    }),

    viewMetadataFile: builder.mutation({
      query: ({ tenantId, fileName }) => {
        // const formData = new FormData();
        // if (file) {
        //   formData.append('kpiSelectionLookUpTable', file);
        // }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.viewMetadataFile}`,
          method: 'POST',
          body: { tenantId, fileName },
        };
      },
    }),
    getAssessorInfo: builder.query<getOrgPayload & { id: number; createdAt: string; updatedAt: string }, string>({
      query: (tenantId) => ({
        url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.getAssessorInformation}${tenantId}`,
        method: 'GET',
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddAssessorInformationMutation,
  useGetMetadataFileTemplateMutation,
  useGetMetadataInformationQuery,
  useGetAssessorInfoQuery,
  useUploadAssessorLogoMutation,

  useUploadQuestionnariesMutation,
  useUploadCostProfileMutation,
  useUploadKPIMutation,
  useUploadPlanningHorizonMutation,
  useUploadIndustrySelectionMutation,
  useUploadCostProfileLookupMutation,
  useUploadIndustrySelectionLookupMutation,
  useUploadKPILookupMutation,
  useUploadIndustryAssessmentMatrixMutation,
  useUploadSolutionMetadataMutation,
  useUploadBandDefinitionMutation,

  useViewMetadataFileMutation,
} = assessorApi;
