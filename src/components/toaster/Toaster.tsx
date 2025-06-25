'use client';
import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from './toasterSlice';
import { RootState } from '@/store/store';
import styles from './toaster.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Slide } from '@mui/material';

export default function Toaster() {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector((state: RootState) => state.toasterGlobal);

  // const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:899px)');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    dispatch(hideToast());
  };
  return (
    <div>
      <Slide in={open} direction={'left'} mountOnEnter unmountOnExit>
        <Snackbar
          className={styles.outerSnackbar}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          sx={{
            top: '65px',
            right: '10px',
            mt: {
              xs: 1, // e.g., 56px for mobile
              sm: 8, // e.g., 64px for small screens
              md: 9, // 72px for medium and above
            },
          }}
        >
          <Alert
            severity={severity}
            variant="filled"
            sx={{
              fontSize: '0.690rem !important',
              padding: '2px 4px  !important',
              display: 'flex',
              alignItems: 'center',
              color: '#FFFFFF !important',
              '& .MuiAlert-icon': {
                color: '#FFFFFF !important', // 👈 makes icon white
              },
              backgroundColor:
                severity === 'success'
                  ? '#5d9981' // pastel green
                  : severity === 'error'
                    ? '#e71d36' // pastel red
                    : severity === 'warning'
                      ? '#fcca46' // pastel yellow
                      : '#0353a4', // pastel blue for info
              width: {
                sm: '300px',
                md: '220px',
                lg: '200px',
              },
              margin: {
                xs: ' 0px 0px',
                sm: '-14px ',
              },
              maxWidth: '100vw',
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Slide>
            )}
    </div>
  );
}
