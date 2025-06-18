import { RegisterOptions } from 'react-hook-form';
export type AssessorFormType = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  city: string;
  country: string;
  yearOfExperience: string;
  certificationYear: string;
};
export interface AssessorFormInput {
  name: keyof AssessorFormType;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  iscountry?: boolean;
  rules?: RegisterOptions<AssessorFormType, keyof AssessorFormType>;
}
