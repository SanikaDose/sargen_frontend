// components/PopupModal/PopupModal.tsx
'use client';

import React from 'react';
import styles from './style.module.css';
import { PopupModalProps } from './PopupModal.types';

export const PopupModal: React.FC<PopupModalProps> = ({
  label,
  text,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.label}>{label}</h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.secondaryButton} onClick={onSecondaryClick}>
            {secondaryButtonText}
          </button>
          <button className={styles.primaryButton} onClick={onPrimaryClick}>
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

// export default PopupModal;
