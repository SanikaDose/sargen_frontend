//import React from 'react'
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './AssessorOnboarding.module.css';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { AssessorFormType } from './AssessorOnboarding.types';
//import { useAddPlantInfoMutation, useUploadPlantLogoMutation } from './AddPlantApis';
import { AssessorFormInputs } from './FormConfig/formInputStep';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useRouter } from 'next/navigation';
import FileUploadButton from '@/components/FileUploadButton/FileuploadButton';
import { certificateData } from './FormConfig/fileInput';
import FileActionButton from '@/components/FileActionButton/FileActionButton';
const tenantId = getValueLocalStorage('tenantId');

// const plantId = '8c28e6c8-8b17-4edc-b4f2-6e2a5585b1ea';

const steps = [
  'firstName',
  'lastName',
  'email',
  'location',
  'contactNumber',
  'yearOfExperience',
  'certificationYear',
].map((label) => ({ label }));
function AssessorOnboarding() {
  const { control, handleSubmit, reset, setFocus } = useForm<AssessorFormType>();
  //const [addPlantInfo, { isLoading }] = useAddPlantInfoMutation();
  //const [uploadPlantLogo] = useUploadPlantLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-logo-image.png?ignore');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const watchedValues = useWatch({ control });

  //   const handleUpload = async (file: File) => {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     try {
  //       await uploadPlantLogo({ tenantId: tenantId ?? '', plantId, formData }).unwrap();
  //       const localUrl = URL.createObjectURL(file);
  //       setLogoUrl(localUrl);
  //     } catch (error) {
  //       console.error('Image upload failed:', error);
  //     }
  //   };

  //   const onSubmit = async (data: PlantFormType) => {
  //     try {
  //       const { about, ...body } = data;
  //       await addPlantInfo({ tenantId: tenantId ?? '', body: data }).unwrap();
  //       reset();
  //     } catch (error) {
  //       console.error('Failed to add plant info:', error);
  //     }
  //   };

  // this is an spread operator to get the values of the form inputs (mainly for about section)
  const allInputs = [...AssessorFormInputs];

  // ✅ Compute activeStep based on focused field index
  const activeStep = useMemo(() => {
    const index = allInputs.findIndex((input) => input.name === focusedField);
    return index !== -1 ? index : 0;
  }, [focusedField]);

  // ✅ Compute completed steps where value length > 5
  const completedSteps = useMemo(() => {
    return allInputs.reduce((acc: number[], input, index) => {
      const value = watchedValues?.[input.name as keyof AssessorFormType];
      if (typeof value === 'string' && value.length > 1) {
        acc.push(index);
      }
      return acc;
    }, []);
  }, [watchedValues]);

  return (
    //onSubmit={handleSubmit(onSubmit)}
    <form className={styles.mostOuterConatiner}>
      <Box className={styles.stepperContainer}>
        <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
      </Box>

      <Typography variant="h6" className={styles.heading}>
       Assessor Profile
      </Typography>

      <Box className={styles.form}>
        <Box className={styles.formContainer}>
          <Box className={styles.imageBox}>
            <ImageUploader imageProp={logoUrl} />
          </Box>

          <Box className={styles.formFieldsBox}>
            <section className={styles.formFieldsInner}>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        label="First Name"
                        placeholder="Enter First Name"
                        {...field}
                        required={true}
                        onFocus={() => setFocusedField('firstName')}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        label="Last Name"
                        placeholder="Enter Last Name"
                        {...field}
                        required={true}
                        onFocus={() => setFocusedField('lastName')}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        label="e-Mail ID"
                        placeholder="Enter Email ID"
                        {...field}
                        required={true}
                        onFocus={() => setFocusedField('email')}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        label="location (City,Country)"
                        placeholder="Enter location"
                        {...field}
                        required={true}
                        onFocus={() => setFocusedField('location')}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Controller
                    name="contactNumber"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        label="Contact Number"
                        placeholder="Enter Contact Number"
                        {...field}
                        required={true}
                        onFocus={() => setFocusedField('contactNumber')}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Controller
                    name="yearOfExperience"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        label="Total Experience"
                        placeholder="Enter Total Experience"
                        {...field}
                        required={true}
                        onFocus={() => setFocusedField('yearOfExperience')}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Controller
                    name="certificationYear"
                    control={control}
                    render={({ field }) => (
                      <InputWithLabel
                        label="Certification Year"
                        placeholder="Enter Certification Year"
                        {...field}
                        required={true}
                        onFocus={() => setFocusedField('certificationYear')}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </section>
          </Box>
        </Box>

        <Box className={styles.secondContainer} sx={{}}>
          <Box className={styles.btnContainer}>
            <Box className={styles.fileUploadContainer}>
              <FileUploadButton label="Certificate" size="large" iconSize="100" />
            </Box>
            <Box className={styles.buttonSection}>
              <CustomButton children="Cancel" variant="contained" color="primary" icon="cancel" type="button" />
              <CustomButton
                children={'Save'}
                variant="contained"
                color="primary"
                icon="save"
                type="submit"
                // onClick={() => {
                //   router.push('/PlantOverview');
                // }}
              />
            </Box>
          </Box>
          <Box className={styles.tableContainer}>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 420, // or any height you want
               
                // boxShadow: 'none',
                
              }}
            >
              <Table stickyHeader size="small" sx={{ minWidth: 600 }}>
                <TableHead>
                  <TableRow sx={{padding:0, textAlign:'center'}}>
                    <TableCell sx={{padding:1, textAlign:'center'}}>No.</TableCell>
                    <TableCell sx={{padding:1, textAlign:'center'}}>File Name</TableCell>
                    <TableCell sx={{padding:1, textAlign:'center'}}>Version</TableCell>
                    <TableCell sx={{padding:1, textAlign:'center'}}>Created at</TableCell>
                    <TableCell sx={{padding:1, textAlign:'center'}}>Updated at</TableCell>
                    <TableCell sx={{padding:1, textAlign:'center'}}></TableCell>
                    <TableCell sx={{padding:1, textAlign:'center'}}>Upload/Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {certificateData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    certificateData.map((row, index) => (
                      <TableRow key={row.id} sx={{textAlign:'center',padding:0}}>
                        <TableCell sx={{textAlign:'center',padding:0}} >{index + 1}</TableCell>
                        <TableCell sx={{textAlign:'center',padding:0}}>{row.fileName}</TableCell>
                        <TableCell sx={{textAlign:'center',padding:0}}>{row.version}</TableCell>
                        <TableCell sx={{textAlign:'center',padding:0}}>{row.createdAt}</TableCell>
                        <TableCell sx={{textAlign:'center',padding:0}}>{row.updatedAt}</TableCell>
                        <TableCell sx={{textAlign:'center',padding:0}}>{}</TableCell>
                        <TableCell sx={{display:'flex',justifyContent:'center', alignItems:'center', gap:1 }}>
                          <FileActionButton icon="download" label="Download" showLabel={true} showIcon={true}  />
                          <FileActionButton icon="upload" label="Upload" showLabel={true} showIcon={true} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default AssessorOnboarding;
