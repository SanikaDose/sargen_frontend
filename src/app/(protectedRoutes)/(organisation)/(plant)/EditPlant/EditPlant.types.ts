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
  currencyType: string;
  gstin: string;
};

export interface EditPlantApi {
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
  currencyType: string;
  gstin: string;
}
