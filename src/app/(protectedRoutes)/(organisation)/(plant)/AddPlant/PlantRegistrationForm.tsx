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

const stepLabels = plantFormInputs.map((input) => ({ label: input.label }));

const PlantRegistrationForm = () => {
  return (
    <>
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
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 4 }} key={input.name}>
                <InputWithLabel
                  name={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  required={input.required}
                  type={input.type || 'text'}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box className={styles.aboutSection}>
        <InputWithLabel name="about" label="About Us" placeholder="Enter About Plant" multiline rows={4} type="text" />
      </Box>

      <Box className={styles.buttonSection}>
        <CustomButton children="Back" variant="contained" color="primary" icon="left" />
        <CustomButton children="Save" variant="contained" color="primary" icon="save" />
      </Box>
    </>
  );
};

export default PlantRegistrationForm;
