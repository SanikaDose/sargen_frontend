import { PlantFormInput } from '../AddPlant.types';

export const plantFormInputs: PlantFormInput[] = [
  {
    name: 'name',
    label: 'Plant Name',
    placeholder: 'Enter First Name',
    required: true,
    rules: {
      required: 'Plant Name is required',
      minLength: { value: 3, message: 'Minimum 3 characters required' },
    },
  },
  {
    name: 'location',
    label: 'Plant Location',
    placeholder: 'Enter Last Name',
    required: true,
    rules: {
      required: 'Location is required',
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
    label: 'GST IN',
    placeholder: 'Enter GST IN no',
    required: true,
    rules: {
      required: 'GSTIN is required',
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/, // Example pattern for GSTIN (7 alphanumeric characters)
        message: 'Invalid GSTIN format',
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
    },
  },
  {
    name: 'age',
    label: 'Plant Age (Years)',
    placeholder: 'Enter age',
    type: 'number',
    required: true,
    rules: {
      required: 'Age is required',
      min: { value: 1, message: 'Age must be at least 1' },
    },
  },
  {
    name: 'currencyType',
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
    type: 'number',
    required: true,
    rules: {
      required: 'Revenue is required',
      validate: (value: string | number) => {
        const num = typeof value === 'number' ? value : parseFloat(value);
        return num > 0 || 'Revenue must be greater than 0';
      },
    },
  },
  {
    name: 'numberOfEmployees',
    label: 'No. of Employees',
    placeholder: 'Enter total no',
    type: 'number',
    required: true,
    rules: {
      required: 'Employee count is required',
      min: { value: 1, message: 'At least 1 employee required' },
    },
  },
  {
    name: 'numberOfLines',
    label: 'No. of Lines',
    placeholder: 'Enter no',
    type: 'number',
    required: true,
    rules: {
      required: 'Line count is required',
      min: { value: 1, message: 'At least 1 line required' },
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
  {
    name: 'debriefDate',
    label: 'Debrief Date',
    placeholder: 'Enter Debrief Date',
    type: 'date',
    required: true,
    rules: {
      required: 'Debrief date is required',
    },
  },
];
