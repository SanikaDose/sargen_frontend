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
  useViewMetadataFileMutation,
  useGetLogoQuery,
} from './AssessorOnboarding.Api';

import { fileUploadKeyMap, fileTypes } from './FormConfig/fileInput';
import { triggerToast } from '@/app/utils/toast';
import ButtonWithLoader from '@/components/ButtonWithLoader/buttonWithLoader';
import { AssessorFormInputs } from './FormConfig/formInputStep';
import Loader from '@/components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import CurrencyValueSelector from '@/components/CurrencyDropDown/CurrencyDropDown';
import { currencyOptions } from '@/app/utils/CurrencyOptions';

const steps = ['First Name', 'Last Name', 'E-Mail Id', 'Contact Number', 'City', 'Country', 'Year Of Experience', 'Certification Year'].map(
  (label) => ({ label }),
);

//const tenantId = getValueLocalStorage('tenantId');
const tenantId = 'ASSESSOR-26327b7b-2e01-49c1-9948-1373c7e1a8e1';
function AssessorOnboarding() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNameHeader('Assessor Onboarding'));
  }, [dispatch]);
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
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const router = useRouter();
  const [uploadAssessorLogo] = useUploadAssessorLogoMutation();
  const [addAssessorInformation, { isLoading }] = useAddAssessorInformationMutation();
  const [getMetadataFileTemplate, { isLoading: isUploadLoading }] = useGetMetadataFileTemplateMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-avatar-profile.png?ignore');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const watchedValues = useWatch({ control });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadKey, setCurrentUploadKey] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

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
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [downloadKey, setdownloadKey] = useState<string | null>(null);

  //reload view
  const [viewableFiles, setViewableFiles] = useState<Record<string, string>>({});
  const fetchFileAvailability = async () => {
    const filesMap: Record<string, string> = {};

    fileValues.map(async (key) => {
      try {
        const response = await viewMetadataFile({
          tenantId,
          fileName: key,
        }).unwrap();

        if (response?.url) {
          filesMap[key] = response.url; // Store key and URL
        }
      } catch (err) {
        // File doesn't exist — skip it
      }
    }),
      setViewableFiles(filesMap); // set state for viewable files
  };
  const { data: logoData } = useGetLogoQuery({ tenantId });
  console.log(logoData);
  useEffect(() => {
    if (logoData?.logoUrl) {
      setLogoUrl(logoData.logoUrl);
    }
  });
  useEffect(() => {
    fetchFileAvailability();
  }, []);

  console.log('vieablefile', viewableFiles);
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

  const uploadFunctionMap: Record<string, (params: { tenantId: string; file: File }) => Promise<any>> = {
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
      const response = await uploadFunction({ tenantId: tenantId ?? '', file });
      console.log('uploaded resp', response);
      if (response.data.status === true) {
        setUploadedFiles((prev) => ({
          ...prev,
          [fileKey]: file,
        }));
      } else {
        triggerToast(`Please add a valid ${fileKey} file`, 'error');
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
    console.log('submot button clicked');
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
      router.push('/AssignedPlantsList');
    } catch (error) {
      console.log('error', error);
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
              <Typography variant="h4" className={styles.heading}>
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
                                    <>
                                      <CurrencyValueSelector
                                        {...field}
                                        label={input.label + (input.rules?.required ? ' *' : '')}
                                        placeholder={input.placeholder}
                                        options={CountryOptions.map(({ name, code }) => ({
                                          label: name,
                                          value: name,
                                        }))}
                                        onFocus={() => setFocusedField(input.name)}
                                      />
                                      {fieldState?.error?.message && (
                                        <Typography variant="caption" color="red">
                                          {fieldState.error.message}
                                        </Typography>
                                      )}
                                    </>
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
                          console.log('Selected file:', file);
                          setSelectedFile(file);
                        }}
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
                        maxHeight: 400,
                        overflowX: 'auto',
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow sx={{ padding: 1, textAlign: 'left' }}>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>No.</TableCell>
                            <TableCell sx={{ padding: 0, textAlign: 'left' }}>File Name</TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>Version</TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>First Uploaded</TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>Last Uploaded </TableCell>
                            {/* <TableCell sx={{padding:1, textAlign:'center'}}></TableCell> */}
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>Download Template</TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>Upload</TableCell>
                            <TableCell sx={{ padding: 1, textAlign: 'left' }}>View</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fileTypes.map((label, index) => {
                            const backendKey = fileUploadKeyMap[label];
                            const cert = certificateData[index]; // safely pull from data if exists

                            return (
                              <TableRow key={index}>
                                <TableCell sx={{ textAlign: 'left', padding: 1 }}>{index + 1}</TableCell>
                                <TableCell sx={{ textAlign: 'left', padding: 0 }}>{label}</TableCell>
                                <TableCell sx={{ textAlign: 'left', padding: 1 }}>{cert?.version ?? '-'}</TableCell>
                                <TableCell sx={{ textAlign: 'left', padding: 1 }}>{cert?.createdAt ?? '-'}</TableCell>
                                <TableCell sx={{ textAlign: 'left', padding: 1 }}>{cert?.updatedAt ?? '-'}</TableCell>
                                <TableCell
                                  sx={{
                                    textAlign: 'left',

                                    padding: 1,
                                  }}
                                >
                                  {downloadKey === backendKey ? (
                                    <ButtonWithLoader loading={true} width="50px" label="" />
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
                                    <ButtonWithLoader loading={true} width="50px" label="" />
                                  ) : (
                                    <FileActionButton
                                      icon="upload"
                                      label="Upload"
                                      width="50px"
                                      showIcon
                                      color={uploadedFiles[backendKey] || viewableFiles[backendKey] ? 'green' : '#1976d2'}
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
                                      pointerEvents: uploadedFiles[backendKey] || viewableFiles[backendKey] ? 'auto' : 'none',
                                      opacity: uploadedFiles[backendKey] || viewableFiles[backendKey] ? 1 : 0.5,
                                    }}
                                  >
                                    <FileActionButton
                                      icon="view"
                                      label="View"
                                      width="50px"
                                      showIcon
                                      showLabel={false}
                                      onClick={() => handleViewClick(backendKey)}
                                      // onClick={() => {
                                      //   const url = viewableFiles[backendKey];
                                      //   if (url) window.open(url, '_blank');
                                      // }}
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
