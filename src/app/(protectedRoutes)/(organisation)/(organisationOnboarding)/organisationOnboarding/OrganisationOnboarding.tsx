import { CountryOptions } from '@/app/utils/CountryOptions';
import { currencyOptions } from '@/app/utils/CurrencyOptions';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Loader from '@/components/Loader/Loader';
import Stepper from '@/components/Stepper/Stepper';
import { setPageNameHeader } from '@/store/globalSlice';
import { Box, FormControl, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { OrgFormInputs } from './FormConfig/formInputStep';
import styles from './OrganisationOnboarding.module.css';
import { OrgOnboardType } from './OrganisationOnboarding.types';
import { OrgPayload, useSubmitOrganizationInfoMutation, useUploadOrganizationLogoMutation } from './OrganisationOnboardingAPi';
const steps = [
  'Company Name',
  'Company website',
  'GST In',
  'Country',
  'Organization Revenue',
  'Currency Type',
  'Number of Employees',
  'About Organization',
].map((label) => ({ label }));

import InfoBox from '@/components/InfoBox/InfoBox';
function OrganizationOnbording() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNameHeader('Organization Onboarding'));
  }, [dispatch]);
  const router = useRouter();
  const [submitOrganizationInfo, { isLoading }] = useSubmitOrganizationInfoMutation();

  const [uploadOrganizationLogo] = useUploadOrganizationLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-avatar-profile.png?ignore');

  const tenantId = getValueLocalStorage('tenantId');
  const { control, handleSubmit } = useForm({
    defaultValues: {
      companyName: '',
      website: '',
      gstin: '',
      country: '',
      revenue: '',
      uom: '',
      numberOfEmployees: '',
      about: '',
    },
  });
  // const { data } = useGetOrganizationInfoQuery(tenantId || '', {
  //   skip: !tenantId,
  // });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const watchedValues = useWatch({ control });

  // this is an spread operator to get the values of the form inputs (mainly for about section)
  const allInputs = [...OrgFormInputs, { name: 'about', label: 'About Organization' }];

  // ✅ Compute activeStep based on focused field index
  const activeStep = useMemo(() => {
    const index = allInputs.findIndex((input) => input.name === focusedField);
    return index !== -1 ? index : 0;
  }, [focusedField]);

  // ✅ Compute completed steps where value length > 5
  const completedSteps = useMemo(() => {
    return allInputs.reduce((acc: number[], input, index) => {
      const value = watchedValues?.[input.name as keyof OrgOnboardType];
      if (typeof value === 'string' && value.length > 1) {
        acc.push(index);
      }
      return acc;
    }, []);
  }, [watchedValues]);

  //hnadle organization logo
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadOrganizationLogo({ tenantId: tenantId ?? '', formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
    } catch (error) {
      console.log('error', error);
    }
  };

  //on form submit
  const onSubmit = async (data: OrgPayload) => {
    try {
      await submitOrganizationInfo({ tenantId: tenantId ?? '', body: data }).unwrap();
      router.push('/AddContactPerson');
    } catch (error) {
      console.log('error ', error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader loading={true} />
      ) : (
        <Box sx={{ width: '100%', height: '99.5%' }}>
          {' '}
          <Box className={styles.stepperContainer}>
            <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
          </Box>
          <Paper elevation={2} sx={{ borderRadius: '16px' }} className={styles.paperContainer}>
            <form className={styles.mostOuterConatiner} onSubmit={handleSubmit(onSubmit)}>
              <Box className={styles.formOuterContainer}>
                <Typography variant="h4" className={styles.heading}>
                  Organization Details
                </Typography>

                <Box className={styles.formContainer}>
                  <Box className={styles.imageBox}>
                    <ImageUploader imageProp={logoUrl} onUpload={handleUpload} />
                  </Box>

                  <Box className={styles.formFieldsBox}>
                    <section className={styles.formFieldsInner}>
                      <Grid container spacing={1}>
                        {OrgFormInputs.map((input) => (
                          <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }} key={input.name}>
                            <Controller
                              name={input.name as keyof OrgOnboardType}
                              control={control}
                              defaultValue=""
                              rules={input.rules}
                              render={({ field, fieldState }) => (
                                <>
                                  {input.isCountry || input.isCurrency ? (
                                    <FormControl fullWidth sx={{ mt: 1.9 }}>
                                      <Typography sx={{ fontWeight: 600, color: '#000000' }}>
                                        {input.label}
                                        {input.rules?.required && <span style={{ color: 'red' }}> *</span>}
                                      </Typography>
                                      <Select
                                        {...field}
                                        displayEmpty
                                        value={field.value || ''}
                                        sx={{
                                          borderRadius: '8px',
                                          height: 36,
                                          fontWeight: 500,
                                          fontfamily: 'Inter, sans-serif',
                                        }}
                                        onFocus={() => setFocusedField('country')}
                                      >
                                        <MenuItem disabled value="">
                                          <em>Select From Dropdown</em>
                                        </MenuItem>
                                        {(input.isCountry ? CountryOptions : currencyOptions).map((option) => (
                                          <MenuItem key={option.code} value={option.name}>
                                            {option.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                      {fieldState?.error?.message && (
                                        <Typography variant="caption" color="error">
                                          {fieldState.error.message}
                                        </Typography>
                                      )}
                                    </FormControl>
                                  ) : (
                                    <>
                                      <InputWithLabel
                                        {...field}
                                        label={input.label + (input.rules?.required ? ' *' : '')}
                                        placeholder={input.placeholder}
                                        type={input.type || 'text'}
                                        onFocus={() => setFocusedField(input.name)}
                                        size="small"
                                      />
                                      {fieldState?.error?.message && (
                                        <Typography variant="caption" color="error">
                                          {fieldState.error.message}
                                        </Typography>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            />
                          </Grid>
                        ))}
                      </Grid>
                      <Box className={styles.aboutSection}>
                        <Controller
                          name="about"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <InputWithLabel
                              {...field}
                              label="About Orgnization"
                              placeholder="Enter About Orgnization"
                              // required={true}
                              multiline
                              type="text"
                              rows={2}
                              onFocus={() => setFocusedField('about')}
                            />
                          )}
                        />
                      </Box>
                    </section>
                  </Box>
                </Box>
              </Box>
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
                <CustomButton variant="contained" icon="left" color="primary" disabled>
                  Back
                </CustomButton>
                <CustomButton type="submit" variant="contained" icon="right" color="primary">
                  {isLoading ? 'Next...' : 'Next'}
                </CustomButton>
              </Box>
            </form>

            <Box sx={{ width: '30%' }} className={styles.rightSection}>
              <InfoBox />
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}

export default OrganizationOnbording;
