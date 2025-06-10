'use client';

import { Box, Grid, Typography, FormControl, MenuItem, Select } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import defaultUserLogo from './../../../../../public/images/default-logo-image.png';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { useEffect, useState, useMemo } from 'react';
import { ContactPersonFormProps, PocPayload } from './ContactPerson.types';
import {
  useAddPointOfContactMutation,
  useGetPointOfContactQuery,
  useUploadPocProfilePicMutation,
} from './ContactPersonApi';
import styles from './ContactPerson.module.css';
import { CountryOptions } from '@/app/utils/CountryOptions';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { useRouter } from 'next/navigation';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';

const ContactPersonForm = ({ editMode = false }: ContactPersonFormProps) => {
  const tenantId = getValueLocalStorage('tenantId');
  console.log('tenantId ', tenantId);
  const router = useRouter();
  const [profilePicUrl, setProfilePicUrl] = useState<string>(defaultUserLogo.src);
  const [uploadPocProfilePic] = useUploadPocProfilePicMutation();
  const [submitPointOfContact, { isLoading }] = useAddPointOfContactMutation();
  const { data: existingData, isLoading: isFetching } = useGetPointOfContactQuery(tenantId, {
    skip: !editMode,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PocPayload>({
    defaultValues: {
      firstName: '',
      lastName: '',
      employeeId: '',
      email: '',
      country: '',
      designation: '',
      contactNumber: '',
      jobRole: '',
    },
    mode: 'onChange',
  });

  const watchedValues = useWatch({ control });

  const [activeStep, setActiveStep] = useState<number>(-1);

  const steps = useMemo(
    () => [
      { label: 'First Name', name: 'firstName' },
      { label: 'Last Name', name: 'lastName' },
      { label: 'Employee ID', name: 'employeeId' },
      { label: 'Email', name: 'email' },
      { label: 'Country', name: 'country' },
      { label: 'Designation', name: 'designation' },
      { label: 'Contact', name: 'contactNumber' },
      { label: 'Job Role', name: 'jobRole' },
    ],
    [],
  );

  useEffect(() => {
    if (editMode && existingData?.data && !isFetching) {
      const contact = existingData.data;

      reset({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        employeeId: contact.employeeId || '',
        email: contact.email || '',
        country: contact.country || '',
        designation: contact.designation || '',
        contactNumber: contact.contactNumber || '',
        jobRole: contact.jobRole || '',
      });
      if (contact.profilePicUrl && contact.profilePicUrl.startsWith('http')) {
        setProfilePicUrl(contact.profilePicUrl);
      }
    }
  }, [editMode, existingData, isFetching, reset]);

  console.log('Fetched POC:', existingData);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadPocProfilePic({ tenantId, formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setProfilePicUrl(localUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleFocus = (e: { target: { name: string } }) => {
    const index = steps.findIndex((s) => s.name === e.target.name);
    setActiveStep(index);
  };

  const completedSteps = useMemo(() => {
    return steps.reduce<number[]>((acc, step, idx) => {
      const val = watchedValues?.[step.name as keyof PocPayload];
      if (val && typeof val === 'string' && val.trim().length > 0) {
        acc.push(idx);
      }
      return acc;
    }, []);
  }, [watchedValues, steps]);

  const onSubmit = async (data: PocPayload) => {
    try {
      await submitPointOfContact({ tenantId, body: data }).unwrap();
      console.log('Form submitted successfully');
    } catch (err) {
      console.error('Error submitting form', err);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': { borderRadius: '8px' },
  };

  if (editMode && isFetching) {
    return (
      <Typography ml={2} mt={2}>
        Loading contact data...
      </Typography>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid className={styles.stepperContainer}>
        <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
      </Grid>
      <Typography variant="h6" fontWeight={600} className={styles.heading}>
        User Profile
      </Typography>
      <Grid className={styles.formContainer}>
        <Box className={styles.imageBox}>
          <ImageUploader imageProp={profilePicUrl} onUpload={handleUpload} />
        </Box>
        <Box className={styles.formFieldsBox}>
          <Grid container spacing={1}>
            {(
              ['firstName', 'lastName', 'employeeId', 'email', 'designation', 'contactNumber'] as (keyof PocPayload)[]
            ).map((fieldName) => (
              <Grid key={fieldName} size={{ xs: 12, sm: 6 }}>
                <Controller
                  name={fieldName}
                  control={control}
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label={fieldName
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())
                        .replace('Id', 'ID')}
                      placeholder={`Enter ${fieldName
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())
                        .replace('Id', 'ID')}`}
                      onFocus={handleFocus}
                      sx={textFieldStyles}
                      required
                    />
                  )}
                />
              </Grid>
            ))}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 600, color: '#313131' }}>
                  Country <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      sx={{ borderRadius: '8px', height: 41 }}
                      onOpen={() => handleFocus({ target: { name: 'country' } })}
                      inputProps={{ name: 'country', ' roboto': 'Select Country' }}
                    >
                      <MenuItem value="">
                        <em>Select Country</em>
                      </MenuItem>
                      {CountryOptions.map((country) => (
                        <MenuItem key={country.code} value={country.name}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid ml={5} mr={5}>
        <Controller
          name="jobRole"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              {...field}
              label="Job Role"
              placeholder="Specify Job Role"
              multiline
              rows={4}
              sx={textFieldStyles}
              required
              onFocus={handleFocus}
            />
          )}
        />
      </Grid>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        mt={1}
        ml={5}
        mr={5}
        sx={{ background: '#F5FAFD', height: '70px', borderRadius: '8px' }}
      >
        <CustomButton
          variant="contained"
          icon="left"
          color="#2D7FF9"
          onClick={() => router.push('/organisationOnboarding')}
        >
          Back
        </CustomButton>
        <CustomButton
          type="submit"
          variant="contained"
          icon="save"
          color="#2D7FF9"
          disabled={!isValid || isLoading}
          onClick={() => router.push('/PlantOverview')}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </CustomButton>
      </Box>
    </form>
  );
};

export default ContactPersonForm;
