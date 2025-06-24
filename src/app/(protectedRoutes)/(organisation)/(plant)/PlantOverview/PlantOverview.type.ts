// Define the structure of the payload for getAllPlant info
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

export interface PlantInfoResponse {
  message: string;
  status: number;
  data: Plant;
}
