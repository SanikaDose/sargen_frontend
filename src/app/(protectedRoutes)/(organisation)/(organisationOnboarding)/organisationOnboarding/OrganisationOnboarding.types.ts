import { RegisterOptions } from 'react-hook-form';
export type OrgOnboardType = {
  companyName: string;
  website: string;
  gstin: string;
  country: string;
  revenue: string;
  uom: string;
  numberOfEmployees: string;
  about: string;
};

export interface OrgFormInput {
  name: keyof OrgOnboardType;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  isCountry?: boolean;
  isCurrency?: boolean;
  rules?: RegisterOptions<OrgOnboardType, keyof OrgOnboardType>;
}
