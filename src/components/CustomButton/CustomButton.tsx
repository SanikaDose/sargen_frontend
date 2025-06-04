import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { MdOutlineAddAlert } from 'react-icons/md';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SaveIcon from '@mui/icons-material/Save';

export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type ButtonIcon = 'left' | 'right' | 'save' | 'alert' | 'success';

type CustomButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  color?: string;
  onClick?: () => void;
  className?: string;
  icon?: ButtonIcon;
  height?: number | string;
  width?: number | string;
  disabled?: boolean;
} & Omit<ButtonProps, 'variant' | 'color'>;

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'text',
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

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={className}
      disabled={disabled}
      {...rest}
      style={{
        borderRadius: 12,
        padding: 12,
        backgroundColor: disabled ? '#ccc' : color,
        height,
        width,
        textTransform: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          color: 'white',
          textAlign: 'center',
        }}
      >
        {renderIcon()}
        {children}
      </span>
    </Button>
  );
};
