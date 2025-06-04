'use client';

import React, { useRef, useState } from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { PasswordTextField } from '@/components/Password/Password';
import styles from './style.module.css';
import { FormValues, LoginFormInputs, Token } from './login.types';
import { useLazyGetOnboardingStatusQuery, useLoginUserMutation } from './loginApi';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setDecodedToken } from './loginSlice';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const hasNavigatedRef = useRef(false);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [getOnboardingStatus] = useLazyGetOnboardingStatusQuery();

  const handleLogin = async (data: LoginFormInputs) => {
    if (loading || hasNavigatedRef.current) return;

    setLoading(true);
    try {
      const result = await loginUser(data).unwrap();

      if (!result.success) throw new Error('Login unsuccessful');

      const token = result.accessToken;
      const decoded = jwtDecode<Token>(token);
      const { tenantId, userType } = decoded;

      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('Authorization', token);
      localStorage.setItem('tenantId', tenantId);
      dispatch(setDecodedToken(decoded));

      if (userType[0] === 'ASSESSOR') {
        hasNavigatedRef.current = true;
        //TODO:route hard code change
        router.push('/assessorOnboardingForm');
        return;
      }

      // 🛠 Correct way to call lazy query and handle its response
      const response = await getOnboardingStatus(tenantId);
      const onboardingData = response.data;
      const error = response.error;

      if (error || !onboardingData) {
        throw new Error('Failed to fetch onboarding status');
      }

      const { onboardingStatus } = onboardingData;
      console.log('onboarding status', onboardingStatus);

      // ✅ Navigate based on onboarding status
      hasNavigatedRef.current = true;
      switch (onboardingStatus) {
        case 'NOT_STARTED':
          router.push('/organisationsOnborading/createOrganizationsInformation');
          break;
        case 'STARTED':
          console.log('Push to onboarding');
          router.push('/organisationsOnborading/createPointOfConnect');
          break;
        case 'COMPLETED':
          console.log('Push to preview');
          router.push('/organisationPreview');
          break;
        default:
          console.warn('Unhandled onboarding status:', onboardingStatus);
          break;
      }
    } catch (error) {
      console.error('Login or onboarding check failed:', error);
    } finally {
      setLoading(false);
    }
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

        <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate className={styles.form}>
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
