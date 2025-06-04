import React from 'react';
import { TextField, TextFieldProps, FormControl, FormLabel } from '@mui/material';

export interface InputWithLabelProps extends Omit<TextFieldProps, 'label'> {
  label: string;
  name: string;
  required?: boolean;
}

/**
 * A reusable, production-ready input with a label.
 * Built on top of MUI's TextField and FormControl.
 */
export const InputWithLabel: React.FC<InputWithLabelProps> = (
  { label, name, required = false, ...textFieldProps },
  ref,
) => {
  return (
    <FormControl fullWidth margin="normal">
      <FormLabel htmlFor={name} sx={{ fontWeight: 500, mb: 0, color: '#000000', fontSize: '13px' }}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </FormLabel>
      <TextField
        id={name}
        name={name}
        variant="outlined"
        size="small"
        required={required}
        fullWidth
        sx={{
          '& input::placeholder': {
            fontWeight: 500, // Make placeholder bold
            color: '#888', // Optional: placeholder color
          },
        }}
        {...textFieldProps}
        InputProps={{ inputProps: { min: 0 } }}
      />
    </FormControl>
  );
};
