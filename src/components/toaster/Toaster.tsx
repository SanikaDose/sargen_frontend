'use client';
import { useEffect, useState } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from './toasterSlice';
import { RootState } from '@/store/store';
import { Slide, SlideProps } from '@mui/material';

// Slide transition component
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export default function Toaster() {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector((state: RootState) => state.toasterGlobal);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    dispatch(hideToast());
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      sx={{
        top: '65px',
        right: '10px',
        mt: {
          xs: 1,
          sm: 8,
          md: 9,
        },
        fontSize: '0.690rem !important',
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{
          fontSize: '0.690rem !important',
          padding: '2px 4px !important',
          display: 'flex',
          alignItems: 'center',
          color: '#FFFFFF !important',
          '& .MuiAlert-icon': {
            color: '#FFFFFF !important',
          },
          backgroundColor:
            severity === 'success' ? '#157759' : severity === 'error' ? '#e71d36' : severity === 'warning' ? '#fcca46' : '#0353a4',
          margin: {
            xs: '0px 0px',
            sm: '-14px',
          },
          maxWidth: '100vw',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
