'use client';

import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { Box, Container, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { showToast } from '@/components/toaster/toasterSlice';
import Toaster from '@/components/toaster/Toaster';
import styles from './style.module.css'; // ✅ Use your existing CSS

interface EnquiryFormInputs {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const EnquiryPage = () => {
  const { control, handleSubmit, reset } = useForm<EnquiryFormInputs>();
  const dispatch = useDispatch();

  const onSubmit = (data: EnquiryFormInputs) => {
    // Example: submit data to API or handle it
    console.log('Enquiry Submitted:', data);
    dispatch(showToast({ message: 'Enquiry submitted successfully!', severity: 'success' }));
    reset();
  };

  return (
    <Container maxWidth="sm" className={styles.enquiryContainer}>
      <Toaster />
      <Box className={styles.enquiryPaper}>
        <section className={styles.textContainer}>
          <Typography className={styles.welcomeBackText} variant="h3" fontWeight="bold">
            Enquiry Form
          </Typography>
          <Typography className={styles.welcomeBackHelperText} variant="subtitle1" color="text.secondary" gutterBottom>
            Fill out the form and we will get back to you soon.
          </Typography>
        </section>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate id="enquiry-form" className={styles.form}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <InputWithLabel {...field} label="Name" name="name" placeholder="Enter your name" required />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <InputWithLabel
                {...field}
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                required
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputWithLabel
                {...field}
                label="Phone (optional)"
                name="phone"
                placeholder="Enter your phone number"
                type="tel"
              />
            )}
          />

          <Controller
            name="message"
            control={control}
            defaultValue=""
            rules={{ required: 'Message is required' }}
            render={({ field }) => (
              <InputWithLabel
                {...field}
                label="Message"
                name="message"
                placeholder="Type your message"
                multiline
                rows={4}
                required
              />
            )}
          />

          <Box mt={2}>
            <CustomButton type="submit" width="100%" icon="submit" height="5vh">
              Submit Enquiry
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EnquiryPage;
