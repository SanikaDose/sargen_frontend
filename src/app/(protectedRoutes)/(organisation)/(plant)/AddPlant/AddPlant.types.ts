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
  isDropdown?: boolean;
}

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
  about?: string;
  currencyType: string;
  gstin: string;
  pocFullName: string;
  pocEmail: string;
  pocContactNo: string;
}

export type AddPlantInfoResponse = {
  data: unknown;
  id: string;
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
  assessmentStartDate: string; // ISO date string (e.g., '2025-06-23')
  pocFullName: string;
  pocEmail: string;
  pocContactNo: string;
  about: string;
};
