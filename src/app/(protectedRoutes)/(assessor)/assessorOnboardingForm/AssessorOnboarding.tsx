//import React from 'react'
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  OutlinedInput,
} from '@mui/material';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './AssessorOnboarding.module.css';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { AssessorFormType } from './AssessorOnboarding.types';

import { AssessorFormInputs } from './FormConfig/formInputStep';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useRouter } from 'next/navigation';
import FileUploadButton from '@/components/FileUploadButton/FileuploadButton';
import { certificateData } from './FormConfig/fileInput';
import FileActionButton from '@/components/FileActionButton/FileActionButton';
import { CountryOptions } from '@/app/utils/CountryOptions';
import {
  useAddAssessorInformationMutation,
  useUploadAssessorLogoMutation,
  useGetMetadataFileTemplateMutation,
  useUploadAllMetadataFilesMutation,
} from './AssessorOnboarding.Api';

import { fileUploadKeyMap, fileTypes, fileValues, allowedExtensions } from './FormConfig/fileInput';
import ButtonWithLoader from '@/components/ButtonWithLoader/buttonWithLoader';
import Loader from '@/components/Loader/Loader';
const tenantId = getValueLocalStorage('tenantId');
// const [fileUploadLoader, setFileUploadLoader] = useState(false);
const steps = [
  'FirstName',
  'LastName',
  'e-Mail ID',
  'ContactNumber',
  'City',
  'Country',
  'yearOfExperience',
  'certificationYear',
].map((label) => ({ label }));

