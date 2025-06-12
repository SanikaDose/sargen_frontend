import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonProps, useTheme } from '@mui/material';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { MdOutlineAddAlert } from 'react-icons/md';

export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type ButtonIcon = 'left' | 'right' | 'save' | 'alert' | 'success';
type MuiPaletteColor = 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning';

type CustomButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  color?: MuiPaletteColor;

  onClick?: () => void;
  className?: string;
  icon?: ButtonIcon;
  height?: number | string;
  width?: number | string;
  disabled?: boolean;
} & Omit<ButtonProps, 'variant' | 'color'>;

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  onClick,
  className = '',
  icon,
  height = 64,
  width = 100,
  disabled = false,
  ...rest
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'left':
        return <FaChevronLeft size={20} />;
      case 'right':
        return <FaChevronRight size={20} />;
      case 'save':
        return <SaveIcon fontSize="medium" />;
      case 'alert':
        return <MdOutlineAddAlert size={24} />;
      case 'success':
        return <PlaylistAddCheckCircleIcon fontSize="medium" />;
      default:
        return null;
    }
  };
  const theme = useTheme();
  const paletteColor = theme.palette[color];

  return (
    <Button
      variant={variant}
      onClick={onClick}
      color={color}
      className={className}
      disabled={disabled}
      {...rest}
      sx={{
        borderRadius: 2,
        padding: 1.5,
        height,
        width,
        textTransform: 'none',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        ...(variant === 'outlined' && {
          borderColor: paletteColor?.main,
          color: paletteColor?.main,
          '&:hover': {
            borderColor: paletteColor?.dark,
          },
        }),
        ...(variant === 'text' && {
          color: paletteColor?.main,
          '&:hover': {},
        }),
      }}
    >
      {renderIcon()}
      {children}
    </Button>
  );
};
