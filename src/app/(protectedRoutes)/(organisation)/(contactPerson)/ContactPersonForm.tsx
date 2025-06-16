'use client';

import { Box, Grid, Typography, FormControl, MenuItem, Select, Paper } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import defaultUserLogo from './../../../../../public/images/default-avatar-profile.png';
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
import { setPageName } from '@/store/globalSlice';
import { useDispatch } from 'react-redux';
import InfoBox from '@/components/InfoBox/InfoBox';

const ContactPersonForm = ({ editMode = false }: ContactPersonFormProps) => {
  const tenantId = getValueLocalStorage('tenantId');
  console.log('tenantId ', tenantId);
  const router = useRouter();
  const [profilePicUrl, setProfilePicUrl] = useState<string>(defaultUserLogo.src);
  const [uploadPocProfilePic] = useUploadPocProfilePicMutation();
  const [submitPointOfContact, { isLoading }] = useAddPointOfContactMutation();
  const { data: existingData, isFetching } = useGetPointOfContactQuery(tenantId ?? '', {
    skip: !editMode,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageName(editMode ? 'Edit Contact Person' : 'Add Contact Person'));
    return () => {
      dispatch(setPageName(''));
    };
  }, [dispatch, editMode]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
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
      { label: 'Designation', name: 'designation' },
      { label: 'Job Role', name: 'jobRole' },
      { label: 'Contact Number', name: 'contactNumber' },
      { label: 'Country', name: 'country' },
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

  console.log('Fetched POC?', existingData);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadPocProfilePic({ tenantId: tenantId ?? '', formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setProfilePicUrl(localUrl);
    } catch (error) {
      console.error('Image upload failed!', error);
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
      await submitPointOfContact({ tenantId: tenantId ?? '', body: data }).unwrap();
      console.log('Form submitted successfully');
    } catch (err) {
      console.error('Error submitting form', err);
    }
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
      <Paper
        elevation={2}
        sx={{
          borderRadius: '16px',
          p: 2,
          backgroundColor: 'white',
          border: '1px solid rgb(216, 216, 216)',
          // height: '78vh',
        }}
      >
        {/* Split into 2 columns and match their height */}
        <Grid container spacing={2} alignItems="stretch" sx={{ height: '74vh' }}>
          {/* Left side - form content (existing structure) */}
          <Grid size={{ xs: 8 }}>
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
                    [
                      'firstName',
                      'lastName',
                      'employeeId',
                      'email',
                      'designation',
                      'jobRole',
                      'contactNumber',
                    ] as (keyof PocPayload)[]
                  ).map((fieldName) => (
                    <Grid key={fieldName} size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name={fieldName}
                        control={control}
                        render={({ field }) => (
                          <InputWithLabel
                            {...field}
                            label={fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                            placeholder={`Enter ${fieldName
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (str) => str.toUpperCase())}`}
                            onFocus={handleFocus}
                            required
                            error={!!errors[fieldName]}
                            helperText={errors[fieldName]?.message}
                          />
                        )}
                      />
                    </Grid>
                  ))}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth sx={{ mt: 1.8 }}>
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
                            sx={{ borderRadius: '16px', height: '38.5px' }}
                            onOpen={() => handleFocus({ target: { name: 'country' } })}
                            // inputProps={{ name: 'country', 'aria-label': 'Select Country' }}
                            error={!!errors.country}
                          >
                            <MenuItem value="">
                              {' '}
                              <span style={{ color: '#cdcdcd' }}>Select Country</span>
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

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              mt={5}
              ml={5}
              mr={5}
              sx={{ background: '#F5FAFD', height: '70px', borderRadius: '16px' }}
            >
              <CustomButton variant="contained" icon="left" onClick={() => router.push('/organisationOnboarding')}>
                Back
              </CustomButton>
              <CustomButton type="submit" variant="contained" icon="save" disabled={!isValid || isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </CustomButton>
            </Box>
          </Grid>

          {/* Right side - InfoBox */}
          <Grid size={{ xs: 4 }}>
            <InfoBox
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nulla arcu. Nam accumsan vel lectus nec ullamcorper. Sed euismod ultrices velit, nec dignissim tortor aliquam eu. Praesent volutpat tortor a mi molestie blandit. Nulla euismod tortor a luctus maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio enim, ullamcorper ornare egestas in, tristique non velit. Sed molestie felis id quam cursus elementum. Curabitur lectus sapien, placerat vel nulla ut, euismod rhoncus nulla. Sed convallis vulputate purus, at varius nisl efficitur cursus. Pellentesque tincidunt, velit id."
              heading="About Industry"
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default ContactPersonForm;
