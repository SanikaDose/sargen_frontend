'use client';

import React, { ReactNode } from 'react';
import { Checkbox, Typography } from '@mui/material';
import styles from './Card.module.css';

interface CardProps {
  label: ReactNode;
  value?: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onToggle: () => void;
}

const Card: React.FC<CardProps> = ({ label, value, isSelected, isDisabled = false, onToggle }) => {
  return (
    <div
      onClick={() => !isDisabled && onToggle()}
      className={styles.card}
      style={{
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      <Checkbox checked={isSelected} disabled={isDisabled} onClick={(e) => e.stopPropagation()} onChange={onToggle} />
      <Typography className={styles.kpiText}>{label}</Typography>
      {value && (
        <Typography className={styles.kpiText} style={{ fontWeight: 600 }}>
          Rating: <span style={{ fontSize: '1.25rem' }}>{value}</span>
        </Typography>
      )}
    </div>
  );
};

export default Card;
