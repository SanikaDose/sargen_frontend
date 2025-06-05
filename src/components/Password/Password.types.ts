import { TextFieldProps } from '@mui/material';

export interface PasswordTextFieldProps extends Omit<TextFieldProps, 'type'> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showStrengthIndicator?: boolean;
  showPasswordToggle?: boolean;
  showLockIcon?: boolean;
  required?: boolean;
}
