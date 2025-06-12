'use client';
import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from './toasterSlice';
import { RootState } from '@/store/store';
import styles from './toaster.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Slide } from '@mui/material';

export default function Toaster() {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector((state: RootState) => state.toasterGlobal);

  const theme = useTheme();
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
          autoHideDuration={3000000}
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
              color={severity} // ✅ Force MUI to use the right color

            variant="filled"
            sx={{
              fontSize: '0.690rem !important',
              padding: '2px 4px  !important',

              width: {
                md: '200px',
                lg: '200px',
              },
              margin: {
                xs: '10px',
                sm: '-14px 6px',
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
