'use client';

import { CountryOptions } from '@/app/utils/CountryOptions';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Stepper from '@/components/Stepper/Stepper';
import { Box, FormControl, FormHelperText, Grid, MenuItem, Paper, Select, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import defaultUserLogo from './../../../../../public/images/default-avatar-profile.png';
import styles from './ContactPerson.module.css';
import { ContactPersonFormProps, PocPayload } from './ContactPerson.types';
import {
  useAddPointOfContactMutation,
  useGetPointOfContactQuery,
  useLazyGetOnboardingStatusQuery,
  useUploadPocProfilePicMutation,
} from './ContactPersonApi';
import InfoBox from '@/components/InfoBox/InfoBox';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader } from '@/store/globalSlice';
import { useDispatch } from 'react-redux';
import Loader from '@/components/Loader/Loader';
import { contactPersonValidationRules } from './ContactPerson.validations';
import { setOnboardingStatus } from '@/app/(unprotectedRoutes)/login/loginSlice';

const ContactPersonForm = ({ editMode = false }: ContactPersonFormProps) => {
  const tenantId = getValueLocalStorage('tenantId');
  const router = useRouter();
  const [profilePicUrl, setProfilePicUrl] = useState<string>(defaultUserLogo.src);
  const [uploadPocProfilePic] = useUploadPocProfilePicMutation();
  const [submitPointOfContact, { isLoading }] = useAddPointOfContactMutation();
  const [getOnboardingStatus] = useLazyGetOnboardingStatusQuery();
  const { data: existingData, isFetching } = useGetPointOfContactQuery(tenantId ?? '', {
    skip: !editMode,
  });
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  useEffect(() => {
    if (editMode) {
      dispatch(setPageNameHeader('Edit contact person'));
    } else {
      dispatch(setPageNameHeader(pagesNames.organisationOnboardingContactPerson));
    }

    return () => {
      dispatch(setPageNameHeader(''));
    };
  }, [dispatch, editMode]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
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
    mode: 'onSubmit',
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
      const isValid = await trigger();
      if (!isValid) {
        console.log('Form has validation errors');
        return;
      }

      await submitPointOfContact({ tenantId: tenantId ?? '', body: data }).unwrap();
      const status = await getOnboardingStatus({ tenantId: tenantId ?? '' }).unwrap();
      console.log('Status response:', status);
      dispatch(setOnboardingStatus(status?.onboardingStatus));
      router.push('/PlantOverview');
    } catch (err) {
      console.error('Error submitting form', err);
    }
  };

  const handleSaveClick = async () => {
    // Trigger validation for all fields when save is clicked
    await trigger();
    handleSubmit(onSubmit)();
  };

  return (
    <>
      {isFetching ? (
        <Loader loading={true} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isMobile && !isTablet && (
            <Grid className={styles.stepperContainer}>
              <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
            </Grid>
          )}
          <Paper
            elevation={2}
            sx={{
              borderRadius: '16px',
              p: 2,
              backgroundColor: 'white',
              border: '1px solid #D8D8D8',
              height: isMobile || isTablet ? 'auto' : '78vh',
            }}
          >
            <Grid container spacing={2} alignItems="stretch" sx={{ height: isMobile || isTablet ? 'auto' : '74.5vh' }}>
              <Grid size={{ xs: 12, md: isMobile ? 12 : 8 }}>
                <Typography variant="h4" fontWeight={600} className={styles.heading}>
                  User Profile
                </Typography>
                <Grid className={styles.formContainer}>
                  <Box className={styles.imageBox}>
                    <ImageUploader imageProp={profilePicUrl} onUpload={handleUpload} />
                  </Box>
                  <Box className={styles.formFieldsBox}>
                    <Grid container spacing={1}>
                      {(
                        ['firstName', 'lastName', 'employeeId', 'email', 'designation', 'jobRole', 'contactNumber'] as (keyof PocPayload)[]
                      ).map((fieldName) => (
                        <Grid key={fieldName} size={{ xs: 12, sm: 6 }}>
                          <Controller
                            name={fieldName}
                            control={control}
                            rules={contactPersonValidationRules[fieldName as keyof typeof contactPersonValidationRules]}
                            render={({ field }) => (
                              <InputWithLabel
                                {...field}
                                label={fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                placeholder={`Enter ${fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}`}
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
                        <FormControl fullWidth sx={{ mt: 1.8 }} error={!!errors.country}>
                          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#313131' }}>
                            Country <span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <Controller
                            name="country"
                            control={control}
                            rules={contactPersonValidationRules.country}
                            render={({ field }) => (
                              <>
                                <Select
                                  {...field}
                                  displayEmpty
                                  sx={{ borderRadius: '16px', height: '38.5px' }}
                                  onOpen={() => handleFocus({ target: { name: 'country' } })}
                                  error={!!errors.country}
                                >
                                  <MenuItem value="">
                                    <span style={{ color: '#cdcdcd' }}>Select Country</span>
                                  </MenuItem>
                                  {CountryOptions.map((country) => (
                                    <MenuItem key={country.code} value={country.name}>
                                      {country.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {errors.country && (
                                  <FormHelperText sx={{ color: 'red', fontSize: '12px' }}>{errors.country.message}</FormHelperText>
                                )}
                              </>
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
                  <CustomButton type="button" variant="contained" icon="save" disabled={isLoading} onClick={handleSaveClick}>
                    {isLoading ? 'Saving...' : 'Save'}
                  </CustomButton>
                </Box>
              </Grid>

              {!isMobile && !isTablet && (
                <Grid size={{ xs: 4 }}>
                  <InfoBox
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nulla arcu. Nam accumsan vel lectus nec ullamcorper. Sed euismod ultrices velit, nec dignissim tortor aliquam eu. Praesent volutpat tortor a mi molestie blandit. Nulla euismod tortor a luctus maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio enim, ullamcorper ornare egestas in, tristique non velit. Sed molestie felis id quam cursus elementum. Curabitur lectus sapien, placerat vel nulla ut, euismod rhoncus nulla. Sed convallis vulputate purus, at varius nisl efficitur cursus. Pellentesque tincidunt, velit id."
                    heading="About Contact Person"
                  />
                </Grid>
              )}
            </Grid>
          </Paper>
        </form>
      )}
    </>
  );
};

export default ContactPersonForm;
