'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, FormControl, MenuItem, Paper, Select, Typography, Divider } from '@mui/material';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { plantFormInputs } from './FormConfig/FormInputStep';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './EditPlant.module.css';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { PlantFormType } from './EditPlant.types';
import { useEditPlantInfoMutation, useGetPlantByIdQuery, useUploadPlantLogoMutation } from './EditPlantApis';
import { useParams, useRouter } from 'next/navigation';
import { currencyOptions } from '@/app/utils/CurrencyOptions';
import InfoBox from '@/components/InfoBox/InfoBox';
import Loader from '@/components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import CurrencyValueSelector from '@/components/CurrencyDropDown/CurrencyDropDown';
const steps = [
  'Name',
  'Location',
  'Reg No.',
  'GSTIN',
  'Type',
  'Age',
  'Currency',
  'Revenue',
  'Revenue Unit',
  'Employees',
  'Lines',
  'Assessment',
  'Debrief',
  'About',
].map((label) => ({ label }));

const EditPlantRegistrationForm = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  dispatch(setPageNameHeader(pagesNames.plantEditOnboarding));

  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;
  console.log('organisationId', organisationId);
  console.log('plant id', plantId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlantFormType>();
  const [editPlantInfo, { isLoading }] = useEditPlantInfoMutation();
  const [uploadPlantLogo] = useUploadPlantLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/plant-logo.png?ignore');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { data: getPlantData, isLoading: isFetching } = useGetPlantByIdQuery({
    tenantId: organisationId,
    plantId: plantId,
  });

  useEffect(() => {
    if (getPlantData?.data) {
      const plant = getPlantData.data;
      const fullRevenue = Number(plant.revenue || 0);
      const revenueUnitMap = [
        //{ label: 'Arab', value: 1_00_00_00_000 },
        { label: 'Crore', value: 1_00_00_000 },
        { label: 'Lakh', value: 1_00_000 },
        { label: 'Thousand', value: 1_000 },
        { label: 'Unit', value: 1 },
      ];

      let selectedUnit = revenueUnitMap[revenueUnitMap.length - 1];
      let normalizedRevenue = fullRevenue;

      for (const unit of revenueUnitMap) {
        const divided = fullRevenue / unit.value;
        if (divided >= 1) {
          selectedUnit = unit;

          const hasDecimal = divided % 1 !== 0;
          normalizedRevenue = hasDecimal ? parseFloat(divided.toFixed(2)) : divided;

          break;
        }
      }
      const revenueUnitValue = plant.revenue && Number(plant.revenue) > 0 ? selectedUnit.value.toString() : '';

      reset({
        name: plant.name || '',
        location: plant.location || '',
        registrationNo: plant.registrationNo || '',
        gstin: plant.gstin || '',
        type: plant.type || '',
        revenue: normalizedRevenue.toString() || '',
        revenueUnit: revenueUnitValue,
        currencyType: plant.currencyType,
        age: plant.age?.toString() || '',
        numberOfEmployees: plant.numberOfEmployees?.toString() || '',
        numberOfLines: plant.numberOfLines?.toString() || '',
        assessmentStartDate: plant.assessmentStartDate || '',
        debriefDate: plant.debriefDate || '',
        about: plant.about || '',
        pocFullName: plant.pocFullName || '',
        pocEmail: plant.pocEmail || '',
        pocContactNo: plant.pocContactNo || '',
      });

      if (plant.plantLogo) {
        setLogoUrl(plant.plantLogo);
      }
    }
  }, [getPlantData, reset]);

  const watchedValues = useWatch({ control });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadPlantLogo({ tenantId: organisationId ?? '', plantId, formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const onSubmit = async (data: PlantFormType) => {
    try {
      await editPlantInfo({ tenantId: organisationId, plantId, body: data }).unwrap();

      router.push('/PlantOverview');
    } catch (error) {
      console.error('Failed to add plant info:', error);
    }
  };

  // this is an spread operator to get the values of the form inputs (mainly for about section)
  const allInputs = [...plantFormInputs, { name: 'about', label: 'About Us' }];

  // ✅ Compute activeStep based on focused field index
  const activeStep = useMemo(() => {
    const index = allInputs.findIndex((input) => input.name === focusedField);
    return index !== -1 ? index : 0;
  }, [focusedField]);

  // ✅ Compute completed steps where value length > 5
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
      {isLoading || isFetching ? (
        <Loader loading={true} />
      ) : (
        <Box sx={{ width: '100%', height: '99.5%' }}>
          <Box className={styles.stepperContainer}>
            <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
          </Box>

          <Paper elevation={2} sx={{ borderRadius: '16px' }} className={styles.paperContainer}>
            <form className={styles.mostOuterConatiner} onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box className={styles.formOuterContainer}>
                <Typography variant="h4" className={styles.heading}>
                  Plant Registration
                </Typography>

                <Box className={styles.formContainer}>
                  <Box className={styles.imageBox}>
                    <ImageUploader imageProp={logoUrl} onUpload={handleUpload} />
                  </Box>

                  {/* <Box className={styles.formFieldsBox}>
                    <section className={styles.formFieldsInner}>
                      <Grid container spacing={1}>
                        {plantFormInputs.map((input) => (
                          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }} key={input.name}>
                            <Controller
                              name={input.name as keyof PlantFormType}
                              control={control}
                              defaultValue=""
                              rules={input.rules}
                              render={({ field, fieldState }) => (
                                <>
                                  {input.isCurrency ? (
                                    <CurrencyValueSelector
                                      {...field}
                                      value={String(field.value ?? '')}
                                      label={input.label}
                                      placeholder={input.placeholder}
                                      options={currencyOptions.map(({ name }) => ({
                                        label: name,
                                        value: name,
                                      }))}
                                      required={true}
                                      onFocus={() => setFocusedField(input.name)}
                                      error={!!fieldState.error}
                                      helperText={fieldState.error?.message}
                                    />
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
                              label="About Us"
                              placeholder="Enter About Plant"
                              multiline
                              type="text"
                              onFocus={() => setFocusedField('about')}
                            />
                          )}
                        />
                      </Box>
                    </section>
                  </Box> */}
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
                sx={{ background: '#F5FAFD', height: '70px', borderRadius: '8px' }}
              >
                <CustomButton variant="contained" icon="left" onClick={() => router.back()}>
                  Back
                </CustomButton>
                <CustomButton type="submit" variant="contained" icon="save">
                  {isLoading ? 'Saving...' : 'Save'}
                </CustomButton>
              </Box>
            </form>

            <Box className={styles.rightSection}>
              <InfoBox />
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default EditPlantRegistrationForm;
