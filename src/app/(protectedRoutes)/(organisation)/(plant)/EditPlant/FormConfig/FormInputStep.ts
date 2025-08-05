import { PlantFormInput } from '../EditPlant.types';

export const plantFormInputs: PlantFormInput[] = [
  {
    name: 'name',
    label: 'Plant Name',
    placeholder: 'Enter Plant Name',
    required: true,
    rules: {
      required: 'Plant Name is required',
      minLength: { value: 3, message: 'Minimum 3 characters required' },
      pattern: {
        value: /^[A-Za-z ]+$/, // Only letters and spaces
        message: 'Only letters allowed ',
      },
    },
  },
  {
    name: 'location',
    label: 'Plant Location',
    placeholder: 'Enter Plant Location',
    required: true,
    rules: {
      required: 'Location is required',
      pattern: {
        value: /^[A-Za-z ]+$/, // Only letters and spaces
        message: 'Only letters allowed ',
      },
    },
  },
  {
    name: 'registrationNo',
    label: 'Registration No.',
    placeholder: 'Enter Registration no',
    required: true,
    rules: {
      required: 'Registration Number is required',
    },
  },
  {
    name: 'gstin',
    label: 'Tax Reg. No. (GST / VAT)',
    placeholder: 'Enter Tax Registration Number',
    required: true,
    rules: {
      required: 'Tax Registration Number is required',
      minLength: {
        value: 15,
        message: 'Tax Registration Number must be exactly 15 characters',
      },
      maxLength: {
        value: 15,
        message: 'Tax Registration Number must be exactly 15 characters',
      },
      pattern: {
        value: /^[A-Za-z0-9]{15}$/,
        message: 'Enter a valid Tax Registration Number (only letters and numbers allowed)',
      },
    },
  },
  {
    name: 'type',
    label: 'Type',
    placeholder: 'Enter Plant Type',
    required: true,
    rules: {
      required: 'Plant type is required',
      pattern: {
        value: /^[A-Za-z ]+$/, // Only letters and spaces
        message: 'Only letters allowed ',
      },
    },
  },
  {
    name: 'age',
    label: 'Plant Age (Years)',
    placeholder: 'Enter age',
    //type: 'number',
    required: true,
    rules: {
      required: 'Age is required',
      min: { value: 1, message: 'Age must be at least 1' },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Enter a valid number',
      },
    },
  },
  {
    name: 'currencyType',
    placeholder: 'Enter Currency',
    label: 'Currency Type',
    isCurrency: true,
    required: true,
    rules: {
      required: 'Currency type is required',
    },
  },
  {
    name: 'revenue',
    label: 'Plant Revenue',
    placeholder: 'Plant Revenue',
    // type: 'number',
    required: true,
    //
    rules: {
      required: 'Organization Revenue is required',
      pattern: {
        value: /^[0-9.,]+$/,
        message: 'Enter a valid number',
      },
    },
  },
  {
    name: 'revenueUnit',
    label: 'Revenue Unit',
    placeholder: 'Select Revenue Unit',
    isRevenueUnit: true,
    required: true,
    rules: {
      required: 'Revenue unit is required',
    },
  },
  {
    name: 'numberOfEmployees',
    label: 'No. of Employees',
    placeholder: 'Enter total no',
    // type: 'number',
    required: true,
    rules: {
      required: 'Employee count is required',
      min: { value: 1, message: 'At least 1 employee required' },
      pattern: {
        value: /^[0-9,]+$/,
        message: 'Enter a valid number',
      },
    },
  },
  {
    name: 'numberOfLines',
    label: 'No. of Lines',
    placeholder: 'Enter no',
    //  type: 'number',
    required: true,
    rules: {
      required: 'Line count is required',
      min: { value: 1, message: 'At least 1 line required' },
      pattern: {
        value: /^[0-9,]+$/,
        message: 'Enter a valid number',
      },
    },
  },
  {
    name: 'assessmentStartDate',
    label: 'Assessment Date',
    placeholder: 'Enter Assessment Date',
    type: 'date',
    required: true,
    rules: {
      required: 'Assessment date is required',
    },
  },
  // {
  //   name: 'debriefDate',
  //   label: 'Debrief Date',
  //   placeholder: 'Enter Debrief Date',
  //   type: 'date',
  //   required: true,
  //   rules: {
  //     required: 'Debrief date is required',
  //   },
  // },
];
