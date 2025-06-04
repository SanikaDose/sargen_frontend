'use client';

import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { Box, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import defaultUserLogo from '../../../../../../public/images/default-logo-image.png';
import styles from './PointOfContact.module.css';
import { plantPointOfContactFormInputs } from './FormCongi/FormInputSteps';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { PlantPointOfContactType } from './PointOfContact.types';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { useEditPlantInfoMutation, useUploadPlantPointOfContactLogoMutation } from './PlantPointOfContactApi';
import { CountryOptions } from '@/app/utils/CountryOptions';

export default function PlantPointOfContact() {
  const { control, handleSubmit, reset, setFocus } = useForm<PlantPointOfContactType>();
  const [logoUrl, setLogoUrl] = useState<string>(defaultUserLogo.src);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const watchedValues = useWatch({ control });

  const tenantId = 'tanpure-corp-c8e1eeba-65d8-4351-837c-d1b5b5f45bbf';
  const plantId = '6ca0fa88-b57d-43d9-ba1a-629a174e3bfa';

  const [editPlantInfo, { isLoading }] = useEditPlantInfoMutation();
  const [uploadPlantPointOfContactLogo] = useUploadPlantPointOfContactLogoMutation();
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadPlantPointOfContactLogo({ tenantId, plantId, formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const onSubmit = async (data: PlantPointOfContactType) => {
    try {
      const payload = {
        tenantId,
        plantId,
        body: data,
      };
      await editPlantInfo(payload).unwrap();
      console.log('Plant point of contact updated successfully');
    } catch (error) {
      console.error('Failed to update plant point of contact:', error);
    }
  };

  const steps = [
    'First Name',
    'Last Name',
    'Email Mail',
    'Contact No.',
    'Designation',
    'Country',
    'Employee Id',
    'jobRole',
  ].map((label) => ({ label }));

  const allInputs = [
    ...plantPointOfContactFormInputs,
    { name: 'pocCountry', label: 'Country' },
    { name: 'pocEmployeeId', label: 'Employee Id' },
    { name: 'pocJobRole', label: 'Job Role' },
  ];

  // ✅ Compute activeStep based on focused field index
  const activeStep = useMemo(() => {
    const index = allInputs.findIndex((input) => input.name === focusedField);
    return index !== -1 ? index : 0;
  }, [focusedField]);

  // ✅ Compute completed steps where value length > 5
  const completedSteps = useMemo(() => {
    return allInputs.reduce((acc: number[], input, index) => {
      const value = watchedValues?.[input.name as keyof PlantPointOfContactType];
      if (typeof value === 'string' && value.length > 1) {
        acc.push(index);
      }
      return acc;
    }, []);
  }, [watchedValues]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.stepperContainer}>
          <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
        </Box>

        <Typography variant="h6" className={styles.heading}>
          Plant Point of Contact
        </Typography>
        <Box className={styles.formContainer}>
          <Box className={styles.imageBox}>
            <ImageUploader imageProp={logoUrl} onUpload={handleUpload} />
          </Box>

          <Box className={styles.formFieldsBox}>
            <Grid container spacing={1}>
              {plantPointOfContactFormInputs.map((input, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <Controller
                    name={input.name as keyof PlantPointOfContactType}
                    control={control}
                    defaultValue=""
                    rules={{ required: input.required }}
                    render={({ field }) => (
                      <InputWithLabel
                        {...field}
                        label={input.label}
                        name={input.name}
                        placeholder={input.placeholder}
                        required={input.required}
                        onFocus={() => setFocusedField(input.name)}
                      />
                    )}
                  />
                </Grid>
              ))}

              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Controller
                  name="pocCountry"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <Typography sx={{ fontWeight: 500, color: '#000000' }}>Country</Typography>
                      <Select
                        {...field}
                        displayEmpty
                        value={field.value || ''}
                        inputProps={{ 'aria-label': 'Select Country' }}
                        sx={{ borderRadius: '8px' }}
                        onFocus={() => setFocusedField('pocCountry')}
                      >
                        <MenuItem value="" sx={{ fontStyle: 'italic', color: 'gray' }}>
                          <em>Select Country</em>
                        </MenuItem>
                        {CountryOptions.map((country) => (
                          <MenuItem key={country.code} value={country.name}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>

            <Box>
              <Controller
                name="pocEmployeeId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputWithLabel
                    {...field}
                    label="Employee Id"
                    name="pocEmployeeId"
                    placeholder="Enter EmployeeId"
                    onFocus={() => setFocusedField('pocEmployeeId')}
                  />
                )}
              />
            </Box>
          </Box>
        </Box>
        <Box className={styles.aboutSection}>
          <Grid>
            <Controller
              name="pocJobRole"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputWithLabel
                  {...field}
                  label="Job Role"
                  name="pocJobRole"
                  placeholder="Specify Job Role"
                  multiline
                  rows={4}
                  onFocus={() => setFocusedField('jobRole')}
                />
              )}
            />
          </Grid>
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
    </div>
  );
}
