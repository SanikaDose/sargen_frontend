export type Plant = {
  assessmentDate: string;
  id: string;
  name: string;
  location: string;
  registrationNo: string;
  revenue: string;
  currencyType: string;
  type: string;
  age: number;
  numberOfEmployees: number;
  numberOfLines: number;
  gstin: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  assessmentStartDate: string;
  debriefDate: string;
  about: string;
  assessor: string;
  assessmentTableAssignedList: string[];
  assessmentCompletionPercentage: number;
  assessmentCompletionStage: 'NOT_STARTED' | 'STARTED' | 'START_ASSESSMENT' | 'REQUESTED_ASSESSMENT' | 'COMPLETED' | string; // include `string` fallback if values may vary
  plantLogo: string | null;
  pocFullName: string;
  pocEmail: string;
  pocContactNo: string;
};

export type AssignedPlant = {
  id: string;
  plantId: string;
  plantName: string;
  assessmentCompletionStage: 'NOT_STARTED' | 'STARTED' | 'REQUESTED_ASSESSMENT' | 'COMPLETED'; // you can expand this enum
  organisationId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy: string | null;
  updatedBy: string | null;
};

export type GetAllAssignedPlantsResponse = {
  statusCode: number;
  data: AssignedPlant[];
};
