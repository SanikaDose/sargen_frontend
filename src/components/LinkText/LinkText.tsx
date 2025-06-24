// src/components/linkText/LinkText.tsx

import React from 'react';
import { Link } from '@mui/material';

type LinkTextProps = {
  href: string;
  children: React.ReactNode;
  underline?: 'always' | 'hover' | 'none';
  target?: '_blank' | '_self' | '_parent' | '_top';
  className?: string;
  color?: string;
};

export const LinkText: React.FC<LinkTextProps> = ({
  href,
  children,
  underline = 'hover',
  target = '_self',
  className = '',
  color = 'primary',
}) => {
  return (
    <Link
      href={href}
      target={target}
      underline={underline}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={className}
      color={color}
    >
      {children}
    </Link>
  );
};
