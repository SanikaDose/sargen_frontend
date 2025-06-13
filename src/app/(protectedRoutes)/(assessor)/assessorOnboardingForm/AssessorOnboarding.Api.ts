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
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     await rtkAPIToast(queryFulfilled, dispatch, {
      //       successMessage: "Assessor Information added successfully!",
      //       errorMessage: "Assessor info failed!",
      //       duration: 4000,
      //     });
      //   },
    }),
    // updateAssessorInformation: builder.mutation({
    //   query: ({ tenantId, data, siriCertificate }) => {
    //     const formData = new FormData();
    //     formData.append("data", JSON.stringify(data));

    //     if (siriCertificate) {
    //       formData.append("siriCertificate", siriCertificate);
    //     }
    //     return {
    //       url: ${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.updateAssessorInformation}${tenantId},
    //       method: "POST",
    //       body: formData,
    //     };
    //   },
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     await rtkAPIToast(queryFulfilled, dispatch, {
    //       successMessage: "Assessor Information added successfully!",
    //       errorMessage: "Assessor info failed!",
    //       duration: 4000,
    //     });
    //   },
    // }),
    updateAssessorInformation: builder.mutation({
      query: ({ tenantId, data, siriCertificate }) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        // Always send siriCertificate, even if it's empty
        const fileToSend = siriCertificate || new File([], 'empty.pdf', { type: 'application/pdf' });

        formData.append('siriCertificate', fileToSend);

        return {
          url: ` ${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.updateAssessorInformation}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     await rtkAPIToast(queryFulfilled, dispatch, {
      //       successMessage: "Assessor Information added successfully!",
      //       errorMessage: "Assessor info failed!",
      //       duration: 4000,
      //     });
      //   },
    }),

    uploadAllMetadataFiles: builder.mutation({
      query: ({ tenantId, files }) => {
        const formData = new FormData();

        if (files.questionnaires) {
          formData.append('questionnaires', files.questionnaires);
        }
        if (files.costProfile) {
          formData.append('costProfile', files.costProfile);
        }
        if (files.industrySelection) {
          formData.append('industrySelection', files.industrySelection);
        }
        if (files.kpi) {
          formData.append('kpi', files.kpi);
        }
        if (files.planningHorizon) {
          formData.append('planningHorizon', files.planningHorizon);
        }
        if (files.costProfileLookUpTable) {
          formData.append('costProfileLookUpTable', files.costProfileLookUpTable);
        }
        if (files.industrySelectionLookUpTable) {
          formData.append('industrySelectionLookUpTable', files.industrySelectionLookUpTable);
        }
        if (files.kpiSelectionLookUpTable) {
          formData.append('kpiSelectionLookUpTable', files.kpiSelectionLookUpTable);
        }
        if (files.industryAssessmentMatrix) {
          formData.append('industryAssessmentMatrix', files.industryAssessmentMatrix);
        }
        if (files.solutionMetadataTable) {
          formData.append('solutionMetadataTable', files.solutionMetadataTable);
        }
        if (files.bandDefinitionTable) {
          formData.append('bandDefinitionTable', files.bandDefinitionTable);
        }

        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.filestoCSV}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     await rtkAPIToast(queryFulfilled, dispatch, {
      //       successMessage: "Metadata uploaded successful!",
      //       errorMessage: "Metadata Upload failed!",
      //       duration: 4000,
      //     });
      //   },
    }),

    getMetadataFileTemplate: builder.mutation<Response, { userType: string; fileName: string }>({
      query: ({ userType, fileName }) => ({
        url: `${apiControllerPath.metadataFileTemplate.root}${apiControllerPath.metadataFileTemplate.getMetadataFile}`,
        method: 'POST',
        body: { userType, fileName },
        responseHandler: (response) => Promise.resolve(response),
        cache: 'no-cache',
      }),
      //   async onQueryStarted({ fileName }, { dispatch, queryFulfilled }) {
      //     await rtkAPIToast(queryFulfilled, dispatch, {
      //       successMessage: ${fileName}.xlsx File Template downloaded successfully!,
      //       errorMessage: "Failed to download!",
      //       // duration: 8000,
      //     });
      //   },
    }),

    getMetadataInformation: builder.query({
      query: (tenantId: string) => ({
        url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.getMetadataInformation}`,
        method: 'POST',
        body: { tenantId },
      }),
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     await rtkAPIToast(queryFulfilled, dispatch, {
      //       successMessage: "Fetched Metadata Information successfully!",
      //       errorMessage: "Fetching Metadata Information failed!",
      //       duration: 4000,
      //     });
      //   },
    }),


 uploadAssessorLogo: builder.mutation<void, { tenantId: string; formData: FormData }>({
      query: ({ tenantId, formData }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadLogo}/${tenantId}`,
        method: 'POST',
        body: formData,
      }),

    //  invalidatesTags: (result, error, { tenantId }) => [{ type: 'PlantLogo', id: tenantId }],
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
  useUploadAllMetadataFilesMutation,
  useGetMetadataInformationQuery,
  useGetAssessorInfoQuery,
  useUpdateAssessorInformationMutation,
    useUploadAssessorLogoMutation
} = assessorApi;
