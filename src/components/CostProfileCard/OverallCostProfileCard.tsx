import React from 'react';
import { Box, Typography } from '@mui/material';
import { gray } from '@/theme/themePrimitives';

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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '250px',
        padding: '20px',
        boxShadow: 5,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: gray[500],
          flexGrow: 1,
           fontSize: '1rem'
        }}
      >
        {fieldName}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: "5px",
          alignItems: 'flex-end',
          ml: 2,
        }}
      >
        <Box
          sx={{
            px: 1,
            py: 1,
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
              color: gray[400],
            }}
          >
            {stringValue}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            color: gray[400],
          }}
        >
          %
        </Typography>
      </Box>
    </Box>
  );
};

export default OverallCostProfileCard;
