'use client';

import { currencyOptions } from '@/app/utils/CurrencyOptions';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Stepper from '@/components/Stepper/Stepper';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import styles from './AddPlant.module.css';
import { PlantFormType } from './AddPlant.types';
import { useAddPlantInfoMutation, useUploadPlantLogoMutation } from './AddPlantApis';
import { plantFormInputs } from './FormConfig/formInputStep';

const tenantId = getValueLocalStorage('tenantId');

const plantId = '8c28e6c8-8b17-4edc-b4f2-6e2a5585b1ea';

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

const PlantRegistrationForm = () => {
  const { control, handleSubmit, reset, setFocus } = useForm<PlantFormType>();
  const [addPlantInfo, { isLoading }] = useAddPlantInfoMutation();
  const [uploadPlantLogo] = useUploadPlantLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/plant-logo.png?ignore');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const watchedValues = useWatch({ control });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadPlantLogo({ tenantId: tenantId ?? '', plantId, formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const onSubmit = async (data: PlantFormType) => {
    try {
      const { about, ...body } = data;
      await addPlantInfo({ tenantId: tenantId ?? '', body: data }).unwrap();
      router.push('/PlantOverview');
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
      if (typeof value === 'string' && value.length >= 1) {
        acc.push(index);
      }
      return acc;
    }, []);
  }, [watchedValues]);

  return (
    <form className={styles.mostOuterConatiner} onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.stepperContainer}>
        <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
      </Box>

      <Typography variant="h6" className={styles.heading}>
        Plant Registration
      </Typography>
      <Box className={styles.form}>
        <Box className={styles.formContainer}>
          <Box className={styles.imageBox}>
            <ImageUploader imageProp={logoUrl} onUpload={handleUpload} />
          </Box>

          <Box className={styles.formFieldsBox}>
            <section className={styles.formFieldsInner}>
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
                          <FormControl fullWidth sx={{ mt: 1.9 }}>
                            <Typography sx={{ fontWeight: 600, color: '#000000' }}>Currency Type</Typography>
                            <Select
                              {...field}
                              displayEmpty
                              value={field.value || ''}
                              inputProps={{ 'aria-label': 'Select Currency' }}
                              sx={{ borderRadius: '16px', height: 36 }}
                              onFocus={() => setFocusedField('currencyType')}
                            >
                              <MenuItem value="">
                                {' '}
                                <span style={{ color: '#cdcdcd' }}>Select Currency</span>
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
            </section>
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
                label="About Plant"
                placeholder="Enter About Plant"
                multiline
                rows={3}
                type="text"
                onFocus={() => setFocusedField('about')}
              />
            )}
          />
        </Box>
      </Box>

      <Box
        // className={styles.buttonSection}
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
  );
};

export default PlantRegistrationForm;
