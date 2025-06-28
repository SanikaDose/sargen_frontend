'use client';

import Card from '@/components/Card/Card';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import Loader from '@/components/Loader/Loader';
import Stepper from '@/components/Stepper/Stepper';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { markStepIncomplete, setActiveStep } from '@/store/Slices/StepperSlice';
import { RootState } from '@/store/store';
import { Box, Grid, Paper } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Industry, IndustryFormValues } from '../../(plantAssessment)/plantAssement.model';
import { useGetIndustrySelectionListMutation, useSelectIndustrySelectionListMutation } from '../../(plantAssessment)/plantAssementApi';
import styles from './IndustrySelectionPreview.module.css';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';

const IndustrySelectionPreview = () => {
  const router = useRouter();
  const params = useParams();
  const tenantId = params.organisationId as string;
  const plantId = params.plantId as string;
  const [getIndustrySelectionList, { isLoading: isLoadingGet }] = useGetIndustrySelectionListMutation();
  const [selectIndustrySelectionList, { isLoading: isLoadingAdd }] = useSelectIndustrySelectionListMutation();
  // const tenantId = getValueLocalStorage('tenantId');
  const [industryData, setIndustryData] = useState<Industry[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.assessorIndustrySelectionPreview));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
    dispatch(setActiveStep(0));
    dispatch(markStepIncomplete(1));
  }, [dispatch]);

  // Edit state management
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [initialFormState, setInitialFormState] = useState<IndustryFormValues>({ selectedIndustryId: '' });

  const { handleSubmit, control, reset, watch } = useForm<IndustryFormValues>({
    defaultValues: {
      selectedIndustryId: '',
    },
  });

  // Watch for form changes to detect unsaved changes
  const watchedValues = watch();

  // Change detection for unsaved changes
  useEffect(() => {
    if (isEditMode && initialFormState.selectedIndustryId !== undefined) {
      const hasChanges = watchedValues.selectedIndustryId !== initialFormState.selectedIndustryId;
      setHasUnsavedChanges(hasChanges);
    } else if (!isEditMode) {
      setHasUnsavedChanges(false);
    }
  }, [watchedValues.selectedIndustryId, isEditMode, initialFormState.selectedIndustryId]);

  useEffect(() => {
    const fetchIndustryData = async () => {
      try {
        const obj = {
          tenantId,
          plantId: plantId || '',
        };
        const result = await getIndustrySelectionList(obj).unwrap();

        const industries = result.map((item: Industry) => ({
          id: item.id,
          industry_name: item.industry_name.trim(),
          isselected: item.isselected,
        }));

        setIndustryData(industries);

        const selected = industries.find((i: Industry) => i.isselected);
        const formData = {
          selectedIndustryId: selected?.id || '',
        };

        // Reset form with fetched data
        reset(formData);

        // Set initial state after form is reset
        setTimeout(() => {
          setInitialFormState(formData);
          setHasUnsavedChanges(false);
        }, 0);
      } catch (error) {
        console.error('Failed to fetch industry data:', error);
      }
    };

    fetchIndustryData();
  }, [getIndustrySelectionList, tenantId, plantId, reset]);

  const handleEditClick = () => {
    setIsEditMode(true);
    setHasUnsavedChanges(false);
  };

  const handleSave = async (data: IndustryFormValues) => {
    try {
      const selectedIndustry = industryData.find((item) => item.id === data.selectedIndustryId);
      if (!selectedIndustry) return;

      const payload = {
        tenantId,
        plantId: plantId || '',
        selectedIndustry: {
          id: selectedIndustry.id,
          industry_name: selectedIndustry.industry_name,
          isselected: true,
        },
      };

      const industrySaveSuccessfully = await selectIndustrySelectionList(payload).unwrap();
      if (industrySaveSuccessfully) {
        setIsEditMode(false);
        setHasUnsavedChanges(false);
        // Update initial state to current saved state
        setInitialFormState(data);
      }
    } catch (error) {
      console.error('Failed to save industry selection:', error);
    }
  };

  const handleNextClick = () => {
    router.push(`/PlanningHorizonPreview/${tenantId}/${plantId}`);
  };

  const stepperState = useSelector((state: RootState) => state.stepper);

  // useEffect(() => {
  //   dispatch(setActiveStep(3));
  //   dispatch(markStepCompleted(2));
  // }, [dispatch]);

  // Button state logic
  const isSaveDisabled = !isEditMode || isLoadingAdd;
  const isNextDisabled = (isEditMode && hasUnsavedChanges) || isLoadingAdd;
  const isBackDisabled = isEditMode || isLoadingAdd;
  const isEditDisabled = isEditMode || isLoadingGet || isLoadingAdd;

  // Show loader at the top level if loading
  if (isLoadingGet || isLoadingAdd) {
    return (
      <Box sx={{ height: '99%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader loading />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '99%' }} component="form" onSubmit={handleSubmit(handleSave)}>
      <Box className={styles.stepperContainer}>
        <Stepper steps={stepperState.steps} activeStep={stepperState.activeStep} completedSteps={stepperState.completedSteps} />
      </Box>
      <Paper
        className={styles.formSection}
        elevation={2}
        sx={{
          mt: 2,
          borderRadius: '16px',
          backgroundColor: 'white',
          border: '1px solid rgb(216, 216, 216)',
        }}
      >
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }} className={styles.bothSections}>
          <Box className={styles.formContainer}>
            <Grid
              container
              spacing={2}
              sx={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Controller
                name="selectedIndustryId"
                control={control}
                render={({ field }) => (
                  <>
                    {industryData.map((industry) => {
                      const isSelected = field.value === industry.id;
                      const isDisabled = !isEditMode;

                      return (
                        <Grid
                          key={industry.id}
                          size={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}
                          sx={{
                            height: '10%',
                            '& *': {
                              cursor: isEditMode ? 'inherit' : 'not-allowed !important',
                            },
                          }}
                        >
                          <Card
                            label={industry.industry_name}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                            onToggle={() => {
                              if (isEditMode) {
                                field.onChange(industry.id);
                              }
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </>
                )}
              />
            </Grid>
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <InfoBox
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nulla arcu. Nam accumsan vel lectus nec ullamcorper. Sed euismod ultrices velit, nec dignissim tortor aliquam eu. Praesent volutpat tortor a mi molestie blandit. Nulla euismod tortor a luctus maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio enim, ullamcorper ornare egestas in, tristique non velit. Sed molestie felis id quam cursus elementum. Curabitur lectus sapien, placerat vel nulla ut, euismod rhoncus nulla. Sed convallis vulputate purus, at varius nisl efficitur cursus. Pellentesque tincidunt, velit id."
                heading="About Industry"
              />
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              mt={3}
              ml={5}
              mr={5}
              sx={{ background: '#F5FAFD', height: '70px', borderRadius: '16px' }}
              className={styles.buttonSection}
            >
              <CustomButton
                variant="contained"
                color="primary"
                icon="left"
                type="button"
                onClick={() => router.back()}
                disabled={isBackDisabled}
              >
                Back
              </CustomButton>

              <CustomButton
                variant="contained"
                color="primary"
                icon="edit"
                type="button"
                onClick={handleEditClick}
                disabled={isEditDisabled}
              >
                Edit
              </CustomButton>

              <CustomButton variant="contained" icon="save" type="submit" disabled={isSaveDisabled}>
                {isLoadingAdd ? 'Saving...' : 'Save'}
              </CustomButton>

              <CustomButton
                variant="contained"
                color="primary"
                icon="right"
                type="button"
                onClick={handleNextClick}
                disabled={isNextDisabled}
              >
                Next
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default IndustrySelectionPreview;
