import { OrgFormInput } from '../EditOrganisationOnboarding.types';

export const OrgFormInputs: OrgFormInput[] = [
  {
    name: 'companyName',
    label: 'Name of the company',
    placeholder: 'Enter Name of the company',
    required: true,
    rules: {
      required: 'Company name is required',
    },
  },
  {
    name: 'website',
    label: 'Company Website',
    placeholder: 'Enter company website',
    required: true,
    rules: {
      required: 'Website is required',
      pattern: {
        value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
        message: 'Enter a valid URL',
      },
    },
  },
  {
    name: 'gstin',
    label: 'GST In Details',
    placeholder: 'Enter GST IN no',
    required: true,
    rules: {
      required: 'Gstin is required',
      pattern: {
        value: /^[0-9]+$/,
        message: 'Enter valid GSTIN',
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
    placeholder: 'Enter Number of Employees',
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
