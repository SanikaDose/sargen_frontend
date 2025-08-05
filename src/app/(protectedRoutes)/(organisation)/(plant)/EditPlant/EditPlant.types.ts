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
  about?: string;
  currencyType: string;
  gstin: string;
  pocFullName: string;
  pocEmail: string;
  pocContactNo: string;
}
