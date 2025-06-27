'use client';

import { currencyOptions } from '@/app/utils/CurrencyOptions';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { triggerToast } from '@/app/utils/toast';
import CurrencyValueSelector from '@/components/CurrencyDropDown/CurrencyDropDown';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import InfoBox from '@/components/InfoBox/InfoBox';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Loader from '@/components/Loader/Loader';
import Stepper from '@/components/Stepper/Stepper';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader } from '@/store/globalSlice';
import { Box, Divider, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styles from './AddPlant.module.css';
import { AddPlantInfoResponse, PlantFormType } from './AddPlant.types';
import { useAddPlantInfoMutation, useUploadPlantLogoMutation } from './AddPlantApis';
import { plantFormInputs } from './FormConfig/formInputStep';
const tenantId = getValueLocalStorage('tenantId');

const steps = [
  'Name',
  'Location',
  'Reg No.',
  'GSTIN',
  'Type',
  'Age',
  'Revenue',
  'Revenue Unit',
  'Currency',
  'Employees',
  'Lines',
  'Assessment',
  'Debrief',
  'About',
  'Full Name',
  'Email',
  'Contact Number',
].map((label) => ({ label }));

const PlantRegistrationForm = () => {
  const dispatch = useDispatch();
  dispatch(setPageNameHeader(pagesNames.plantOnboarding));
  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<PlantFormType>();
  const [addPlantInfo, { isLoading }] = useAddPlantInfoMutation();
  const [uploadPlantLogo] = useUploadPlantLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-logo-image.png?ignore');
  const [, setSelectedFile] = useState<File | null>(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const watchedValues = useWatch({ control });

  const handleUpload = async (file: File) => {
    const localUrl = URL.createObjectURL(file);
    setLogoUrl(localUrl); // Only for preview

    //set the i image in state
    setSelectedFile(file);
  };

  //this is an function which will fill the form with the data from the API and then uload the image while getting the plantId from respomse
  const onSubmit = async (data: PlantFormType) => {
    const { revenue, revenueUnit, numberOfEmployees, numberOfLines, ...rest } = data;
    console.log('data', data);
    const finalRevenue = Number((revenue || '').toString().replace(/,/g, '')) * Number(revenueUnit);
    const cleanedEmployees = Number((numberOfEmployees || '').toString().replace(/,/g, ''));
    const cleanedLines = Number((numberOfLines || '').toString().replace(/,/g, ''));
    const payload = {
      ...rest,
      revenue: finalRevenue,
      numberOfEmployees: cleanedEmployees,
      numberOfLines: cleanedLines,
      age: data.age ? Number(data.age) : 0,
    };
    console.log('updated addda', payload);
    try {
      //  🔁 Step 1: Submit plant form
      const response = (await addPlantInfo({
        tenantId: tenantId ?? '',
        body: payload,
      }).unwrap()) as unknown as AddPlantInfoResponse;
      console.log('Response from addPlantInfo:', response);

      // ✅ Step 2: Extract `plantId` from response
      const newPlantId = response?.id;

      // ✅ Step 3: Upload image only if user uploaded one
      if (logoUrl && newPlantId && !logoUrl.includes('default-logo-image')) {
        const blob = await fetch(logoUrl).then((res) => res.blob());
        const file = new File([blob], 'plant-logo.png', { type: blob.type });

        const formData = new FormData();
        formData.append('file', file);

        await uploadPlantLogo({ tenantId: tenantId ?? '', plantId: newPlantId, formData }).unwrap();
      }
      triggerToast('Plant Onboarded successfully!', 'success');

      // ✅ Step 4: Reset and redirect
      reset();
      router.push('/PlantOverview');
    } catch (error) {
      console.error('Failed to add plant info or upload image:', error);
    }
  };

  // this is an spread operator to get the values of the form inputs (mainly for about section)
  const allInputs = [...plantFormInputs, { name: 'about', label: 'About Us' }];

  // ✅ Compute activeStep based on focused field index
  const activeStep = useMemo(() => {
    const index = allInputs.findIndex((input) => input.name === focusedField);
    return index !== -1 ? index : 0;
  }, [focusedField]);

  // ✅ Compute completed steps where value length > 1
  const completedSteps = useMemo(() => {
    return allInputs.reduce((acc: number[], input, index) => {
      const value = watchedValues?.[input.name as keyof PlantFormType];
      if (typeof value === 'string' && value.length >= 1) {
        acc.push(index);
      }
      return acc;
    }, []);
  }, [watchedValues]);

  useEffect(() => {
    // console.log('Errors:', errors);
  }, [errors]);

  function formatWithIndianCommas(value: string | number): string {
    const str = (value ?? '').toString(); // ✅ safely convert to string

    const raw = str.replace(/,/g, '');

    // Format only if it's a valid number
    if (/^\d+$/.test(raw)) {
      return Number(raw).toLocaleString('en-IN');
    }

    return str; // fallback to raw input
  }
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
            <form className={styles.mostOuterConatiner} onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box className={styles.formOuterContainer}>
                <Box className={styles.formContainer}>
                  <Box className={styles.imageBox}>
                    <ImageUploader imageProp={logoUrl} onUpload={handleUpload} shape="square" />
                  </Box>

                  <Box className={styles.formFieldsBox}>
                    <section className={styles.formFieldsInner}>
                      <Grid container spacing={1}>
                        {plantFormInputs.map((input) => (
                          <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }} key={input.name}>
                            <Controller
                              name={input.name as keyof PlantFormType}
                              control={control}
                              defaultValue=""
                              rules={input.rules}
                              render={({ field, fieldState }) => (
                                <>
                                  {input.isCurrency || input.isRevenueUnit ? (
                                    <CurrencyValueSelector
                                      {...field}
                                      value={String(field.value ?? '')}
                                      label={input.label}
                                      placeholder={input.placeholder}
                                      options={
                                        input.isCurrency
                                          ? currencyOptions.map(({ name }) => ({
                                              label: name,
                                              value: name,
                                            }))
                                          : [
                                              { label: 'Thousand', value: '1000' },
                                              { label: 'Lakh', value: '100000' },
                                              { label: 'Crore', value: '10000000' },
                                            ].map(({ label, value }) => ({
                                              label: label,
                                              value: value,
                                            }))
                                      }
                                      required={true}
                                      onFocus={() => setFocusedField(input.name)}
                                      error={!!fieldState.error}
                                      helperText={fieldState.error?.message}
                                    />
                                  ) : (
                                    <>
                                      <InputWithLabel
                                        {...field}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        type={input.type || 'text'}
                                        value={
                                          ['numberOfEmployees', 'revenue', 'numberOfLines'].includes(input.name)
                                            ? formatWithIndianCommas(field.value)
                                            : field.value
                                        }
                                        onChange={(e) => {
                                          const value = e.target.value;

                                          if (['numberOfEmployees', 'revenue', 'numberOfLines'].includes(input.name)) {
                                            // Remove all commas and only allow digits
                                            const rawValue = value.replace(/,/g, '');

                                            if (/^\d*$/.test(rawValue)) {
                                              console.log('rawvaueee', rawValue);
                                              field.onChange(rawValue); // Save raw digits only
                                            }
                                          }
                                          if (input.name === 'gstin') {
                                            field.onChange(value.toUpperCase());
                                          } else {
                                            field.onChange(value);
                                          }
                                        }}
                                        onFocus={() => setFocusedField(input.name)}
                                        size="small"
                                        required={true}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                      />
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
                          rules={{
                            required: 'About Organization is required',
                            maxLength: {
                              value: 200,
                              message: 'Only 200 characters are allowed',
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <InputWithLabel
                              {...field}
                              label="About Plant"
                              placeholder="Enter About Plant"
                              // required={true}
                              multiline
                              type="text"
                              rows={2}
                              onFocus={() => setFocusedField('about')}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          )}
                        />
                      </Box>

                      <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 3, width: '100%' }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Point Of Contact
                          </Typography>
                        </Divider>
                      </Grid>

                      <Grid container spacing={1}>
                        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
                          <Controller
                            name="pocFullName"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: 'Full Name is required',
                              minLength: { value: 3, message: 'Minimum 3 characters required' },
                            }}
                            render={({ field, fieldState }) => (
                              <>
                                <InputWithLabel
                                  {...field}
                                  required
                                  label="Full Name"
                                  placeholder="Enter Full Name"
                                  onFocus={() => setFocusedField('pocFullName')}
                                  size="small"
                                />
                                {fieldState?.error?.message && (
                                  <Typography variant="caption" color="red">
                                    {fieldState.error.message}
                                  </Typography>
                                )}
                              </>
                            )}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
                          <Controller
                            name="pocEmail"
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
                              <>
                                <InputWithLabel
                                  {...field}
                                  required
                                  label="Email"
                                  placeholder="Enter Email"
                                  onFocus={() => setFocusedField('pocEmail')}
                                  size="small"
                                />
                                {fieldState?.error?.message && (
                                  <Typography variant="caption" color="red">
                                    {fieldState.error.message}
                                  </Typography>
                                )}
                              </>
                            )}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
                          <Controller
                            name="pocContactNo"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: 'Contact number is required',
                              minLength: { value: 10, message: 'Minimum 10 characters required' },
                              maxLength: { value: 10, message: 'Maximum 10 characters allowed' },
                              pattern: {
                                value: /^[0-9]+$/,
                                message: 'Enter a valid number',
                              },
                            }}
                            render={({ field, fieldState }) => (
                              <>
                                <InputWithLabel
                                  {...field}
                                  required
                                  label="Contact Number"
                                  placeholder="Enter Contact Number"
                                  onFocus={() => setFocusedField('pocContactNo')}
                                  size="small"
                                />
                                {fieldState?.error?.message && (
                                  <Typography variant="caption" color="red">
                                    {fieldState.error.message}
                                  </Typography>
                                )}
                              </>
                            )}
                          />
                        </Grid>
                      </Grid>
                    </section>
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                mt={5}
                ml={5}
                mr={5}
                sx={{
                  background: '#F5FAFD',
                  height: '70px',
                  borderRadius: '8px',
                  marginTop: { sx: 5, md: 2, sm: 3, lg: 0 },
                }}
              >
                <CustomButton variant="contained" icon="left" onClick={() => router.back()}>
                  Back
                </CustomButton>
                <CustomButton type="submit" variant="contained" icon="save">
                  {isLoading ? 'Saving..' : 'Save'}
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
};

export default PlantRegistrationForm;
