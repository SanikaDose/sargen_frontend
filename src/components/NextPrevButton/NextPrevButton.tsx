import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { FaChevronRight } from 'react-icons/fa6';
import { FaChevronLeft } from 'react-icons/fa6';
import { MdOutlineAddAlert } from 'react-icons/md';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

export type ButtonVariant = 'text' | 'contained' | 'outlined';
// export type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | '#10557C';
export type icon = 'left' | 'right' | 'alert' | 'success';

type CustomButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: string;
  onClick?: () => void;
  className?: string;
  icon?: icon;
} & Omit<ButtonProps, 'variant' | 'color'>;

export const NextPrevButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'text',
  color = 'primary',
  onClick,
  className = '',
  icon,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={className}
      {...rest}
      style={{ borderRadius: 12, padding: 12, backgroundColor: `${color}` }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
          paddingLeft: 8,
          paddingRight: 8,
          color: 'white',
        }}
      >
        {icon === 'left' && <FaChevronLeft />}
        {icon === 'right' && <FaChevronRight />}
        {icon === 'alert' && <MdOutlineAddAlert size={25} />}
        {icon === 'success' && <PlaylistAddCheckCircleIcon />}
        {children}
      </span>
    </Button>
  );
};
