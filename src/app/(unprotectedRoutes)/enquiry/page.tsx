'use client';

import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { Box, Container, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './style.module.css'; // ✅ Use your existing CSS
import { EnquiryRequest } from './enquiry.types';
import { useSubmitEnquiryMutation } from './enquiryApi';
import ButtonWithLoader from '@/components/ButtonWithLoader/buttonWithLoader';

const EnquiryPage = () => {
  const { control, handleSubmit, reset } = useForm<EnquiryRequest>();
  const [submitEnquiry, { isLoading }] = useSubmitEnquiryMutation();

  const onSubmit = async (data: EnquiryRequest) => {
    try {
      console.log('Submitting enquiry with data:', data);
      await submitEnquiry(data).unwrap();
      reset();
    } catch (error) {
      // Error is handled by the toast in rtkAPIToast
      console.error('Failed to submit enquiry:', error);
    }
  };

  return (
    <Container maxWidth="sm" className={styles.enquiryContainer}>
      <Box className={styles.enquiryPaper}>
        <section className={styles.textContainer}>
          <Typography className={styles.welcomeBackText} variant="h3" fontWeight="bold">
            Enquiry Form
          </Typography>
          <Typography className={styles.welcomeBackHelperText} variant="subtitle1" color="text.secondary" gutterBottom>
            Fill out the form and we will get back to you soon.
          </Typography>
        </section>

        {/* <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate id="enquiry-form" className={styles.form}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field }) => <InputWithLabel {...field} label="Name" name="name" placeholder="Enter your name" required />}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <InputWithLabel {...field} label="Email" name="email" placeholder="Enter your email" type="email" required />
            )}
          />

          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputWithLabel {...field} label="Phone (optional)" name="phone" placeholder="Enter your phone number" type="tel" />
            )}
          />

          <Controller
            name="orgName"
            control={control}
            defaultValue=""
            rules={{ required: 'Organization Name is required' }}
            render={({ field }) => (
              <InputWithLabel {...field} label="Organization Name" name="orgName" placeholder="Type your organization name" required />
            )}
          />

          <Controller
            name="message"
            control={control}
            defaultValue=""
            rules={{ required: 'Message is required' }}
            render={({ field }) => (
              <InputWithLabel {...field} label="Message" name="message" placeholder="Type your message" multiline rows={4} required />
            )}
          />

          <Box mt={-1.5}>
            <ButtonWithLoader
              label="Submit Enquiry"
              type="submit"
              loaderColor="white"
              loading={isLoading}
              fullWidth
              height="5vh"
              disabled={isLoading}
            />
          </Box>
        </Box> */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate id="enquiry-form" className={styles.form}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
              maxLength: { value: 50, message: 'Name must be at most 50 characters' },
            }}
            render={({ field, fieldState }) => (
              <InputWithLabel
                {...field}
                label="Name"
                name="name"
                placeholder="Enter your name"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

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
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value: /^[0-9+\-\s()]{7,20}$/,
                message: 'Enter a valid phone number',
              },
            }}
            render={({ field, fieldState }) => (
              <InputWithLabel
                {...field}
                label="Phone (optional)"
                name="phone"
                placeholder="Enter your phone number"
                type="tel"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="orgName"
            control={control}
            defaultValue=""
            rules={{
              required: 'Organization Name is required',
              minLength: { value: 2, message: 'Organization Name must be at least 2 characters' },
              maxLength: { value: 100, message: 'Organization Name must be at most 100 characters' },
            }}
            render={({ field, fieldState }) => (
              <InputWithLabel
                {...field}
                label="Organization Name"
                name="orgName"
                placeholder="Type your organization name"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="message"
            control={control}
            defaultValue=""
            rules={{
              required: 'Message is required',
              minLength: { value: 10, message: 'Message must be at least 10 characters' },
              maxLength: { value: 1000, message: 'Message must be at most 1000 characters' },
            }}
            render={({ field, fieldState }) => (
              <InputWithLabel
                {...field}
                label="Message"
                name="message"
                placeholder="Type your message"
                multiline
                rows={4}
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Box mt={-1.5}>
            <ButtonWithLoader
              label="Submit Enquiry"
              type="submit"
              loaderColor="white"
              loading={isLoading}
              fullWidth
              height="5vh"
              disabled={isLoading}
              backgroundColor="rgb(20, 122, 224)"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EnquiryPage;
