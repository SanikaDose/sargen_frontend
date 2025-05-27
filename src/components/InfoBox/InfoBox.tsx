// components/InfoBox/InfoBox.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { InfoBoxProps } from './InfoBox.types';

const InfoBox: React.FC<InfoBoxProps> = ({
  heading = 'About Industry',
  content = 'Please Enter the About us in Organization Entry Portal',
  className = '',
  sx = {},
}) => {
  return (
    <Box
      className={className}
      sx={{
        borderRadius: '8px',
        bgcolor: '#F5FAFD',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {heading && (
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
          }}
        >
          {heading}
        </Typography>
      )}
      <Box
        sx={{
          color: 'text.secondary',
          lineHeight: 1.5,
          flexGrow: 1,
          p: 2,
          textAlign: 'justify',
        }}
      >
        {content || 'Please Enter the About us in Organization Entry Portal'}
      </Box>
    </Box>
  );
};

export default InfoBox;
