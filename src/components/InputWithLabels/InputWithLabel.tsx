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
export const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, name, required = false, InputProps, ...textFieldProps }, ref) => {
    return (
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor={name} sx={{ fontWeight: 600, mb: 0, color: '#313131' }}>
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
            '& .MuiOutlinedInput-root': { borderRadius: '16px' },
            '& input::placeholder': {
              fontWeight: 500, // Make placeholder bold
              color: '#888', // Optional: placeholder color
            },
          }}
          {...textFieldProps}
          InputProps={{
            ...InputProps,
            inputProps: { min: 0 }, // ⬅️ allow readOnly, disabled etc. to pass through
          }}
          inputRef={ref}
        />
      </FormControl>
    );
  },
);

InputWithLabel.displayName = 'InputWithLabel';
