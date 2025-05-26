import React from 'react';
import { Button, ButtonProps } from '@mui/material';

export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

type CustomButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  onClick?: () => void;
  className?: string;
} & Omit<ButtonProps, 'variant' | 'color'>;

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'text',
  color = 'primary',
  onClick,
  className = '',
  ...rest
}) => {
  return (
    <Button variant={variant} color={color} onClick={onClick} className={className} {...rest}>
      {children}
    </Button>
  );
};
