export const pageRoutes = {
  root: '/',
  unprotected: {
    login: '/login',
    register: '/register',
    activateAccount: '/register/activateAccount',
    registerAppreciation: '/register/registerAppreciation',
    resetPassword: '/resetPassword',
    forgotPasswordInitialMessage: '/login/forgotPasswordInitialMessage',
    enquiry: '/enquiry',
  },
  assessor: {
    root: '/(protectedRoute)/(assessor)',
    dashboard: '/(protectedRoute)/(assessor)/assessorDashboard',
    onboardingForm: '/(protectedRoute)/(assessor)/assessorOnboardingForm',
    infoPreview: '/(protectedRoute)/(assessor)/assessorInfoPreview',
    editInformation: '/(protectedRoute)/(assessor)/editAssessorInformation',
    metadataUpload: '/(protectedRoute)/(assessor)/metadataUpload',
    assignPlantInfo: (organisationId: string, plantId: string) =>
      `/(protectedRoute)/(assessor)/previewAssessorAssignPlantInfo/${organisationId}/${plantId}`,
    dimensionSelection: (organisationId: string, plantId: string) =>
      ` /(protectedRoute)/(assessor)/dimensionSelection/${organisationId}/${plantId}`,
    solutionSelection: (organisationId: string, plantId: string) =>
      `/(protectedRoute)/(assessor)/solutionSelection/${organisationId}/${plantId}`,
    organisationRoadmap: (organisationId: string, plantId: string) =>
      ` /(protectedRoute)/(assessor)/previewOrganisationRoadmap/${organisationId}/${plantId}`,
    organisationAssessment: (organisationId: string, plantId: string) =>
      ` /(protectedRoute)/(assessor)/previewOrganisationAssesment/${organisationId}/${plantId}`,
  },
  organization: {
    root: '/(protectedRoute)/(organization)',
    onboarding: {
      root: '/(protectedRoute)/(organization)/organisationsOnborading',
      createInfo: '/(protectedRoute)/(organization)/organisationsOnborading/createOrganizationsInformation',
      createPointOfContact: '/(protectedRoute)/(organization)/organisationsOnborading/createPointOfConnect',
    },
    preview: {
      organization: '/(protectedRoute)/(organization)/organisationPreview',
      pointOfContact: '/(protectedRoute)/(organization)/pointOfContactPreview',
    },
    edit: {
      root: '/(protectedRoute)/(organization)/editOrganisationOnboarding',
      organizationInfo: '/(protectedRoute)/(organization)/editOrganisationOnboarding/editOrganisationOnboarding',
      pointOfContact: '/(protectedRoute)/(organization)/editOrganisationOnboarding/editPointOfContact',
    },
    plant: {
      all: '/(protectedRoute)/(organization)/plantInformation/getAllPlant',
      add: '/(protectedRoute)/(organization)/plantInformation/addPlant',
      edit: (plantId: string) => ` /(protectedRoute)/(organization)/plantInformation/editPlant/${plantId}`,
    },
  },

  plant: {
    root: '',
    addPlant: '/AddPlant',
    editPlant: 'tenantId/plantId/EditPlant',
  },
  plantAssessment: (params: string[]) => `/(protectedRoute)/${params.join('/')}`,
};
