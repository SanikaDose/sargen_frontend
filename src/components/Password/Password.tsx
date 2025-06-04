'use client';

import React, { useState } from 'react';
import { TextField, FormControl, FormLabel, InputAdornment, IconButton, Box, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import styles from './password.module.css';
import { PasswordTextFieldProps } from './Password.types';

export const PasswordTextField: React.FC<PasswordTextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  showStrengthIndicator = false,
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

  const calculateStrength = (password: string) => {
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    const score = checks.filter(Boolean).length;
    const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#f44336', '#ff9800', '#ffc107', '#4caf50', '#2e7d32'];
    return { label: strength[score - 1] || '', color: colors[score - 1] || 'transparent', score };
  };

  const { label: strengthLabel, color: strengthColor, score } = calculateStrength(value || '');

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel htmlFor={name} className={styles.formLabel}>
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
        error={error || (hasTyped && score < 5)}
        InputProps={{
          startAdornment: showLockIcon ? (
            <InputAdornment position="start">
              <Lock color={error ? 'error' : 'action'} />
            </InputAdornment>
          ) : undefined,
          endAdornment: showPasswordToggle ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleToggleVisibility}
                edge="end"
                tabIndex={-1}
                size="small"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
      />

      {hasTyped && score < 5 && (
        <FormHelperText error>
          Password must contain at least 8 characters, including an uppercase letter, lowercase letter, number, and
          symbol.
        </FormHelperText>
      )}

      {showStrengthIndicator && hasTyped && value && (
        <Box>
          <Box className={styles.strengthBarContainer}>
            {[...Array(5)].map((_, idx) => (
              <Box
                key={idx}
                className={styles.strengthBar}
                sx={{ backgroundColor: idx < score ? strengthColor : '#e0e0e0' }}
              />
            ))}
          </Box>
          <FormHelperText className={styles.strengthText} sx={{ color: strengthColor }}>
            {strengthLabel}
          </FormHelperText>
        </Box>
      )}
    </FormControl>
  );
};
