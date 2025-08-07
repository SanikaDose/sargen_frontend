// components/PopupModal/PopupModal.tsx
'use client';

import React from 'react';
import styles from './style.module.css';
import { PopupModalProps } from './PopupModal.types';
import { CustomButton } from '../CustomButton/CustomButton';

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
          <CustomButton children={secondaryButtonText} height={40} onClick={onSecondaryClick} />
          {/* {secondaryButtonText} */}
          {/* </button> */}
          <CustomButton children={primaryButtonText} color="success" height={40} onClick={onPrimaryClick} />
          {/* {primaryButtonText} */}
          {/* </button> */}
        </div>
      </div>
    </div>
  );
};

// export default PopupModal;
