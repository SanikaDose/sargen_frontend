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

  const isSmallScreen = useMediaQuery('(max-width:899px)');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    dispatch(hideToast());
  };
  return (
    <div>
      <Slide in={open} direction={isSmallScreen ? 'left' : 'right'} mountOnEnter unmountOnExit>
        <Snackbar
          className={styles.outerSnackbar}
          anchorOrigin={{
            vertical: isSmallScreen ? 'top' : 'bottom',
            horizontal: isSmallScreen ? 'right' : 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          sx={
            !isSmallScreen
              ? {
                  bottom: '80px !important',
                  '& .MuiPaper-root': {},
                }
              : {}
          }
        >
          <Alert
            severity={severity}
            variant="filled"
            sx={{
              fontSize: '0.690rem !important',
              padding: '2px 4px  !important',
              color: '#FFFFFF !important',

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
    </div>
  );
}
