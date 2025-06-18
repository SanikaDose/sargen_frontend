'use client';

import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { PasswordTextField } from '@/components/Password/Password';
import styles from './style.module.css';
import { FormValues, RegisterFormInputs } from './register.types';
import { useRegisterUserMutation } from './registerApi';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [registerUser] = useRegisterUserMutation();
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      user_type: 'PLATFORMUSER',
      firstName: '',
      lastName: '',
      organisationName: '',
      email: '',
      password: '',
      rePassword: '',
    },
    shouldUnregister: true,
  });

  const [typeOfUser, setTypeOfUser] = useState<string>('organisation');

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,16}$/;
  const validatePassword = useCallback(
    (value: string) =>
      passwordRegex.test(value) ||
      'Password must be 8–16 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and no spaces',
    [],
  );

  async function handleRegister(data: RegisterFormInputs) {
    console.log('inside the handle register function')
    const preDefinedBody = {
      ...data,
      applications: ['SARGEN'],
      user_type: [data.user_type],
      isVerified: false,
    };

    try {
      const result = await registerUser(preDefinedBody).unwrap();
      console.log('Registration result:', result);
      if (result.success) {
        router.push('/register/registerAppreciation');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  }

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Box className={styles.paper}>
        <section className={styles.textContainer}>
          <Typography className={styles.welcomeBackText} variant="h4" fontWeight="bold" gutterBottom>
            Register
          </Typography>
          <Typography className={styles.welcomeBackHelperText} variant="subtitle1" color="text.secondary" gutterBottom>
            Register to access your industry roadmap
          </Typography>
        </section>

        <Box component="form" onSubmit={handleSubmit(handleRegister)} noValidate className={styles.form}>
          <FormControl className={styles.radioConatiner} component="fieldset" error={!!errors.user_type}>
            <Typography variant="subtitle1" className={styles.label}>
              Select User Type
            </Typography>
            <Controller
              name="user_type"
              control={control}
              rules={{ required: 'Please select a user type' }}
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  value={field.value || 'PLATFORMUSER'}
                  onChange={(e) => {
                    const value = e.target.value as 'PLATFORMUSER' | 'ASSESSOR';
                    field.onChange(value);
                    setTypeOfUser(value === 'PLATFORMUSER' ? 'organisation' : 'PLATFORMUSER');

                    reset({
                      user_type: value,
                      firstName: '',
                      lastName: '',
                      organisationName: '',
                      email: '',
                      password: '',
                      rePassword: '',
                    });
                  }}
                >
                  <FormControlLabel value="PLATFORMUSER" control={<Radio />} label="Organisation" />
                  <FormControlLabel value="ASSESSOR" control={<Radio />} label="Assessor" />
                </RadioGroup>
              )}
            />
            <FormHelperText>{errors.user_type?.message}</FormHelperText>
          </FormControl>

          {typeOfUser === 'PLATFORMUSER' && (
            <Box id={styles.platFormUser}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <InputWithLabel
                    {...field}
                    value={field.value || ''}
                    label="First Name"
                    name="firstName"
                    placeholder="Enter first name"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <InputWithLabel
                    {...field}
                    value={field.value || ''}
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter last name"
                  />
                )}
              />
            </Box>
          )}

          {typeOfUser === 'organisation' && (
            <Controller
              name="organisationName"
              control={control}
              rules={{ required: 'Organisation name is required' }}
              render={({ field }) => (
                <InputWithLabel
                  {...field}
                  value={field.value || ''}
                  label="Organisation Name"
                  name="organisationName"
                  placeholder="Enter organisation name"
                />
              )}
            />
          )}

          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <InputWithLabel
                {...field}
                value={field.value || ''}
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
            rules={{ required: 'Password is required', validate: validatePassword }}
            render={({ field }) => (
              <PasswordTextField
                {...field}
                value={field.value || ''}
                label="Password"
                placeholder="Enter your password"
                showPasswordToggle
                showStrengthIndicator
              />
            )}
          />

          <Controller
            name="rePassword"
            control={control}
            rules={{
              required: 'Please confirm your password',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            }}
            render={({ field }) => (
              <PasswordTextField
                {...field}
                value={field.value || ''}
                label="Confirm Password"
                placeholder="Re-enter your password"
                showPasswordToggle
              />
            )}
          />

          <Button type="submit" fullWidth variant="contained" className={styles.button}>
            Create Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
