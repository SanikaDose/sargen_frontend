'use client';

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { plantFormInputs } from './FormConfig/formInputStep';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './AddPlant.module.css';
import { useForm, Controller } from 'react-hook-form';
import { PlantFormType } from './AddPlant.types';
import { useAddPlantInfoMutation, useUploadPlantLogoMutation } from './AddPlantApis';

const tenantId = 'tanpure-corp-c8e1eeba-65d8-4351-837c-d1b5b5f45bbf';
const plantId = '8c28e6c8-8b17-4edc-b4f2-6e2a5585b1ea';

const PlantRegistrationForm = () => {
  const { control, handleSubmit, reset } = useForm<PlantFormType>();
  const [addPlantInfo, { isLoading }] = useAddPlantInfoMutation();
  const [uploadPlantLogo] = useUploadPlantLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-logo-image.png?ignore');

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadPlantLogo({ tenantId, plantId, formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl); // update preview after successful upload
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const onSubmit = async (data: PlantFormType) => {
    try {
      const { about, ...body } = data;
      await addPlantInfo({ tenantId, body }).unwrap();
      reset();
    } catch (error) {
      console.error('Failed to add plant info:', error);
    }
  };

  const steps = [
    'Name',
    'Location',
    'Reg No.',
    'GSTIN',
    'Type',
    'Revenue',
    'Age',
    'Employees',
    'Lines',
    'Assessment',
    'Debrief',
    'About',
  ].map((label) => ({ label }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.stepperContainer}>
        <Stepper steps={steps} />
      </Box>
      <Typography variant="h6" className={styles.heading}>
        Plant Registration
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
                  render={({ field }) => (
                    <InputWithLabel
                      {...field}
                      label={input.label}
                      placeholder={input.placeholder}
                      required={input.required}
                      type={input.type || 'text'}
                    />
                  )}
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
              name="about"
              label="About Us"
              placeholder="Enter About Plant"
              multiline
              rows={3}
              type="text"
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

export default PlantRegistrationForm;
