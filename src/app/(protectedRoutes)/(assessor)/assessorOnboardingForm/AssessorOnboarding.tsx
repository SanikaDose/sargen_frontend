//import React from 'react'
'use client';

import { CountryOptions } from '@/app/utils/CountryOptions';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import FileActionButton from '@/components/FileActionButton/FileActionButton';
import FileUploadButton from '@/components/FileUploadButton/FileuploadButton';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import Stepper from '@/components/Stepper/Stepper';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  useAddAssessorInformationMutation,
  useGetAssessorInfoQuery,
  useGetMetadataFileTemplateMutation,
  useLazyGetOnboardingStatusQuery,
  useUploadAssessorLogoMutation,
  useUploadBandDefinitionMutation,
  useUploadCostProfileLookupMutation,
  useUploadCostProfileMutation,
  useUploadIndustryAssessmentMatrixMutation,
  useUploadIndustrySelectionLookupMutation,
  useUploadIndustrySelectionMutation,
  useUploadKPILookupMutation,
  useUploadKPIMutation,
  useUploadPlanningHorizonMutation,
  useUploadQuestionnariesMutation,
  useUploadSolutionMetadataMutation,
  useViewMetadataFileMutation,
} from './AssessorOnboarding.Api';
import styles from './AssessorOnboarding.module.css';
import { AssessorFormType, UploadFileMetadata, UploadFunction } from './AssessorOnboarding.types';

import { setOnboardingStatus } from '@/app/(unprotectedRoutes)/login/loginSlice';
import { triggerToast } from '@/app/utils/toast';
import ButtonWithLoader from '@/components/ButtonWithLoader/buttonWithLoader';
import CurrencyValueSelector from '@/components/CurrencyDropDown/CurrencyDropDown';
import Loader from '@/components/Loader/Loader';
import { setPageNameHeader } from '@/store/globalSlice';
import { useDispatch } from 'react-redux';
import { fileTypes, fileUploadKeyMap, fileValues } from './FormConfig/fileInput';
import { AssessorFormInputs } from './FormConfig/formInputStep';

const steps = ['Form Data', ...fileValues.map((key, i) => `File ${i + 1}`)].map((label) => ({ label }));

// const steps = ['First Name', 'Last Name', 'E-Mail Id', 'Contact Number', 'City', 'Country', 'Year Of Experience', 'Certification Year'].map(
//   (label) => ({ label }),
// );

