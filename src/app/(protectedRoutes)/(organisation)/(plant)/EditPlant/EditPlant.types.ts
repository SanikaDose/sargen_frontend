import { RegisterOptions } from 'react-hook-form';

export interface PlantFormType {
  name: string;
  location: string;
  registrationNo: string;
  gstin: string;
  type: string;
  age: string;
  currencyType: string;
  revenue: string;
  numberOfEmployees: string;
  numberOfLines: string;
  assessmentStartDate: string;
  debriefDate: string;
  about: string;
  revenueUnit: string;
  pocFullName: string;
  pocEmail: string;
  pocContactNo: string;
}

export interface PlantFormInput {
  name: keyof PlantFormType;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  isCurrency?: boolean;
  isRevenueUnit?: boolean;
  rules?: RegisterOptions<PlantFormType, keyof PlantFormType>;
}

export interface EditPlantApi {
  name: string;
  location: string;
  registrationNo: string;
  revenue: string;
  type: string;
  age: string;
  numberOfEmployees: string;
  numberOfLines: string;
  assessmentStartDate: string;
  debriefDate: string;
  about?: string;
  currencyType: string;
  gstin: string;
  pocFullName: string;
  pocEmail: string;
  pocContactNo: string;
}
