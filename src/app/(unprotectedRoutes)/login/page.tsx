'use client';

import ButtonWithLoader from '@/components/ButtonWithLoader/buttonWithLoader';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { PasswordTextField } from '@/components/Password/Password';
import { Box, Button, Container, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { LoginFormInputs, OnboardingStatus, RawToken } from './login.types';
import { useLazyGetOnboardingStatusQuery, useLoginUserMutation } from './loginApi';
import { setDecodedToken, setOnboardingStatus } from './loginSlice';
import styles from './style.module.css';
import { decodeAndStoreToken } from '@/app/utils/auth';

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const hasNavigatedRef = useRef(false);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();

  // const onboardingStatus = useSelector((state: RootState) => state.tokenDecode.onboardingStatus);
  // console.log('onboardingStatus', onboardingStatus);

  const router = useRouter();
  const [getOnboardingStatus] = useLazyGetOnboardingStatusQuery();

  const handleLogin = async (data: LoginFormInputs) => {
    if (loading || hasNavigatedRef.current) return;

    setLoading(true);
    try {
      const result = await loginUser(data).unwrap();

      if (!result.success) throw new Error('Login unsuccessful');

      const token = result.accessToken;
      console.log('token', token);

      const rawDecoded = jwtDecode<RawToken>(token);
      console.log('rawDecoded', rawDecoded);
      const { tenantId, userType } = rawDecoded;

      const typedToken = decodeAndStoreToken(token);
      console.log('typedToken', typedToken);

      dispatch(setDecodedToken(typedToken));

      if (userType[0] === 'ASSESSOR') {
        hasNavigatedRef.current = true;

        const response = await getOnboardingStatus(tenantId);
        console.log(response);

        // const onboardingData = response.data;

        localStorage.setItem('onboardingStatus', response.data?.onboardingStatus || OnboardingStatus.NOT_STARTED);

        dispatch(setOnboardingStatus(response.data?.onboardingStatus || OnboardingStatus.NOT_STARTED));
        //TODO:route hard code change
        hasNavigatedRef.current = true;
        switch (response.data?.onboardingStatus) {
          case 'NOT_STARTED':
            router.push('/assessorOnboardingForm');
            break;
          case 'STARTED':
            console.log('Push to onboarding');
            router.push('/assessorOnboardingForm');
            break;
          case 'COMPLETED':
            console.log('Push to preview');
            router.push('/AssignedPlantsList');
            break;
          default:
            console.warn('Unhandled onboarding status:', response.data?.onboardingStatus);
            break;
        }
        return;
      }

      const response = await getOnboardingStatus(tenantId);
      console.log(response);

      const onboardingData = response.data;

      const error = response.error;
      if (!error) {
        localStorage.setItem('onboardingStatus', response.data?.onboardingStatus || OnboardingStatus.NOT_STARTED);

        dispatch(setOnboardingStatus(response.data?.onboardingStatus || OnboardingStatus.NOT_STARTED));
      }

      if (error || !onboardingData) {
        console.log('eerror in getting onboarding status ');

        throw new Error('Failed to fetch onboarding status');
      }

      hasNavigatedRef.current = true;
      switch (response.data?.onboardingStatus) {
        case 'NOT_STARTED':
          router.push('/organisationOnboarding');
          break;
        case 'STARTED':
          console.log('Push to onboarding');
          router.push('/AddContactPerson');
          break;
        case 'COMPLETED':
          console.log('Push to preview');
          router.push('/PlantOverview');
          break;
        default:
          console.warn('Unhandled onboarding status:', response.data?.onboardingStatus);
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
          <Typography className={styles.welcomeBackText} variant="h3" fontWeight="bold">
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
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            }}
            render={({ field, fieldState }) => (
              <InputWithLabel
                {...field}
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              maxLength: { value: 32, message: 'Password must be at most 32 characters' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must include uppercase, lowercase, number, and special character',
              },
              // Add more rules as needed (e.g., pattern for complexity)
            }}
            render={({ field, fieldState }) => (
              <PasswordTextField
                {...field}
                autoComplete="new-password"
                fullWidth={true}
                label="Password"
                placeholder="Enter your password"
                showLockIcon={false}
                showPasswordToggle
                showStrengthIndicator
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{
                  height: '40px',
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                    borderRadius: '18px',
                  },
                  '& .MuiInputBase-input': {
                    padding: '0 14px',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'black',
                    fontWeight: '700',
                    fontSize: '16px',
                  },
                }}
              />
            )}
          />

          <Button type="submit" fullWidth variant="contained" className={styles.button}>
            {loading ? (
              <ButtonWithLoader label="Sign In" backgroundColor="inherit" loaderColor="white" loading={true} height="30px" />
            ) : (
              'Sign In'
            )}
          </Button>

          <Typography variant="body2" className={styles.forgotPassword}>
            <Button
              onClick={() => {
                router.push('/forgotPassword');
              }}
            >
              Forgot password?
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
