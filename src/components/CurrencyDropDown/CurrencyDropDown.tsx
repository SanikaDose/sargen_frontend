import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Select, MenuItem, OutlinedInput, SelectChangeEvent } from '@mui/material';

export type DropdownOption = {
  label: string;
  value: string;
};

export interface DropdownWithLabelProps {
  label: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  options: DropdownOption[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  onFocus?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: boolean;
  helperText?: React.ReactNode;
}

const DropdownWithLabel: React.FC<DropdownWithLabelProps> = ({
  label,
  placeholder = 'Select',
  name,
  required = false,
  options,
  value,
  onChange,
  onFocus,
  inputRef,
  error,
  helperText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth margin="normal">
        <FormLabel
          htmlFor={name}
          sx={{
            fontWeight: 600,
            mb: 0,
            color: '#313131',
            '&.Mui-focused': { color: '#313131' },
          }}
        >
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </FormLabel>

        <Select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          size="small"
          displayEmpty
          inputRef={inputRef}
          error={error} // ✅ Only here
          input={
            <OutlinedInput
              placeholder={placeholder}
              sx={{
                borderRadius: '16px',
                '& input::placeholder': {
                  // fontWeight: 500,
                  // color: '#888',
                },
              }}
            />
          }
        >
          <MenuItem disabled value="">
            <span
              style={{
                fontWeight: 500,
                color: isOpen ? '#000' : '#888',
                opacity: isOpen ? 1 : 0.4,
              }}
            >
              {placeholder}
            </span>
          </MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>

        {helperText && (
          <Box mt={0.5} ml={0.5}>
            <span style={{ color: 'red', fontSize: '0.75rem' }}>{helperText}</span>
          </Box>
        )}
      </FormControl>
    </Box>
  );
};

export default DropdownWithLabel;
