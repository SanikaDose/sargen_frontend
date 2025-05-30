'use client';

import React, { useState } from 'react';
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller, Control } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

const formFields: {
  name: keyof LoginFormInputs;
  label: string;
  placeholder: string;
  type?: string;
}[] = [
  { name: 'email', label: 'Email', placeholder: 'Enter your email', type: 'text' },
  { name: 'password', label: 'Password', placeholder: 'Enter your password', type: 'password' },
];

type FormInputProps = {
  name: keyof LoginFormInputs;
  label: string;
  placeholder: string;
  type?: string;
  control: Control<LoginFormInputs>;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
};

const FormInput = ({
  name,
  label,
  placeholder,
  type = 'text',
  control,
  showPassword,
  togglePasswordVisibility,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    rules={{ required: `${label} is required` }}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label={label}
        placeholder={placeholder}
        type={name === 'password' && !showPassword ? 'password' : 'text'}
        margin="normal"
        variant="outlined"
        InputProps={{
          endAdornment:
            name === 'password' ? (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : undefined,
        }}
      />
    )}
  />
);

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Login Data:', data);
    // You can replace this with your API call
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        elevation={3}
        sx={{ borderRadius: 3, p: 4, background: 'linear-gradient(to bottom right, #e0eafc, #cfdef3)' }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Sign in to access your industry roadmap
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate mt={3}>
          {formFields.map((field) => (
            <FormInput
              key={field.name}
              {...field}
              control={control}
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
            />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: '#3f75f6',
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': { backgroundColor: '#365fd0' },
            }}
          >
            Sign In
          </Button>

          <Typography variant="body2" mt={2} textAlign="center" color="primary">
            Forgot password?
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
