import { RegisterOptions } from 'react-hook-form';

export interface PlantFormType {
  name: string;
  location: string;
  registrationNo: string;
  gstin: string;
  type: string;
  age: number;
  currencyType: string;
  revenue: number;
  numberOfEmployees: number;
  numberOfLines: number;
  assessmentStartDate: string;
  debriefDate: string;
  about: string;
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
  rules?: RegisterOptions<PlantFormType, keyof PlantFormType>;
}

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
  pocFullName: string;
  pocEmail: string;
  pocContactNo: string;
}
