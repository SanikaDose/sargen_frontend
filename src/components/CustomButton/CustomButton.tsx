import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { MdOutlineAddAlert } from 'react-icons/md';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type ButtonIcon = 'left' | 'right' | 'alert' | 'success';

type CustomButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  color?: string;
  onClick?: () => void;
  className?: string;
  icon?: ButtonIcon;
  height?: number | string;
  width?: number | string;
} & Omit<ButtonProps, 'variant' | 'color'>;

export const NextPrevButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'text',
  color = 'primary',
  onClick,
  className = '',
  icon,
  height = 48,
  width = 'auto',
  ...rest
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'left':
        return <FaChevronLeft />;
      case 'right':
        return <FaChevronRight />;
      case 'alert':
        return <MdOutlineAddAlert size={20} />;
      case 'success':
        return <PlaylistAddCheckCircleIcon />;
      default:
        return null;
    }
  };

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={className}
      {...rest}
      style={{
        borderRadius: 12,
        padding: 12,
        backgroundColor: color,
        height,
        width,
        textTransform: 'none',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: 'white',
        }}
      >
        {renderIcon()}
        {children}
      </span>
    </Button>
  );
};
