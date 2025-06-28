'use client';
import { Button, Typography, Paper } from '@mui/material';
import styles from './informativeComponent.module.css';

type Paramters = {
  content: string;
  behaviour?: () => void;
};

const InformativeComponent = ({ content, behaviour }: Paramters) => {
  return (
    <Paper
      className={styles.outerContainer}
      sx={{
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: '1px solid rgb(208,228,243)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        padding: '24px',
      }}
    >
      <Typography variant="h3" className={styles.content}>
        {content}
      </Typography>
      {behaviour && (
        <Button
          variant="contained"
          onClick={behaviour}
          sx={{
            fontSize: '16px',
            height: '48px',
            borderRadius: '16px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          Activate Account
        </Button>
      )}
    </Paper>
  );
};

export default InformativeComponent;
