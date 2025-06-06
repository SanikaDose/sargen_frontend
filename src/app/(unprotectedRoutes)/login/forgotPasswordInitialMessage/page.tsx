import { Typography } from '@mui/material';
import styles from './forgotPasswordInitialMessage.module.css';

const page = () => {
  return (
    <article className={styles.outerContainer}>
      <Typography variant="h3" className={styles.content}>
        ✅ A password reset link has been sent to your email. Please check your inbox and follow the instructions to
        reset your password.
      </Typography>
    </article>
  );
};

export default page;
