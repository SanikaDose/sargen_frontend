export const contactPersonValidationRules = {
  firstName: {
    required: 'First name is required',
    minLength: {
      value: 2,
      message: 'First name must be at least 2 characters long',
    },
    maxLength: {
      value: 50,
      message: 'First name cannot exceed 50 characters',
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'First name can only contain letters and spaces',
    },
  },
  lastName: {
    required: 'Last name is required',
    minLength: {
      value: 2,
      message: 'Last name must be at least 2 characters long',
    },
    maxLength: {
      value: 50,
      message: 'Last name cannot exceed 50 characters',
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'Last name can only contain letters and spaces',
    },
  },
  employeeId: {
    required: false,
    minLength: {
      value: 3,
      message: 'Employee ID must be at least 3 characters long',
    },
    maxLength: {
      value: 20,
      message: 'Employee ID cannot exceed 20 characters',
    },
    pattern: {
      value: /^[A-Za-z0-9-_]+$/,
      message: 'Employee ID can only contain letters, numbers, hyphens, and underscores',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address',
    },
  },
  designation: {
    required: 'Designation is required',
    minLength: {
      value: 2,
      message: 'Designation must be at least 2 characters long',
    },
    maxLength: {
      value: 100,
      message: 'Designation cannot exceed 100 characters',
    },
  },
  jobRole: {
    required: 'Job role is required',
    minLength: {
      value: 2,
      message: 'Job role must be at least 2 characters long',
    },
    maxLength: {
      value: 100,
      message: 'Job role cannot exceed 100 characters',
    },
  },
  contactNumber: {
    required: 'Contact number is required',
    pattern: {
      value: /^[\+]?[0-9\s\-\(\)]{7,15}$/,
      message: 'Please enter a valid contact number (7-15 digits)',
    },
  },
  country: {
    required: 'Country is required',
  },
};

export type ContactPersonValidationRules = typeof contactPersonValidationRules;
