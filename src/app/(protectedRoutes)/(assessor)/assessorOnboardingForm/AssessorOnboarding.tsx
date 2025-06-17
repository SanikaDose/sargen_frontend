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
  useUploadQuestionnariesMutation,
  useUploadCostProfileMutation,
  useUploadKPIMutation,
  useUploadPlanningHorizonMutation,
  useUploadIndustrySelectionMutation,
  useUploadCostProfileLookupMutation,
  useUploadIndustrySelectionLookupMutation,
  useUploadKPILookupMutation,
  useUploadIndustryAssessmentMatrixMutation,
  useUploadSolutionMetadataMutation,
  useUploadBandDefinitionMutation,
} from './AssessorOnboarding.Api';

import { fileUploadKeyMap, fileTypes, fileValues, allowedExtensions } from './FormConfig/fileInput';
import ButtonWithLoader from '@/components/ButtonWithLoader/buttonWithLoader';
import { kMaxLength } from 'node:buffer';

const steps = [
  'First Name',
  'Last Name',
  'e-Mail Id',
  'Contact Number',
  'City',
  'Country',
  'year Of Experience',
  'Certification Year',
].map((label) => ({ label }));
const tenantId = getValueLocalStorage('tenantId');

function AssessorOnboarding() {
  //const { control, handleSubmit, reset, setFocus } = useForm<AssessorFormType>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      city: '',
      country: '',
      yearOfExperience: '',
      certificationYear: '',
    },
  });
  const [uploadAssessorLogo] = useUploadAssessorLogoMutation();
  const [addAssessorInformation] = useAddAssessorInformationMutation();
  const [getMetadataFileTemplate] = useGetMetadataFileTemplateMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-avatar-profile.png?ignore');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const watchedValues = useWatch({ control });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  let tenantId = 'ASSESSOR-773a065d-1e31-4cf3-88f1-57e5d83675e8';

  //uploded data
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadKey, setCurrentUploadKey] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  //loading state is decreled
  // const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const [uploadQuestionnaries, isLoading] = useUploadQuestionnariesMutation();
  const [uploadCostProfile] = useUploadCostProfileMutation();
  const [uploadKPI] = useUploadKPIMutation();
  const [uploadPlanningHorizon] = useUploadPlanningHorizonMutation();
  const [uploadIndustrySelection] = useUploadIndustrySelectionMutation();
  const [uploadCostProfileLookup] = useUploadCostProfileLookupMutation();
  const [uploadIndustrySelectionLookup] = useUploadIndustrySelectionLookupMutation();
  const [uploadKPILookup] = useUploadKPILookupMutation();
  const [uploadIndustryAssessmentMatrix] = useUploadIndustryAssessmentMatrixMutation();
  const [uploadSolutionMetadata] = useUploadSolutionMetadataMutation();
  const [uploadBandDefinition] = useUploadBandDefinitionMutation();

  const handleUploadFile = async (file: File, fileKey: string) => {
    try {
      console.log('filekey', fileKey);

      if (fileKey === 'questionnaires') {
        try {
          await uploadQuestionnaries({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
      if (fileKey === 'costProfile') {
        try {
          await uploadCostProfile({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
      if (fileKey === 'kpi') {
        try {
          await uploadKPI({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
      if (fileKey === 'industrySelection') {
        try {
          await uploadIndustrySelection({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
      if (fileKey === 'planningHorizon') {
        try {
          await uploadPlanningHorizon({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
      if (fileKey === 'costProfileLookUpTable') {
        try {
          await uploadCostProfileLookup({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
      if (fileKey === 'industrySelectionLookUpTable') {
        try {
          await uploadIndustrySelectionLookup({
            tenantId,
            file,
          });

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          console.log('❌ Failed to upload file:', error);
        }
      }

      if (fileKey === 'kpiSelectionLookUpTable') {
        try {
          await uploadKPILookup({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
      if (fileKey === 'industryAssessmentMatrix') {
        try {
          await uploadIndustryAssessmentMatrix({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
      if (fileKey === 'solutionMetadataTable') {
        try {
          await uploadSolutionMetadata({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
      if (fileKey === 'bandDefinitionTable') {
        try {
          await uploadBandDefinition({
            tenantId,
            file,
          }).unwrap();

          setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: file,
          }));
        } catch (error) {
          //tosterr
          console.log('❌ Failed to upload file:', error);
        }
      }
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
                <Grid container spacing={1} className={styles.FormContainer}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{
                        required: 'First Name is required',
                        pattern: {
                          value: /^[A-Za-z ]+$/, // Only letters and spaces
                          message: 'Only letters allowed ',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputWithLabel
                          label="First Name"
                          placeholder="Enter First Name"
                          type="text"
                          {...field}
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          onFocus={() => setFocusedField('firstName')}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{
                        required: 'Last Name is required',
                        pattern: {
                          value: /^[A-Za-z ]+$/, // Only letters and spaces
                          message: 'Only letters allowed (no special characters)',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputWithLabel
                          label="Last Name"
                          placeholder="Enter Last Name"
                          type="text"
                          {...field}
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          onFocus={() => setFocusedField('lastName')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
                          message: 'Enter a valid email address',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputWithLabel
                          type="email"
                          label="e-Mail Id"
                          placeholder="Enter Email"
                          {...field}
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          onFocus={() => setFocusedField('email')}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="contactNumber"
                      control={control}
                      rules={{
                        required: 'Contact number is required',
                        pattern: {
                          value: /^[0-9]$/,
                          message: 'Enter a valid number',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputWithLabel
                          //type="text"
                          label="Contact Number"
                          placeholder="Enter Contact Number"
                          {...field}
                          required
                          inputProps={{ maxLength: 10 }}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          onFocus={() => setFocusedField('contactNumber')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="city"
                      control={control}
                      rules={{
                        required: 'City is required',
                        pattern: {
                          value: /^[A-Za-z ]+$/,
                          message: 'Only letters allowed',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputWithLabel
                          label="City"
                          placeholder="Enter City"
                          type="text"
                          {...field}
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          onFocus={() => setFocusedField('city')}
                        />
                      )}
                    />
                  </Grid>

                  {/* <Grid size={{ xs: 12, md: 3 }}>
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
                            sx={{ height: '36px', color: '#888', width: '100%', borderRadius: '15px' }}
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
                  </Grid> */}

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px', mt: 2 }}>
                      Country
                    </Typography>
                    <FormControl fullWidth error={!!errors.country}>
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
                            sx={{ height: '36px', color: '#888', width: '100%', borderRadius: '15px' }}
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
                      {errors.country && <Typography color="error">{errors.country.message}</Typography>}
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="yearOfExperience"
                      control={control}
                      rules={{
                        required: 'Year of experience is required',
                        pattern: {
                          value: /^\d+$/,
                          message: 'Only digits allowed',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputWithLabel
                          //type="text"
                          label="Year Of Experience"
                          placeholder="Enter Year"
                          {...field}
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          onFocus={() => setFocusedField('yearOfExperience')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                      name="certificationYear"
                      control={control}
                      rules={{
                        required: 'Certification year is required',
                        pattern: {
                          value: /^\d{4}$/,
                          message: 'Enter a valid 4-digit year',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputWithLabel
                          //  type="text"
                          label="Certification Year"
                          placeholder="Enter Certification Year"
                          {...field}
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
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
                <CustomButton
                  children={'Save'}
                  variant="contained"
                  color="primary"
                  icon="save"
                  type="submit"
                  width="300px"
                  className={styles.saveBtn}
                />
              </Box>
            </Grid>
            {/* sx={{ width: '100%', overflowX: 'auto' }} */}
            <Box className={styles.tableContainer}>
              <TableContainer
                component={Paper}
                sx={{
                  maxHeight: 400,
                  // overflowX: 'auto',

                  overflowX: 'auto',
                  //  maxWidth: '100%',
                }}
              >
                {/* stickyHeader size="small" */}
                <Table sx={{ minWidth: 100 }}>
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
                          <TableCell
                            sx={{
                              textAlign: 'center',

                              padding: 1,
                            }}
                          >
                            <FileActionButton
                              icon="download"
                              label="Download"
                              width="50px"
                              // showLabel={false}
                              showIcon
                              onClick={() => handleDownloadClick(backendKey)}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: 'center',
                              padding: 1,
                            }}
                          >
                            {/* {loadingKey === backendKey ? (
                              <ButtonWithLoader label="" loading={true} />
                            ) : ( */}
                            <FileActionButton
                              icon="upload"
                              label="Upload"
                              width="50px"
                              //  showLabel={false}
                              showIcon
                              color={backendKey in uploadedFiles ? 'green' : '#1976d2'}
                              onClick={() => {
                                setCurrentUploadKey(backendKey);

                                fileInputRef.current?.click();
                              }}
                            />
                            {/* )} */}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: 1 }}>
                            <span
                              style={{
                                pointerEvents: uploadedFiles[backendKey] ? 'auto' : 'none',
                                opacity: uploadedFiles[backendKey] ? 1 : 0.5,
                              }}
                            >
                              <FileActionButton icon="view" label="View" width="50px" showIcon showLabel={false} />
                            </span>
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
