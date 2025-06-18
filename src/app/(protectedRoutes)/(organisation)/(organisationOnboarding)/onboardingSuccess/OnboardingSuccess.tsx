'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function OnboardingSuccess() {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);

    const timeout = setTimeout(() => {
      router.push('/AddContactPerson');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      // bgcolor="#f5fff8"
    >
      <CheckCircleOutlineIcon style={{ fontSize: '100px', color: '#4caf50' }} />
      <Typography variant="h4" fontWeight="bold" color="success.main" gutterBottom>
        You're successfully onboarded!
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        Please wait, you are being redirected to your point of contact...
      </Typography>

      {showLoader && <CircularProgress color="success" />}
    </Box>
  );
}
