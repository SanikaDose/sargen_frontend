'use client';

import React from 'react';
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
import { useAddPlantInfoMutation } from './AddPlantApis';

const stepLabels = plantFormInputs.map((input) => ({ label: input.label }));

const tenantId = 'tanpure-corp-c8e1eeba-65d8-4351-837c-d1b5b5f45bbf';

const PlantRegistrationForm = () => {
  const { control, handleSubmit, reset } = useForm<PlantFormType>();
  const [addPlantInfo, { isLoading }] = useAddPlantInfoMutation();

  const onSubmit = async (data: PlantFormType) => {
    try {
      const {
        about, // Remove "about" if not needed in the backend
        ...body
      } = data;

      await addPlantInfo({ tenantId, body }).unwrap();
      reset(); // Optional: reset form after submission
    } catch (error) {
      console.error('Failed to add plant info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" className={styles.heading} mb={2}>
        Plant Registration
      </Typography>

      <Box className={styles.stepperContainer}>
        <Stepper steps={stepLabels} />
      </Box>

      <Box className={styles.formContainer}>
        <Box className={styles.imageBox}>
          <ImageUploader imageProp="/images/default-logo-image.png?ignore" />
        </Box>

        <Box className={styles.formFieldsBox}>
          <Grid container spacing={2}>
            {plantFormInputs.map((input) => (
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 3 }} key={input.name}>
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
              rows={4}
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
