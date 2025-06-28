'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormHelperText, OutlinedInput, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import styles from './resetPassword.module.css';
import { pageRoutes } from '@/constants/pagesRoutes';
import { useResetPassMutation } from './resetPasswordApi';

type FormValues = {
  password: string;
};

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const [resetPass] = useResetPassMutation();
  const { sid } = useParams();

  const sidValue = typeof sid === 'string' ? sid : '';

  const handleResetPassword = async (data: FormValues) => {
    const sidAdd = {
      ...data,
      sid: sidValue,
    };
    try {
      const result = await resetPass(sidAdd).unwrap();
      if (result.success) {
        router.push(pageRoutes.unprotected.login);
      }
    } catch (error) {
      console.error(error);
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
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    );
  };

  const renderResetPassword = () => {
    return (
      <section className={styles.outerContainer}>
        <Box className={styles.form_header_outerContainer}>
          <Typography variant="h4" textAlign="center" className={styles.form_header}>
            Reset Password
          </Typography>
        </Box>
        {renderFormField('password', 'New Password', 'password')}
        <Button type="submit" variant="contained">
          Reset Password
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            router.push('/login');
          }}
        >
          Back
        </Button>
      </section>
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleResetPassword)}>
      {renderResetPassword()}
    </Box>
  );
}
