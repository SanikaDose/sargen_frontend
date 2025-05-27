import React, { useState } from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import { OverallCostProfileCardProps } from './OverallCostProfileCard.types';
import styles from './style.module.css';

const OverallCostProfileCard: React.FC<OverallCostProfileCardProps> = ({
  fieldName,
  boxBackgroundColor = '#f5f5f5',
  textColor = '#000',
}) => {
  const [value, setValue] = useState('10');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input === '' || /^-?\d*\.?\d{0,2}$/.test(input)) {
      setValue(input);
    }
  };

  return (
    <Box
      className={styles.container}
      sx={{
        bgcolor: boxBackgroundColor,
        color: textColor,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <Typography
            variant="body2"
            className={styles.label}
            sx={{ color: textColor }}
          >
            {fieldName}
          </Typography>
        </Grid>

        <Grid>
          <Grid container alignItems="center" spacing={1} wrap="nowrap">
            <Grid>
              <TextField
                value={value}
                onChange={handleInputChange}
                type="text"
             
                inputProps={{
                  inputMode: 'decimal',
                  className: styles.input,
                  style:{
                    color:textColor
                  }
                }}
                InputProps={{
                  classes: {
                    root: styles.inputRoot,
                    notchedOutline: styles.inputOutline,
                  },
                }}
                size="small"
              />
            </Grid>

            <Grid>
              <Typography
                variant="caption"
                className={styles.label}
                sx={{ color: textColor }}
              >
                %
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverallCostProfileCard;