function AssessorOnboarding() {
  const tenantId = getValueLocalStorage('tenantId');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNameHeader('Assessor Onboarding'));
  }, [dispatch]);
  const { control, handleSubmit, reset } = useForm({
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
    mode: 'onSubmit',
  });
  const router = useRouter();
  const [uploadAssessorLogo] = useUploadAssessorLogoMutation();
  const [addAssessorInformation, { isLoading }] = useAddAssessorInformationMutation();
  const [getMetadataFileTemplate] = useGetMetadataFileTemplateMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-avatar-profile.png?ignore');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const watchedValues = useWatch({ control });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadKey, setCurrentUploadKey] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadFileMetadata>>({});
  const [uploadQuestionnaries] = useUploadQuestionnariesMutation();
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
  const [viewMetadataFile] = useViewMetadataFileMutation();
  const [getOnboardingStatus] = useLazyGetOnboardingStatusQuery();

  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [downloadKey, setdownloadKey] = useState<string | null>(null);

  const [Status, setStatus] = useState<string | null>(null);
  const { data: existingData } = useGetAssessorInfoQuery(tenantId ?? '');
  console.log('existing dataa', existingData);

  //reload view

  useEffect(() => {
    const populateFormAndFile = async () => {
      try {
        const assessorData = existingData?.data[0];
        const formData = assessorData?.formData;
        const metadata_information = assessorData?.metadata_information;

        if (formData) {
          // Reset form values first
          reset({
            firstName: formData.firstName || '',
            lastName: formData.lastName || '',
            email: formData.email || '',
            contactNumber: formData.contactNumber || '',
            city: formData.city || '',
            country: formData.country || '',
            yearOfExperience: formData.yearOfExperience || '',
            certificationYear: formData.certificationYear || '',
          });

          // Set logo
          if (formData.userLogo) {
            setLogoUrl(formData.userLogo);
          }

          // Fetch certificate if available
          const fileUrl = formData.siriCertificate;
          if (fileUrl && typeof fileUrl === 'string') {
            const response = await fetch(fileUrl);
            const blob = await response.blob();

            const fetchedFile = new File([blob], 'siriCertificate.pdf', {
              type: 'application/pdf',
            });

            setSelectedFile(fetchedFile);
          }
        }

        // Set metadata file map
        if (metadata_information) {
          const preUploadedMap: Record<string, UploadFileMetadata> = {};
          metadata_information.forEach((item) => {
            if (item.tableName) {
              preUploadedMap[item.tableName] = item;
            }
          });
          setUploadedFiles(preUploadedMap);
        }
      } catch (error) {
        console.error('Error populating form or fetching file:', error);
      }
    };
    if (existingData && existingData.data[0]?.formData) {
      populateFormAndFile();
    }
  }, [existingData, reset]);

  console.log('selectedfile', selectedFile);

  //function to view the metadata files
  const handleViewClick = async (fileName: string) => {
    if (!fileName) {
      triggerToast('Invalid file name.', 'warning');
      return;
    }

    try {
      const response = await viewMetadataFile({
        tenantId: tenantId,
        fileName: fileName,
      }).unwrap();

      if (response?.url) {
        const viewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(response.url)}`;
        window.open(viewerUrl, '_blank');
      } else {
        triggerToast('File URL not found.', 'error');
      }
    } catch (err) {
      console.error('error', err);
      triggerToast('Failed to view file', 'error');
    }
  };

  // const uploadFunctionMap: Record<string, (params: { tenantId: string; file: File }) => > = {
  const uploadFunctionMap: Record<string, UploadFunction> = {
    questionnaires_: uploadQuestionnaries,
    cost_profile_: uploadCostProfile,
    kpi_selection_: uploadKPI,
    industry_selection_: uploadIndustrySelection,
    planning_horizon_: uploadPlanningHorizon,
    cost_lookup_table_: uploadCostProfileLookup,
    industry_selection_lookup_table_: uploadIndustrySelectionLookup,
    kpi_lookup_table_: uploadKPILookup,
    assessment_matrix_score_lookup_table_: uploadIndustryAssessmentMatrix,
    solutions_with_band_weights_: uploadSolutionMetadata,
    band_definition_table_: uploadBandDefinition,
  };

  const handleUploadFile = async (file: File, fileKey: string) => {
    console.log('Uploading file for:', uploadedFiles);
    setUploadingKey(fileKey);

    const uploadFunction = uploadFunctionMap[fileKey];
    if (!uploadFunction) {
      console.error('No upload function found for:', fileKey);
      return;
    }

    try {
      const response = await uploadFunction({ tenantId: tenantId ?? '', file }).unwrap();
      console.log('uploaded resp', response); // NOW you'll see it

      if (response?.status && response?.data?.[0]) {
        const fullMetadataObject = response.data[0];

        setUploadedFiles((prev) => ({
          ...prev,
          [fileKey]: fullMetadataObject,
        }));

        // triggerToast(`${fileKey} uploaded successfully`, 'success');
      } else {
        // triggerToast(`Please add a valid ${fileKey} file`, 'error');
      }
    } catch (error) {
      console.log('catch error', error);
    } finally {
      setUploadingKey(null);
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
      console.log('error', error);
    }
  };
  //function to submit the formdata
  const onSubmit = async (formValues: AssessorFormType) => {
    if (!selectedFile) {
      triggerToast('Please add siriCertificate', 'error');
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
      const status = await getOnboardingStatus({ tenantId: tenantId ?? '' }).unwrap();
      console.log('Status response:', status);
      //  dispatch(setOnboardingStatus(status?.onboardingStatus));
      if (status?.onboardingStatus) {
        setStatus(status.onboardingStatus);
        dispatch(setOnboardingStatus(status?.onboardingStatus));
      }
      // console.log('ornboding status', orgStatus);

      if (status?.onboardingStatus === 'COMPLETED') {
        router.push('/AssignedPlantsList');
      }

      if (status?.onboardingStatus === 'STARTED' || status?.onboardingStatus === 'NOT_STARTED') {
        triggerToast('Please Fill All The Data', 'error');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log('status stateee', Status);

  const activeStep = useMemo(() => {
    // Step 0: If focused on any form field or siriCertificate is selected
    const isFormFieldFocused = AssessorFormInputs.some((input) => input.name === focusedField);
    if (isFormFieldFocused || focusedField === 'siriCertificate') return 0;

    // Step 1 to N: If user is interacting with a file upload
    if (currentUploadKey) {
      const indexInFiles = fileValues.findIndex((key) => key === currentUploadKey);
      return indexInFiles !== -1 ? indexInFiles + 1 : 0; // +1 since step 0 is form
    }

    return 0;
  }, [focusedField, currentUploadKey]);

  const completedSteps = useMemo(() => {
    const completed: number[] = [];

    // Step 0: Check if form fields are filled
    const isFormComplete =
      AssessorFormInputs.every((input) => {
        const value = watchedValues?.[input.name as keyof AssessorFormType];
        return (typeof value === 'string' && value.trim().length > 0) || (typeof value === 'number' && !isNaN(value));
      }) && selectedFile; // Also check if siriCertificate is uploaded

    if (isFormComplete) {
      completed.push(0); // Form step
    }

    // Step 1 to N: check each fileKey
    fileValues.forEach((fileKey, index) => {
      if (uploadedFiles[fileKey]) {
        completed.push(index + 1); // +1 because 0 is form step
      }
    });

    return completed;
  }, [watchedValues, selectedFile, uploadedFiles]);
  // function to download the file

  const handleDownloadClick = async (fileName: string) => {
    if (!fileName) {
      triggerToast('Invalid file name.', 'warning');
      return;
    }

    try {
      setdownloadKey(fileName);

      // This will internally trigger the file download via responseHandler
      await getMetadataFileTemplate({
        userType: 'ASSESSOR',
        fileName,
      }).unwrap();

      console.log('Download triggered successfully.');
    } catch (err) {
      console.error('Error downloading file:', err);
    } finally {
      setdownloadKey(null);
    }
  };
  // to show the created at and update at date in the date format
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'NA';
    return new Date(dateStr).toISOString().split('T')[0]; // "YYYY-MM-DD"
  };

  return (
    <>
      {Status === 'COMPLETED' ? (
        <Loader loading={true} />
      ) : (
        <Box sx={{ width: '100%', height: '99.5%' }}>
          {' '}
          <Box className={styles.stepperContainer}>
            <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
          </Box>
          <Paper elevation={2} sx={{ borderRadius: '16px' }} className={styles.paperContainer}>
            <form className={styles.mostOuterConatiner} onSubmit={handleSubmit(onSubmit)}>
              {/* <Typography variant="h4" className={styles.heading}>
                Assessor Profile
              </Typography> */}

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
                              //  defaultValue=""
                              rules={input.rules}
                              render={({ field, fieldState }) => {
                                return (
                                  <>
                                    {input.iscountry ? (
                                      <CurrencyValueSelector
                                        {...field}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        options={CountryOptions.map(({ name }) => ({
                                          label: name,
                                          value: name,
                                        }))}
                                        onFocus={() => setFocusedField(input.name)}
                                        required
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                      />
                                    ) : (
                                      <InputWithLabel
                                        {...field}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        type={input.type || 'text'}
                                        onFocus={() => setFocusedField(input.name)}
                                        size="small"
                                        required
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        readonly={input.name === 'email'}
                                      />
                                    )}
                                  </>
                                );
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </section>
                  </Box>
                </Box>

                <Box className={styles.secondContainer}>
                  <Grid className={styles.btnContainer}>
                    <Box className={styles.fileUploadContainer} sx={{ mt: 5, mb: 5 }}>
                      <FileUploadButton
                        label="Certificate"
                        size="large"
                        iconSize="100"
                        accept="application/pdf"
                        onFileSelect={(file) => {
                          setSelectedFile(file);
                        }}
                        sx={
                          selectedFile
                            ? {
                                backgroundColor: '#4CAF50 !important',
                                color: '#fff !important',
                                '&:hover': { backgroundColor: '#388e3c !important' },
                              }
                            : {}
                        }
                      />
                    </Box>

                    <Box className={styles.buttonSection}>
                      <CustomButton
                        // children={'save'}
                        variant="contained"
                        color="primary"
                        icon="save"
                        type="submit"
                        width="300px"
                        className={styles.saveBtn}
                      >
                        {isLoading ? 'Saving...' : 'Save'}
                      </CustomButton>
                    </Box>
                  </Grid>

                  <Box className={styles.tableContainer} sx={{ overflowX: 'auto' }}>
                    <TableContainer
                      component={Paper}
                      sx={{
                        maxHeight: 450,
                        overflowX: 'auto',
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow sx={{ padding: 1, textAlign: 'left' }}>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>No.</TableCell>
                            <TableCell sx={{ padding: 0, textAlign: 'left' }}>File Name</TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>Version</TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>
                              First
                              <br /> Uploaded
                            </TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>
                              Last
                              <br /> Uploaded{' '}
                            </TableCell>
                            {/* <TableCell sx={{padding:1, textAlign:'center'}}></TableCell> */}
                            <TableCell
                              sx={{
                                padding: 1,
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <span>Download</span> <span>Template</span>
                            </TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>Upload</TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>View</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fileTypes.map((label, index) => {
                            const backendKey = fileUploadKeyMap[label];

                            return (
                              <TableRow key={index}>
                                <TableCell sx={{ textAlign: 'left', padding: 1 }}>{index + 1}</TableCell>
                                <TableCell sx={{ textAlign: 'left', padding: 0 }}>{label}</TableCell>
                                <TableCell sx={{ textAlign: 'left', padding: 1 }}>{uploadedFiles[backendKey]?.version ?? 'NA'}</TableCell>
                                <TableCell sx={{ textAlign: 'left', padding: 1 }}>
                                  {formatDate(uploadedFiles[backendKey]?.createdAt)}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left', padding: 1 }}>
                                  {formatDate(uploadedFiles[backendKey]?.updatedAt)}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    textAlign: 'left',

                                    padding: 1,
                                  }}
                                >
                                  {downloadKey === backendKey ? (
                                    <ButtonWithLoader loading={true} width="50px" label="" height="40px" loaderColor="white" />
                                  ) : (
                                    <FileActionButton
                                      icon="download"
                                      label="Download"
                                      width="50px"
                                      showIcon
                                      onClick={() => handleDownloadClick(backendKey)}
                                    />
                                  )}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    textAlign: 'left',
                                    padding: 1,
                                  }}
                                >
                                  {uploadingKey === backendKey ? (
                                    <ButtonWithLoader loading={true} width="50px" label="" height="40px" />
                                  ) : (
                                    <FileActionButton
                                      icon="upload"
                                      label="Upload"
                                      width="50px"
                                      showIcon
                                      color={uploadedFiles[backendKey] ? '#4CAF50' : '#1976d2'}
                                      onClick={() => {
                                        setCurrentUploadKey(backendKey);
                                        fileInputRef.current?.click();
                                      }}
                                    />
                                  )}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left', padding: 1 }}>
                                  <span
                                    // style={{
                                    //   pointerEvents: uploadedFiles[backendKey] ? 'auto' : 'none',
                                    //   opacity: uploadedFiles[backendKey] ? 1 : 0.5,
                                    // }}
                                    style={{
                                      pointerEvents: uploadedFiles[backendKey] ? 'auto' : 'none',
                                      opacity: uploadedFiles[backendKey] ? 1 : 0.5,
                                    }}
                                  >
                                    <FileActionButton
                                      icon="view"
                                      label="View"
                                      width="50px"
                                      showIcon
                                      showLabel={false}
                                      onClick={() => handleViewClick(backendKey)}
                                    />
                                  </span>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
                  </Box>
                </Box>
              </Box>
            </form>
          </Paper>
        </Box>
      )}
    </>
  );
}

export default AssessorOnboarding;
