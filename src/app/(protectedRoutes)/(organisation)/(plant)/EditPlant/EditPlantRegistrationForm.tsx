'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { plantFormInputs } from './FormConfig/FormInputStep';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './EditPlant.module.css';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { PlantFormType } from './EditPlant.types';
import { useEditPlantInfoMutation, useGetPlantByIdQuery, useUploadPlantLogoMutation } from './EditPlantApis';
import { useParams } from 'next/navigation';
import { currencyOptions } from '@/app/utils/CurrencyOptions';

const steps = [
  'Name',
  'Location',
  'Reg No.',
  'GSTIN',
  'Type',
  'Age',
  'Revenue',
  'Currency',
  'Employees',
  'Lines',
  'Assessment',
  'Debrief',
  'About',
].map((label) => ({ label }));

const EditPlantRegistrationForm = () => {
  // const params = useParams();

  const params = useParams();

  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;

  const {
    register,
    reset,
    trigger,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlantFormType>();

  const [editPlantInfo, { isLoading }] = useEditPlantInfoMutation();
  const [uploadPlantLogo] = useUploadPlantLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-logo-image.png?ignore');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { data: getPlantData, isLoading: isFetching } = useGetPlantByIdQuery({
    tenantId: organisationId,
    plantId: plantId,
  });

  useEffect(() => {
    if (getPlantData?.data) {
      const plant = getPlantData.data;

      reset({
        name: plant.name || '',
        location: plant.location || '',
        registrationNo: plant.registrationNo || '',
        gstin: plant.gstin || '',
        type: plant.type || '',
        revenue: plant.revenue || '',
        currencyType: plant.currencyType,
        age: plant.age?.toString() || '',
        numberOfEmployees: plant.numberOfEmployees?.toString() || '',
        numberOfLines: plant.numberOfLines?.toString() || '',
        assessmentStartDate: plant.assessmentStartDate || '',
        debriefDate: plant.debriefDate || '',
        about: plant.about || '', // if you have an 'about' field, adjust accordingly
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
      // await uploadPlantLogo({ organisationId, plantId, formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const onSubmit = async (data: PlantFormType) => {
    try {
      const { about, ...body } = data;
      await editPlantInfo({ tenantId: organisationId, plantId, body: data }).unwrap();
      reset();
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
      if (typeof value === 'string' && value.length > 1) {
        acc.push(index);
      }
      return acc;
    }, []);
  }, [watchedValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.stepperContainer}>
        <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
      </Box>

      <Typography variant="h6" className={styles.heading}>
        Edit Plant
      </Typography>

      <Box className={styles.formContainer}>
        <Box className={styles.imageBox}>
          <ImageUploader imageProp={logoUrl} onUpload={handleUpload} />
        </Box>

        <Box className={styles.formFieldsBox}>
          <Grid container spacing={1}>
            {plantFormInputs.map((input) => (
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }} key={input.name}>
                <Controller
                  name={input.name as keyof PlantFormType}
                  control={control}
                  defaultValue=""
                  rules={{ required: input.required }}
                  render={({ field }) =>
                    input.isCurrency ? (
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <Typography sx={{ fontWeight: 500, color: '#000000' }}>Currency Type</Typography>
                        <Select
                          {...field}
                          displayEmpty
                          value={field.value || ''}
                          inputProps={{ 'aria-label': 'Select Currency' }}
                          sx={{ borderRadius: '8px' }}
                          onFocus={() => setFocusedField('currencyType')}
                        >
                          <MenuItem value="" sx={{ fontStyle: 'italic', color: 'gray' }}>
                            <em>Select Currency</em>
                          </MenuItem>
                          {currencyOptions.map((currency) => (
                            <MenuItem key={currency.code} value={currency.name}>
                              {currency.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <InputWithLabel
                        {...field}
                        label={input.label}
                        placeholder={input.placeholder}
                        required={input.required}
                        type={input.type || 'text'}
                        onFocus={() => setFocusedField(input.name)}
                      />
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

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
              rows={3}
              type="text"
              onFocus={() => setFocusedField('about')}
              // defaultValue={getPlantData.about}
            />
          )}
        />
      </Box>

      <Box className={styles.buttonSection}>
        <CustomButton children="Back" variant="contained" color="primary" icon="left" type="button" />
        <CustomButton
          children={isLoading ? 'Saving...' : 'Save'}
          variant="contained"
          color="primary"
          icon="save"
          type="submit"
        />
      </Box>
    </form>
  );
};

export default EditPlantRegistrationForm;
