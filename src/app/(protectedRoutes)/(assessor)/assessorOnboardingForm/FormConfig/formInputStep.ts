// export const AssessorFormInputs = [
//   { name: 'firstName', label: 'First Name', placeholder: 'Enter First Name' },
//   { name: 'lastName', label: 'Last Name', placeholder: 'Enter last Name' },
//   { name: 'email', label: 'e-Mail ID', placeholder: 'Enter Email ID' },
//   { name: 'contactNumber', label: 'Contact Number', placeholder: 'Enter Contact Number' },
//   { name: 'city', label: 'City,Country', placeholder: 'Enter City' },
//   { name: 'country', label: 'Country', placeholder: 'Enter Country' },
//   { name: 'yearOfExperience', label: 'Total Experience', placeholder: 'total experience' },
//   { name: 'certificationYear', label: 'Certification Year', placeholder: 'certification year' },
// ];
import { AssessorFormInput } from '../AssessorOnboarding.types';
export const AssessorFormInputs: AssessorFormInput[] = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter First Name',
    required: true,
    rules: {
      required: 'First Name is required',
      pattern: {
        value: /^[A-Za-z ]+$/, // Only letters and spaces
        message: 'Only letters allowed ',
      },
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter Last Name',
    required: true,
    rules: {
      required: 'Last Name is required',
      pattern: {
        value: /^[A-Za-z ]+$/, // Only letters and spaces
        message: 'Only letters allowed',
      },
    },
  },
  {
    name: 'email',
    label: 'E-Mail Id',
    placeholder: 'Enter Email Id',
    required: true,
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
        message: 'Enter a valid email address',
      },
    },
  },
  {
    name: 'contactNumber',
    label: 'Contact Number',
    placeholder: 'Enter Contact Number',
    required: true,
    rules: {
      required: 'Contact number is required',
      pattern: {
        value: /^[0-9]+$/,
        message: 'Enter a valid number',
      },
    },
  },
  {
    name: 'city',
    label: 'City',
    placeholder: 'Enter City',
    required: true,
    rules: {
      required: 'City is required',
      pattern: {
        value: /^[A-Za-z ]+$/,
        message: 'Only letters allowed',
      },
    },
  },
  {
    name: 'country',
    label: 'Country',
    placeholder: 'Enter Country',
    iscountry: true,
    required: true,
    rules: { required: 'Country is required' },
  },
  {
    name: 'yearOfExperience',
    label: 'Total Experience',
    placeholder: 'Enter Years',
    required: true,
    rules: {
      required: 'Year of experience is required',
      pattern: {
        value: /^\d+$/,
        message: 'Only digits allowed',
      },
    },
  },
  {
    name: 'certificationYear',
    label: 'Certification Year',
    placeholder: 'Enter Certification Year',
    required: true,
    rules: {
      required: 'Certification year is required',
      pattern: {
        value: /^\d{4}$/,
        message: 'Enter a valid 4-digit year',
      },
    },
  },
];
