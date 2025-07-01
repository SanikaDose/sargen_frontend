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
        height: '100%',
        borderRadius: '16px',
        bgcolor: '#F5FAFD',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
        overflowY: 'auto',
      }}
    >
      {heading && (
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: 'darkgrey',
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
          fontSize: 'medium',
        }}
      >
        {content || 'Please Enter the About us in Organization Entry Portal'}
      </Box>
    </Box>
  );
};

export default InfoBox;
