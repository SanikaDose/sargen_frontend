import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

interface OverallCostProfileCardProps {
  fieldName: string;
  value: string | number;
  boxBackgroundColor?: string;
  textColor?: string;
}

const OverallCostProfileCard: React.FC<OverallCostProfileCardProps> = ({
  fieldName,
  value,
  boxBackgroundColor = '#f5f5f5',
  textColor = '#000',
}) => {
  const stringValue = value.toString();
  const isValid = /^-?\d+(\.\d{0,2})?$/.test(stringValue);

  if (!isValid) {
    console.error(`Invalid value "${value}". Only numeric input is allowed.`);
    return null;
  }

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderRadius: 2,
        bgcolor: boxBackgroundColor,
        color: textColor,
        minWidth: '250px',
        padding: '20px',
        boxShadow: 5,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid
          
        >
          <Typography
            variant="body2"
            sx={{
         
                  color: textColor,
              fontSize: {
                xs: '1.2rem',
                sm: '1.4rem',
                md: '1.6rem',
                lg: '1.8rem',
              },
            }}
          >
            {fieldName}
          </Typography>
        </Grid>

        <Grid>
          <Grid container alignItems="center" spacing={1} wrap="nowrap">
            <Grid>
              <Box
                sx={{
                  px: {
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                  },
                  py: {
                    xs: 0.5,
                    sm: 1,
                    md: 1.2,
                    lg: 1.5,
                  },
                  borderRadius: 2,
                  border: 1,
                  borderColor: '#e0e0e0',
                  minWidth: '70px',
                  textAlign: 'right',
                  
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: textColor,
                    fontSize: {
                      xs: '1.2rem',
                      sm: '1.4rem',
                      md: '1.6rem',
                      lg: '1.8rem',
                    },
                  }}
                >
                  {stringValue}
                </Typography>
              </Box>
            </Grid>

            <Grid>
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
              
                   color: textColor,
                  fontSize: {
                    xs: '1.2rem',
                    sm: '1.4rem',
                    md: '1.6rem',
                    lg: '1.8rem',
                  },
                }}
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
