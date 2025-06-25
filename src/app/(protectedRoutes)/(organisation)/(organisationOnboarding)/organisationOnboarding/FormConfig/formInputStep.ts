import { OrgFormInput } from '../OrganisationOnboarding.types';

export const OrgFormInputs: OrgFormInput[] = [
  {
    name: 'companyName',
    label: 'Name of the company',
    placeholder: 'Enter Name Of The Company',
    required: true,
    rules: {
      required: 'Company name is required',
      pattern: {
        value: /^[A-Za-z ]+$/, // Only letters and spaces
        message: 'Only letters allowed ',
      },
    },
  },
  {
    name: 'website',
    label: 'Company Website',
    placeholder: 'Enter Company Website',
    required: true,
    rules: {
      required: 'Website is required',
      // pattern: {
      //   value: /^https?:\/\/[\w.-]+\.[a-z]{2,}$/i,
      //   message: 'Enter a valid website URL (starting with http:// or https://)',
      // },
    },
  },
  {
    name: 'gstin',
    label: 'GST In Details',
    placeholder: 'Enter GST IN',
    required: true,
    rules: {
      required: 'GSTIN is required',
      minLength: {
        value: 15,
        message: 'GSTIN must be exactly 15 characters',
      },
      maxLength: {
        value: 15,
        message: 'GSTIN must be exactly 15 characters',
      },
      pattern: {
        value: /^[A-Za-z0-9]{15}$/,
        message: 'Enter a valid GSTIN (only letters and numbers allowed)',
      },
    },
  },
  {
    name: 'country',
    label: 'Country',
    placeholder: 'Select From Dropdown',
    isCountry: true,
    required: true,
    rules: {
      required: 'Country is required',
    },
  },
  {
    name: 'revenue',
    label: 'Organization Revenue',
    placeholder: 'Enter Revenue',
    required: true,
    rules: {
      required: 'Revenue is required',
      pattern: {
        value: /^[0-9]+$/,
        message: 'Enter a valid number',
      },
    },
  },
  {
    name: 'uom',
    label: 'Currency Type',
    placeholder: 'Select Currency',
    isCurrency: true,
    required: true,
    rules: {
      required: 'Currency type is required',
    },
  },
  {
    name: 'numberOfEmployees',
    label: 'Number of Employees',
    placeholder: 'Enter Number Of Employees',
    required: true,
    rules: {
      required: 'Number of employees is required',
      pattern: {
        value: /^[0-9]+$/,
        message: 'Enter a valid number',
      },
    },
  },
  // {
  //   name: 'about',
  //   label: 'About Organization',
  //   placeholder: 'Enter Organization Details',
  //   required: true,
  //   rules: {
  //     required: 'About Organization is required',
  //   },
  // },
];
