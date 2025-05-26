import React from 'react';
import {
  TextField,
  TextFieldProps,
  FormControl,
  FormLabel,
  Box,
} from '@mui/material';

export interface InputWithLabelProps extends Omit<TextFieldProps, 'label'> {
  label: string;
  name: string;
  required?: boolean;
}

/**
 * A reusable, production-ready input with a label.
 * Built on top of MUI's TextField and FormControl.
 */
export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  name,
  required = false,
  ...textFieldProps
}) => {
  return (
    <FormControl fullWidth margin="normal">
      <FormLabel htmlFor={name} sx={{ fontWeight: 500, mb: 1 }}>
        {label}{required ? ' *' : ''}
      </FormLabel>
      <TextField
        id={name}
        name={name}
        variant="outlined"
        size="medium"
        required={required}
        fullWidth
        {...textFieldProps}
      />
    </FormControl>
  );
};