function AssessorOnboarding() {
  const { control, handleSubmit, reset, setFocus } = useForm<AssessorFormType>();
  //const [addPlantInfo, { isLoading }] = useAddPlantInfoMutation();
  const [uploadAssessorLogo] = useUploadAssessorLogoMutation();
  const [addAssessorInformation] = useAddAssessorInformationMutation();
  const [getMetadataFileTemplate] = useGetMetadataFileTemplateMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-avatar-profile.png?ignore');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const watchedValues = useWatch({ control });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  let tenantId = 'ASSESSOR-773a065d-1e31-4cf3-88f1-57e5d83675e8';

  //uploded data
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadKey, setCurrentUploadKey] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  // const [isFinalUpload, setIsFinalUpload] = useState(false);
  const [uploadAllMetadataFiles] = useUploadAllMetadataFilesMutation();

  const handleUploadFile = async (file: File, fileKey: string) => {
    try {
      setUploadedFiles((prev) => {
        const updated = { ...prev, [fileKey]: file };
        console.log('📦 Updated uploadedFiles:', updated);

        // All required keys
        const uploadedKeys = Object.keys(updated);

        const allUploaded = fileValues.every((key) => uploadedKeys.includes(key));

        if (allUploaded) {
          // ✅ Trigger API only if ALL required files are uploaded
          uploadAllMetadataFiles({
            tenantId,
            files: updated,
          })
            .unwrap()
            .then((res) => {
              console.log('✅ All files uploaded successfully:', res);
            })
            .catch((err) => {
              console.error('❌ Upload failed:', err);
            });
        } else {
          console.log('🕐 Waiting for all files to be uploaded...');
        }

        return updated;
      });

      console.log(`📁 File stored for ${fileKey}`);
    } catch (error) {
      console.error(`❌ Error storing file for ${fileKey}:`, error);
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadAssessorLogo({ tenantId: tenantId ?? '', formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const onSubmit = async (formValues: AssessorFormType) => {
    try {
      const formData = new FormData();

      formData.append('data', JSON.stringify(formValues));
      if (selectedFile) {
        formData.append('siriCertificate', selectedFile); // ✅ actual file object
      }
      await addAssessorInformation({
        tenantId: tenantId ?? '',
        data: formValues, // not used in request directly, just for clarity
        siriCertificate: selectedFile,
      }).unwrap();

      console.log('✅ Assessor information submitted successfully!');
      // router.push('/some-path'); // Optional redirect
    } catch (error) {
      console.error('❌ Failed to submit assessor information:', error);
    }
  };

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

  const handleDownloadClick = async (fileName: string) => {
    // if (!fileName) {
    //   showToast("Invalid file name.", "warning");
    //   return;
    // }

    try {
      const response = await getMetadataFileTemplate({
        userType: 'ASSESSOR',
        fileName,
      }).unwrap();

      const blob = await response.blob();
      const suggestedFileName = `${fileName}.xlsx`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', suggestedFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      console.log('downloaded sucessfully', url);
    } catch (err) {
      console.error('Error downloading file:', err);
      //showToast("Failed to download file", "error");
    }
  };

  return (
    <>
      <form className={styles.mostOuterConatiner} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.stepperContainer}>
          <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
        </Box>

        <Typography variant="h6" className={styles.heading}>
          Assessor Profile
        </Typography>

        <Box className={styles.form}>
          <Box className={styles.formContainer}>
            <Box className={styles.imageBox}>
              <ImageUploader imageProp={logoUrl} onUpload={handleUpload} />
            </Box>

            <Box className={styles.formFieldsBox}>
              <section className={styles.formFieldsInner}>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, md: 3 }}>
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

                  <Grid size={{ xs: 12, md: 3 }}>
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
                  <Grid size={{ xs: 12, md: 3 }}>
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

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <InputWithLabel
                          label="City"
                          placeholder="Enter City"
                          {...field}
                          required={true}
                          onFocus={() => setFocusedField('city')}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px', mt: 2 }}>
                      Country
                    </Typography>
                    <FormControl fullWidth>
                      <Controller
                        name="country"
                        control={control}
                        rules={{ required: 'Country is required' }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            displayEmpty
                            input={<OutlinedInput />}
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value)}
                            onFocus={() => setFocusedField('country')}
                            sx={{ height: '36px', color: '#888', width: '100%' }}
                            renderValue={(selected) =>
                              !selected ? <em style={{ color: '#888' }}>Select From Dropdown</em> : selected
                            }
                          >
                            <MenuItem disabled value="">
                              <em>Select From Dropdown</em>
                            </MenuItem>
                            {CountryOptions.map((country) => (
                              <MenuItem key={country.code} value={country.name}>
                                {country.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="yearOfExperience"
                      control={control}
                      render={({ field }) => (
                        <InputWithLabel
                          label="Year Of Experience"
                          placeholder="Enter Total Year Of Experience"
                          {...field}
                          required={true}
                          onFocus={() => setFocusedField('yearOfExperience')}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="certificationYear"
                      control={control}
                      render={({ field }) => (
                        <InputWithLabel
                          label="Certification Year"
                          placeholder="Enter Certification Year"
                          {...field}
                          //    required={true}
                          onFocus={() => setFocusedField('certificationYear')}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </section>
            </Box>
          </Box>

          <Box className={styles.secondContainer}>
            <Grid className={styles.btnContainer}>
              <Box className={styles.fileUploadContainer}>
                <FileUploadButton
                  label="Certificate"
                  size="large"
                  iconSize="100"
                  onFileSelect={(file) => {
                    console.log('Selected file:', file);
                    setSelectedFile(file);
                  }}
                />
              </Box>

              <Box className={styles.buttonSection}>
                {/* icon="cancel" */}
                <CustomButton children="Cancel" variant="contained" color="primary" type="button" />
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
            </Grid>
            <Box className={styles.tableContainer}>
              <TableContainer
                component={Paper}
                sx={{
                  maxHeight: 420,
                  overflowX: 'auto',
                  // boxShadow: 'none',
                }}
              >
                <Table stickyHeader size="small" sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ padding: 0, textAlign: 'center' }}>
                      <TableCell sx={{ padding: 1, textAlign: 'center' }}>No.</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: 'center' }}>File Name</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: 'center' }}>Version</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: 'center' }}>First Uploaded</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: 'center' }}>Last Uploaded </TableCell>
                      {/* <TableCell sx={{padding:1, textAlign:'center'}}></TableCell> */}
                      <TableCell sx={{ padding: 1, textAlign: 'center' }}>Download</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: 'center' }}>Upload</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: 'center' }}>View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fileTypes.map((label, index) => {
                      const backendKey = fileUploadKeyMap[label];
                      const cert = certificateData[index]; // safely pull from data if exists

                      return (
                        <TableRow key={index}>
                          <TableCell sx={{ textAlign: 'center', padding: 0 }}>{index + 1}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: 0 }}>{label}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: 0 }}>{cert?.version ?? '-'}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: 0 }}>{cert?.createdAt ?? '-'}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: 0 }}>{cert?.updatedAt ?? '-'}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: 1 }}>
                            <FileActionButton
                              icon="download"
                              label="Download"
                              width="50px"
                              showLabel={false}
                              showIcon
                              onClick={() => handleDownloadClick(backendKey)}
                            />
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: 1 }}>
                            <FileActionButton
                              icon="upload"
                              label="Upload"
                              showLabel={false}
                              width="50px"
                              showIcon
                              onClick={() => {
                                setCurrentUploadKey(backendKey);

                                fileInputRef.current?.click();
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: 1 }}>
                            <FileActionButton icon="view" label="View" width="50px" showLabel={false} showIcon />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,.jpg,.png,.xlsx"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file && currentUploadKey) {
                        handleUploadFile(file, currentUploadKey);
                      }

                      // Reset
                      //  setIsFinalUpload(false);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  />
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default AssessorOnboarding;
