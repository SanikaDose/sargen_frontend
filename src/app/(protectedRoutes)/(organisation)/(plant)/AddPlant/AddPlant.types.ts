export type PlantFormType = {
  name: string;
  location: string;
  registrationNo: string;
  revenue: number;
  type: string;
  age: number;
  numberOfEmployees: number;
  numberOfLines: number;
  assessmentStartDate: string;
  debriefDate: string;
  about?: string;
};

export interface AddPlantApi {
  name: string;
  location: string;
  registrationNo: string;
  revenue: number;
  type: string;
  age: number;
  numberOfEmployees: number;
  numberOfLines: number;
  assessmentStartDate: string;
  debriefDate: string;
}
