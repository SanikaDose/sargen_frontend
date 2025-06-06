'use client';

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box, Button, FormControl, FormHelperText, OutlinedInput, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from './style.module.css';
import { useForgotPasswordApiMutation } from '../login/loginApi';
import { pageRoutes } from '@/constants/pagesRoutes';

type FormValues = {
  email: string;
};

const inputSx = {
  backgroundColor: '#fff',
};

const ForgotPasswordPage = ({ setForgotPassword }: { setForgotPassword: (val: boolean) => void }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [forgotPasswordApi] = useForgotPasswordApiMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await forgotPasswordApi(data).unwrap();
      if (result.success) {
        router.push(pageRoutes.unprotected.forgotPasswordInitialMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderFormField = (
    name: keyof FormValues,
    label: string,
    type: string = 'text',
    validate?: (value: string) => string | boolean,
  ) => {
    return (
      <FormControl fullWidth variant="outlined" error={!!errors[name]}>
        <Typography variant="subtitle1" className={styles.labelOfForm}>
          {label}
        </Typography>
        <OutlinedInput
          placeholder={`Enter your ${label.toLowerCase()}`}
          type={type}
          {...register(name, {
            required: `${label} is required`,
            validate,
          })}
          sx={inputSx}
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    );
  };

  return (
    <form className={styles.outerContainer} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Box className={styles.form_header_outerContainer}>
          <Typography variant="h4" textAlign="center" className={styles.form_header}>
            Forgot Password
          </Typography>
          <Typography variant="caption" className={styles.form_header_caption}>
            Forgot password? Don’t worry, we’re here to help.
          </Typography>
        </Box>

        {renderFormField('email', 'Email', 'email')}

        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setForgotPassword(false);
          }}
        >
          Back
        </Button>
      </Stack>
    </form>
  );
};

export default ForgotPasswordPage;
