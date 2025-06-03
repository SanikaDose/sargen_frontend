'use client';

import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { PasswordTextField } from '@/components/Password/Password';
import styles from './style.module.css';
import { LoginFormInputs } from './login.types';

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Form Data:', data);
    // Send to API here
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Box className={styles.paper}>
        <section className={styles.textContainer}>
          <Typography className={styles.welcomeBackText} variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography className={styles.welcomeBackHelperText} variant="subtitle1" color="text.secondary" gutterBottom>
            Sign in to access your industry roadmap
          </Typography>
        </section>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <InputWithLabel
                {...field}
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <PasswordTextField
                {...field}
                autoComplete="new-password"
                fullWidth={true}
                label="Password"
                placeholder="Enter your password"
                showLockIcon={false}
                showPasswordToggle
                showStrengthIndicator
              />
            )}
          />

          <Button type="submit" fullWidth variant="contained" className={styles.button}>
            Sign In
          </Button>

          <Typography variant="body2" className={styles.forgotPassword}>
            Forgot password?
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
