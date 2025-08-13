'use client';

import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormLabel, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from './password.module.css';
import { PasswordTextFieldProps } from './Password.types';

export const PasswordTextField: React.FC<PasswordTextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  // showStrengthIndicator = false,
  showPasswordToggle = true,
  showLockIcon = true,
  required = false,
  error,
  helperText,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  const handleToggleVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasTyped) setHasTyped(true);
    onChange?.(e);
  };

  // const calculateStrength = (password: string) => {
  //   const checks = [password.length >= 1, /[a-z]/.test(password)];
  // };

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel htmlFor={name} className={styles.formLabel} sx={{ mb: 0 }} color="primary">
        {label}
        {required ? ' *' : ''}
      </FormLabel>

      <TextField
        {...rest}
        id={name}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        fullWidth
        required={required}
        variant="outlined"
        error={error}
        helperText={hasTyped && error ? helperText : ''}
        InputProps={{
          startAdornment: showLockIcon ? (
            <InputAdornment position="start">
              <Lock color={error ? 'error' : 'action'} />
            </InputAdornment>
          ) : undefined,
          endAdornment: showPasswordToggle ? (
            <InputAdornment position="end">
              <IconButton onClick={handleToggleVisibility} edge="end" tabIndex={-1} size="small" aria-label="toggle password visibility">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
      />
    </FormControl>
  );
};
