"use client";

import React, { useState, forwardRef, useCallback, useMemo } from "react";
import { TextField, InputAdornment, IconButton, TextFieldProps, FormHelperText, Box } from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { useController, Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

// Password strength calculation hook
const usePasswordStrength = (password: string) => {
  return useMemo(() => {
    if (!password) return { score: 0, label: "", color: "transparent" };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password),
    };

    score = Object.values(checks).filter(Boolean).length;

    const strengthMap = {
      0: { label: "", color: "transparent" },
      1: { label: "Very Weak", color: "#f44336" },
      2: { label: "Weak", color: "#ff9800" },
      3: { label: "Fair", color: "#ffc107" },
      4: { label: "Good", color: "#4caf50" },
      5: { label: "Strong", color: "#2e7d32" },
    };

    return { score, ...strengthMap[score as keyof typeof strengthMap] };
  }, [password]);
};

// Password strength indicator component
const PasswordStrengthIndicator = React.memo<{ password: string }>(({ password }) => {
  const strength = usePasswordStrength(password);

  if (!password) return null;

  return (
    <Box sx={{ mt: 0.5 }}>
      <Box sx={{ display: "flex", gap: 0.25, mb: 0.25 }}>
        {[1, 2, 3, 4, 5].map((level) => (
          <Box
            key={level}
            sx={{
              flex: 1,
              height: 3,
              bgcolor: level <= strength.score ? strength.color : "grey.300",
              borderRadius: 0.5,
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </Box>
      <FormHelperText
        sx={{
          color: strength.color,
          fontSize: "0.75rem",
          margin: 0,
          minHeight: "1rem",
        }}
      >
        {strength.label}
      </FormHelperText>
    </Box>
  );
});

// Main component props interface
export interface PasswordTextFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends Omit<TextFieldProps, "name" | "type"> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  showStrengthIndicator?: boolean;
  showPasswordToggle?: boolean;
  showLockIcon?: boolean;
  autoComplete?: "current-password" | "new-password" | "off";
}

// Default validation rules for password
export const defaultPasswordRules = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
  validate: {
    hasLowercase: (value: string) => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
    hasUppercase: (value: string) => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
    hasNumber: (value: string) => /\d/.test(value) || "Password must contain at least one number",
    hasSymbol: (value: string) => /[^A-Za-z0-9]/.test(value) || "Password must contain at least one special character",
  },
} as const;

// Confirm password validation rules
export const confirmPasswordRules = (passwordFieldName: string = "password") => ({
  required: "Please confirm your password",
  validate: (value: string, formValues: any) => value === formValues[passwordFieldName] || "Passwords do not match",
});

export const PasswordTextField = forwardRef<HTMLDivElement, PasswordTextFieldProps>(
  (
    {
      name,
      control,
      rules = defaultPasswordRules,
      showStrengthIndicator = true,
      showPasswordToggle = true,
      showLockIcon = true,
      autoComplete = "current-password",
      variant = "outlined",
      fullWidth = true,
      ...textFieldProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      rules,
    });

    const handleTogglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    }, []);

    const startAdornment = useMemo(() => {
      if (!showLockIcon) return undefined;

      return (
        <InputAdornment position="start">
          <Lock color={error ? "error" : "action"} />
        </InputAdornment>
      );
    }, [showLockIcon, error]);

    const endAdornment = useMemo(() => {
      if (!showPasswordToggle) return textFieldProps.InputProps?.endAdornment;

      return (
        <InputAdornment position="end">
          <IconButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={handleTogglePasswordVisibility}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            size="small"
            tabIndex={-1}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      );
    }, [showPasswordToggle, showPassword, handleTogglePasswordVisibility, handleMouseDownPassword, textFieldProps.InputProps?.endAdornment]);

    return (
      <Box ref={ref}>
        <TextField
          {...textFieldProps}
          {...field}
          type={showPassword ? "text" : "password"}
          variant={variant}
          fullWidth={fullWidth}
          autoComplete={autoComplete}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            startAdornment,
            endAdornment,
            ...textFieldProps.InputProps,
          }}
          inputProps={{
            "data-testid": `password-input-${name}`,
            ...textFieldProps.inputProps,
          }}
        />
        {showStrengthIndicator && <PasswordStrengthIndicator password={field.value || ""} />}
      </Box>
    );
  }
);

PasswordTextField.displayName = "PasswordTextField";
