import React from 'react';
import styles from './style.module.css';
import { TextAreaProps } from './TextArea.types';

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder = '', readOnly = false }) => {
  return (
    <div className={styles.textAreaContainer}>
      <textarea
        className={styles.textArea}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
          console.log('e.target.value', e.target.value);
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={3}
      />
    </div>
  );
};

export default TextArea;
