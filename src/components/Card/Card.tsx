'use client';

import React from 'react';
import { Checkbox, Typography } from '@mui/material';
import styles from './Card.module.css';

interface CardProps {
  kpi: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onToggle: () => void;
}

const Card: React.FC<CardProps> = ({ kpi, isSelected, isDisabled = false, onToggle }) => {
  return (
    <div
      onClick={() => !isDisabled && onToggle()}
      className={styles.card}
      style={{
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      <Checkbox checked={isSelected} disabled={isDisabled} onChange={onToggle} />
      <Typography className={styles.kpiText}>{kpi}</Typography>
    </div>
  );
};

export default Card;
