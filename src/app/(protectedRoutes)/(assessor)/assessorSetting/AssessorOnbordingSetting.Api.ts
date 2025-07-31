import { rtkAPIToast } from '@/app/utils/rtkAPIToast';
import { protectedApi } from '@/store/api/protectedApis/baseProtectedApi';
import { apiControllerPath } from '@/store/api/routes';
import {
  OnboardingStatusResponse,
  getAssessorPayload,
  UploadResponse,
  UploadArgs,
  RawUploadResponse,
  UploadFileMetadata,
} from './AssessorOnbordingSetting.types';

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
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'Assessor', id: tenantId }],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Assessor information added successfully!',
          errorMessage: 'Failed to add assessor information!',
          duration: 4000,
        });
      },
    }),

    uploadQuestionnaries: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Questionnaire metadata uploaded successfully!',
          errorMessage: 'Failed to upload questionnaire metadata!',
          duration: 4000,
        });
      },
    }),

    uploadCostProfile: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Cost profile uploaded successfully!',
          errorMessage: 'Failed to upload cost profile!',
          duration: 4000,
        });
      },
    }),

    uploadKPI: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'KPI metadata uploaded successfully!',
          errorMessage: 'Failed to upload KPI metadata!',
          duration: 4000,
        });
      },
    }),

    uploadPlanningHorizon: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Planning horizon uploaded successfully!',
          errorMessage: 'Failed to upload planning horizon!',
          duration: 4000,
        });
      },
    }),

    uploadIndustrySelection: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Industry selection uploaded successfully!',
          errorMessage: 'Failed to upload industry selection!',
          duration: 4000,
        });
      },
    }),

    uploadCostProfileLookup: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Cost profile lookup uploaded successfully!',
          errorMessage: 'Failed to upload cost profile lookup!',
          duration: 4000,
        });
      },
    }),

    uploadIndustrySelectionLookup: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Industry selection lookup uploaded successfully!',
          errorMessage: 'Failed to upload industry selection lookup!',
          duration: 4000,
        });
      },
    }),

    uploadKPILookup: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'KPI lookup uploaded successfully!',
          errorMessage: 'Failed to upload KPI lookup!',
          duration: 4000,
        });
      },
    }),

    uploadDimBandDescriptionMatrix: builder.mutation<UploadResponse, UploadArgs>({
      query: ({ tenantId, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append('dimension_band_weight_scale_', file);
        }
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.uploadDimBandDescription}${tenantId}`,
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Dim Band Description uploaded successfully!',
          errorMessage: 'Failed to upload Dim Band Description!',
          duration: 4000,
        });
      },
    }),

    uploadSolutionMetadata: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Solution metadata uploaded successfully!',
          errorMessage: 'Failed to upload solution metadata!',
          duration: 4000,
        });
      },
    }),

    uploadBandDefinition: builder.mutation<UploadResponse, UploadArgs>({
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
      transformResponse: (response: RawUploadResponse): UploadResponse => {
        return {
          status: response.status,
          message: response.message ?? '',
          data: response.data,
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'MetadataFile', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Band definition table uploaded successfully!',
          errorMessage: 'Failed to upload band definition table!',
          duration: 4000,
        });
      },
    }),

    getMetadataFileTemplate: builder.mutation<{ success: boolean }, { userType: string; fileName: string }>({
      query: ({ userType, fileName }) => ({
        url: `${apiControllerPath.metadataFileTemplate.root}${apiControllerPath.metadataFileTemplate.getMetadataFile}`,
        method: 'POST',
        body: { userType, fileName },
        responseHandler: async (response) => {
          const blob = await response.blob();

          // Trigger file download manually here
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);

          return { success: true };
        },
        cache: 'no-cache',
      }),

      transformResponse: (response: { success: boolean }) => response,

      invalidatesTags: (_result, _error, { fileName }) => [{ type: 'Assessor', id: fileName }],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'File template downloaded successfully!',
          errorMessage: 'Failed to download file template!',
          duration: 4000,
        });
      },
    }),

    getMetadataInformation: builder.query({
      query: (tenantId: string) => ({
        url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.getMetadataInformation}`,
        method: 'POST',
        body: { tenantId },
      }),
      providesTags: (_result, _error, tenantId) => [{ type: 'Assessor', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Fetched metadata information successfully!',
          errorMessage: 'Failed to fetch metadata information!',
          duration: 4000,
        });
      },
    }),

    uploadAssessorLogo: builder.mutation<void, { tenantId: string; formData: FormData }>({
      query: ({ tenantId, formData }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.uploadLogo}/${tenantId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'AssessorLogo', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Assessor logo uploaded successfully!',
          errorMessage: 'Failed to upload assessor logo!',
          duration: 4000,
        });
      },
    }),

    viewMetadataFile: builder.mutation({
      query: ({ tenantId, fileName }) => {
        return {
          url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.viewMetadataFile}`,
          method: 'POST',
          body: { tenantId, fileName },
        };
      },
      invalidatesTags: (_result, _error, { tenantId }) => [{ type: 'Assessor', id: tenantId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'File content retrieved successfully!',
          errorMessage: 'Failed to view metadata file!',
          duration: 4000,
        });
      },
    }),
    getAssessorInfo: builder.query<
      {
        status: boolean;
        message?: string;
        data: {
          formData: getAssessorPayload;
          metadata_information: UploadFileMetadata[];
          id: string;
          createdAt: string;
          updatedAt: string;
        }[];
      },
      string
    >({
      query: (tenantId) => ({
        url: `${apiControllerPath.assessorOnboarding.root}${apiControllerPath.assessorOnboarding.getAssessorInformation}${tenantId}`,
        method: 'GET',
      }),
      providesTags: (result, error, tenantId) => [{ type: 'Assessor', id: tenantId }],
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Assessor information fetched successfully.',
      //     errorMessage: 'Failed to fetch assessor information.',
      //     duration: 4000,
      //   });
      // },
    }),
    getLogo: builder.query<{ logoUrl: string }, { tenantId: string }>({
      query: ({ tenantId }) => ({
        url: `${apiControllerPath.userLogos.root}${apiControllerPath.userLogos.getLogo}/${tenantId}`,
        method: 'GET',
      }),

      providesTags: (result, error, { tenantId }) => [{ type: 'AssessorLogo', id: tenantId }],

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await rtkAPIToast(queryFulfilled, dispatch, {
      //     successMessage: 'Logo Fetch successfully!',
      //     errorMessage: 'Failed to Fetch logo!',
      //     duration: 4000,
      //   });
      // },
    }),

    getOnboardingStatus: builder.query<OnboardingStatusResponse, { tenantId: string }>({
      query: ({ tenantId }) => ({
        url: `${apiControllerPath.onboardingStatus.root}/${tenantId}${apiControllerPath.onboardingStatus.getOnboardingStatus}`,
        method: 'GET',
      }),
      providesTags: (result, error, { tenantId }) => [{ type: 'Assessor', id: tenantId }],
    }),
  }),

  overrideExisting: true,
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
  useUploadDimBandDescriptionMatrixMutation,
  useUploadSolutionMetadataMutation,
  useUploadBandDefinitionMutation,

  useViewMetadataFileMutation,
  useGetLogoQuery,
  useLazyGetOnboardingStatusQuery,
} = assessorApi;
