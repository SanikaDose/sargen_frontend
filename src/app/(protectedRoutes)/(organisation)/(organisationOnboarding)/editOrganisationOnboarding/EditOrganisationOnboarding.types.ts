export interface OrgPayload {
  companyName: string;
  website: string;
  gstin: string;
  revenue: string;
  about: string;
  numberOfEmployees: string;
}

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
  numberOfEmployees?: string;
  rules?: RegisterOptions<OrgOnboardType, keyof OrgOnboardType>;
}

export interface getOrgPayload {
  message: string;
  success: boolean;
  data: {
    country: string;
    uom: string;
    userLogo: any;
    name: string;
    website: string;
    gstin: string;
    revenue: string;
    about: string;
    numberOfEmployees: string;
  };
}
