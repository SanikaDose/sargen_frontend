// Define the structure of the payload for getAllPlant info
export interface Plant {
  id: number;
  name: string;
  location: string;
  registrationNo: string;
  revenue: string;
  type: string;
  age: number;
  numberOfEmployees: number;
  numberOfLines: number;
  assessmentStartDate: string;
  debriefDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  tenantId: string;
}

export interface PlantInfoResponse {
  message: string;
  status: number;
  data: Plant;
}
