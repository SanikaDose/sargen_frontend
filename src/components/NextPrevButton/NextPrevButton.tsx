import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { FaLongArrowAltRight } from 'react-icons/fa';

// being used
import { FaChevronRight } from 'react-icons/fa6';
import { FaChevronLeft } from 'react-icons/fa6';

export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | '#10557C';
export type ArrowDirection = 'left' | 'right' | 'up' | 'down';

type CustomButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  onClick?: () => void;
  className?: string;
  arrow?: ArrowDirection;
} & Omit<ButtonProps, 'variant' | 'color'>;

export const NextPrevButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'text',
  color = 'primary',
  onClick,
  className = '',
  arrow,
  ...rest
}) => {
  //   const getArrow = () => {
  //     switch (arrow) {
  //       case 'left':
  //         return (
  //           <span style={{ marginRight: 4 }}>
  //             <FaLongArrowAltLeft />
  //           </span>
  //         );
  //       case 'right':
  //         return (
  //           <span style={{ marginLeft: 4 }}>
  //             <FaLongArrowAltRight />
  //           </span>
  //         );
  //       case 'up':
  //         return <span style={{ marginRight: 4 }}>&uarr;</span>;
  //       case 'down':
  //         return <span style={{ marginLeft: 4 }}>&darr;</span>;
  //       default:
  //         return null;
  //     }
  //   };

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={className}
      {...rest}
      style={{ borderRadius: 12, padding: 12, backgroundColor: '#10557C' }}
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
        {arrow === 'left' && <FaChevronLeft />}
        {arrow === 'right' && <FaChevronRight />}
        {children}
      </span>
    </Button>
  );
};
