import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { OverallCostProfileCardProps } from './OverallCostProfileCard.types';
import styles from './style.module.css';

const OverallCostProfileCard: React.FC<OverallCostProfileCardProps & { onChange: (val: string) => void }> = ({
  fieldName,
  boxBackgroundColor = '#FFFFFF',
  textColor = '#000',
  costValue,
  onChange,
  readonly,
}) => {
  const [value, setValue] = useState(String(costValue));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace('%', '');
    if (input === '' || /^-?\d*\.?\d{0,2}$/.test(input)) {
      setValue(input);
      onChange(input); // push to react-hook-form
    }
  };

  useEffect(() => {
    setValue(String(costValue));
  }, [costValue]);

  return (
    <Box
      sx={{
        bgcolor: boxBackgroundColor,
        color: textColor,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        boxShadow: ' 0px 4px 4px 0px #00000040',
        height: '100%',
        padding: 2,
        width: '100%',
      }}
    >
      <Typography variant="body2" className={styles.label} sx={{ color: textColor }}>
        {fieldName}
      </Typography>
      <TextField
        value={value + '%'}
        onChange={handleInputChange}
        type="text"
        inputProps={{
          readOnly: readonly,
          inputMode: 'decimal',
          className: styles.input,
          style: { color: textColor },
        }}
        InputProps={{
          classes: {
            root: styles.inputRoot,
            notchedOutline: styles.inputOutline,
          },
        }}
        size="small"
      />
    </Box>
  );
};

export default OverallCostProfileCard;
