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

import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useRouter } from 'next/navigation';
import FileUploadButton from '@/components/FileUploadButton/FileuploadButton';
import { certificateData, fileValues } from './FormConfig/fileInput';
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

import { fileUploadKeyMap, fileTypes } from './FormConfig/fileInput';
import { triggerToast } from '@/app/utils/toast';
import ButtonWithLoader from '@/components/ButtonWithLoader/buttonWithLoader';
import { AssessorFormInputs } from './FormConfig/formInputStep';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadKey, setCurrentUploadKey] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

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

  //function to upload files
  const handleUploadFile = async (file: File, fileKey: string) => {
    try {
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');

          setUploadedFiles((prev) => {
            const newState = { ...prev };
            delete newState[fileKey];
            return newState;
          });
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
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
          triggerToast(`Please Add valid ${fileKey} file`, 'error');
        }
      }
    } catch (error) {
      console.error(`❌ Error storing file for ${fileKey}:`, error);
    }
  };
  //function to handle the profileimage upload
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadAssessorLogo({ tenantId: tenantId ?? '', formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
    } catch (error) {
      triggerToast('Image upload failed', 'error');
    }
  };
  //function to submit the formdata
  const onSubmit = async (formValues: AssessorFormType) => {
    const allFilesUploaded = fileValues.every((key) => uploadedFiles[key]);
    if (!allFilesUploaded) {
      triggerToast('Please upload all required files before submitting.', 'error');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(formValues));
      if (selectedFile) {
        formData.append('siriCertificate', selectedFile);
      }
      await addAssessorInformation({
        tenantId: tenantId ?? '',
        data: formValues,
        siriCertificate: selectedFile,
      }).unwrap();
      triggerToast('✅ Assessor information submitted successfully!', 'success');
    } catch (error) {
      triggerToast('❌ Failed to submit assessor information:', 'error');
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
    if (!fileName) {
      triggerToast('Invalid file name.', 'warning');
      return;
    }

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
      triggerToast('Failed to download file', 'error');
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
                  {AssessorFormInputs.map((input) => (
                    <Grid size={{ xs: 12, md: 3 }} key={input.name}>
                      <Controller
                        name={input.name as keyof AssessorFormType}
                        control={control}
                        defaultValue=""
                        rules={input.rules}
                        render={({ field, fieldState }) => (
                          <>
                            {input.iscountry ? (
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
                                  {CountryOptions.map((country) => (
                                    <MenuItem key={country.code} value={country.name}>
                                      {country.name}
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
                                  error={!!fieldState.error}
                                  helperText={fieldState.error?.message}
                                />
                                {/* {fieldState?.error?.message && (
                                  <Typography variant="caption" color="error">
                                    {fieldState.error.message}
                                  </Typography>
                                )} */}
                              </>
                            )}
                          </>
                        )}
                      />
                    </Grid>
                  ))}
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

            <Box className={styles.tableContainer} sx={{ overflowX: 'auto' }}>
              <TableContainer
                component={Paper}
                sx={{
                  maxHeight: 400,
                  //overflowX: 'auto',
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
                      <TableCell sx={{ padding: 1, textAlign: 'center' }}>Download Template</TableCell>
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
                            {/* {isLoading ? (
                              <ButtonWithLoader label="" loading={true} />
                            ) : (  */}
                            <FileActionButton
                              icon="upload"
                              label="Upload"
                              width="50px"
                              showIcon
                              color={uploadedFiles[backendKey] ? 'green' : '#1976d2'}
                              onClick={() => {
                                setCurrentUploadKey(backendKey);

                                fileInputRef.current?.click();
                              }}
                            />
                            {/* )}  */}
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
                    accept=".csv, .xls, .xlsx"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file && currentUploadKey) {
                        handleUploadFile(file, currentUploadKey);
                      }
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
