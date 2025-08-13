'use client';

import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, Button, FormControl, FormHelperText, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from './style.module.css';
import { useForgotPasswordApiMutation } from '../login/loginApi';
import { pageRoutes } from '@/constants/pagesRoutes';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';

type FormValues = {
  email: string;
};

const ForgotPasswordPage = () => {
  const router = useRouter();
  const {
    control,
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

  const handleBackClick = () => {
    router.push(pageRoutes.unprotected.login);
  };

  const renderFormField = (name: keyof FormValues, label: string, type: string = 'text', rules?: object) => (
    <FormControl fullWidth variant="outlined" error={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <InputWithLabel {...field} label={label} name={name} placeholder={`Enter your ${label.toLowerCase()}`} type={type} />
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.paper}>
        <section className={styles.textContainer}>
          <Typography className={styles.welcomeBackText} variant="h4" fontWeight="bold" gutterBottom>
            Forgot Password
          </Typography>
          <Typography className={styles.welcomeBackHelperText} variant="subtitle1" color="text.secondary" gutterBottom>
            Forgot password? Don&#39;t worry, we&#39;re here to help.
          </Typography>
        </section>

        {renderFormField('email', 'Email', 'email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email address',
          },
        })}

        <Button type="submit" sx={{ width: '100%', mt: '10px' }} variant="contained">
          Submit
        </Button>
        <Button onClick={handleBackClick}>Back</Button>
      </Box>
    </form>
  );
};

export default ForgotPasswordPage;
