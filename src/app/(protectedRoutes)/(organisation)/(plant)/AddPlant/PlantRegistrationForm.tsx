'use client';

import { currencyOptions } from '@/app/utils/CurrencyOptions';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Stepper from '@/components/Stepper/Stepper';
import { Box, FormControl, MenuItem, Paper, Select, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import styles from './AddPlant.module.css';
import { PlantFormType } from './AddPlant.types';
import { useAddPlantInfoMutation, useUploadPlantLogoMutation } from './AddPlantApis';
import { plantFormInputs } from './FormConfig/formInputStep';
import InfoBox from '@/components/InfoBox/InfoBox';
import { triggerToast } from '@/app/utils/toast';
import Loader from '@/components/Loader/Loader';

const tenantId = getValueLocalStorage('tenantId');

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
  useEffect(() => {
    const draft = localStorage.getItem('plantFormDraft');
    if (draft) {
      reset(JSON.parse(draft)); // ✅ Prefill form
    }
  }, []);
  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<PlantFormType>();
  const [addPlantInfo, { isLoading }] = useAddPlantInfoMutation();
  const [uploadPlantLogo] = useUploadPlantLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-logo-image.png?ignore');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const watchedValues = useWatch({ control });

  const handleUpload = async (file: File) => {
    const localUrl = URL.createObjectURL(file);
    setLogoUrl(localUrl); // Only for preview

    //set the i image in state
    setSelectedFile(file);
  };

  // Define the expected response type for addPlantInfo
  type AddPlantInfoResponse = { id: string; [key: string]: any };

  //this is an function which will fill the form with the data from the API and then uload the image while getting the plantId from respomse
  const onSubmit = async (data: PlantFormType) => {
    try {
      const { about, ...body } = data;

      // Convert revenue to number if it's a string
      const bodyWithNumberRevenue = {
        ...body,
        revenue: body.revenue ? Number(body.revenue) : 0,
      };

      // 🔁 Step 1: Submit plant form
      const response = (await addPlantInfo({
        tenantId: tenantId ?? '',
        body: bodyWithNumberRevenue,
      }).unwrap()) as unknown as AddPlantInfoResponse;
      console.log('Response from addPlantInfo:', response);

      // ✅ Step 2: Extract `plantId` from response
      const newPlantId = response?.data.id;

      localStorage.setItem('plantFormDraft', JSON.stringify(data));
      if (selectedFile) {
        handleUpload(selectedFile);
      }
      // ✅ Step 3: Upload image only if user uploaded one
      if (logoUrl && !logoUrl.includes('default-logo-image')) {
        const blob = await fetch(logoUrl).then((res) => res.blob());
        const file = new File([blob], 'plant-logo.png', { type: blob.type });

        const formData = new FormData();
        formData.append('file', file);

        await uploadPlantLogo({ tenantId: tenantId ?? '', plantId: newPlantId, formData }).unwrap();
      }
      triggerToast('Plant Onboarded successfully!', 'success');

      // ✅ Step 4: Reset and redirect
      //reset();
      router.push('/PlantPointOfContact');
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
                <Typography variant="h6" className={styles.heading}>
                  Plant Registration
                </Typography>

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
                              rules={input.rules}
                              render={({ field, fieldState }) => (
                                <>
                                  {input.isCurrency ? (
                                    <FormControl fullWidth sx={{ mt: 1.9 }}>
                                      <Typography sx={{ fontWeight: 600, color: '#000000' }}>
                                        Currency Type
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
                                        onFocus={() => setFocusedField('currencyType')}
                                      >
                                        <MenuItem value="">
                                          <em>Select Currency</em>
                                        </MenuItem>
                                        {currencyOptions.map((currency) => (
                                          <MenuItem key={currency.code} value={currency.name}>
                                            {currency.name}
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
                              label="About Us"
                              placeholder="Enter About Plant"
                              // required={true}
                              multiline
                              type="text"
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
                mt={5}
                ml={5}
                mr={5}
                sx={{ background: '#F5FAFD', height: '70px', borderRadius: '8px' }}
              >
                <CustomButton variant="contained" icon="left" onClick={() => router.back()}>
                  Back
                </CustomButton>
                <CustomButton
                  type="submit"
                  variant="contained"
                  icon="save"
                  onClick={() => router.push('/PlantPointOfContact')}
                >
                  {isLoading ? 'Next..' : 'Next'}
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
