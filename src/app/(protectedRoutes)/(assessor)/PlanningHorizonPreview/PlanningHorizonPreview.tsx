'use client';

import Card from '@/components/Card/Card';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import Loader from '@/components/Loader/Loader';
import Stepper from '@/components/Stepper/Stepper';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { markStepCompleted, markStepIncomplete, setActiveStep } from '@/store/Slices/StepperSlice';
import { RootState } from '@/store/store';
import { Box, Grid, Paper } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { HorizonFormValues, HorizonOption } from '../../(plantAssessment)/plantAssement.model';
import { useGetPlanningHorizonListMutation, useSelectPlanningHorizonListMutation } from '../../(plantAssessment)/plantAssementApi';
import styles from './PlanningHorizonPreview.module.css';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';

const PlanningHorizonPreview = () => {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.organisationId as string;
  const plantId = params.plantId as string;
  const [getHorizonOptions, { isLoading: isLoadingGet }] = useGetPlanningHorizonListMutation();
  const [selectHorizonOption, { isLoading: isLoadingAdd }] = useSelectPlanningHorizonListMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.assessorPlanningHorizonPreview));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
    dispatch(setActiveStep(1));
    dispatch(markStepCompleted(0));
    dispatch(markStepIncomplete(3));
  }, [dispatch]);

  const [horizonOptions, setHorizonOptions] = useState<HorizonOption[]>([]);

  // Edit state management
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [initialFormState, setInitialFormState] = useState<HorizonFormValues>({ selectedHorizonId: '' });

  const { handleSubmit, control, reset, watch } = useForm<HorizonFormValues>({
    defaultValues: {
      selectedHorizonId: '',
    },
  });

  // Watch for form changes to detect unsaved changes
  const watchedValues = watch();

  // Change detection for unsaved changes
  useEffect(() => {
    if (isEditMode && initialFormState.selectedHorizonId !== undefined) {
      const hasChanges = watchedValues.selectedHorizonId !== initialFormState.selectedHorizonId;
      setHasUnsavedChanges(hasChanges);
    } else if (!isEditMode) {
      setHasUnsavedChanges(false);
    }
  }, [watchedValues.selectedHorizonId, isEditMode, initialFormState.selectedHorizonId]);

  useEffect(() => {
    const fetchHorizonOptions = async () => {
      try {
        const requestPayload = {
          tenantId,
          plantId: plantId || '',
        };
        const result = await getHorizonOptions(requestPayload).unwrap();

        const mappedOptions = result.map((option: HorizonOption) => {
          let termStart = Number(option.termStart);
          let termEnd = Number(option.termEnd);

          if (termStart % 1 !== 0) {
            termStart = Math.round(termStart * 12);
          }
          if (termEnd % 1 !== 0) {
            termEnd = Math.round(termEnd * 12);
          }

          return {
            id: option.id,
            planningHorizon: option.planningHorizon.trim(),
            termStart,
            termEnd,
            degreeOfRelevanceCost: option.degreeOfRelevanceCost,
            degreeOfRelevanceKpi: option.degreeOfRelevanceKpi,
            degreeOfInfluenceOnProximityFactors: option.degreeOfRelevanceKpi,
            isselected: option.isselected,
          };
        });

        setHorizonOptions(mappedOptions);

        const preselected = mappedOptions.find((opt: HorizonOption) => opt.isselected);
        const formData = {
          selectedHorizonId: preselected?.id || '',
        };

        // Reset form with fetched data
        reset(formData);

        // Set initial state after form is reset
        setTimeout(() => {
          setInitialFormState(formData);
          setHasUnsavedChanges(false);
        }, 0);
      } catch (error) {
        console.error('Failed to fetch horizon options:', error);
      }
    };

    fetchHorizonOptions();
  }, [getHorizonOptions, tenantId, plantId, reset]);

  const handleEditClick = () => {
    setIsEditMode(true);
    setHasUnsavedChanges(false);
  };

  const handleSave = async (data: HorizonFormValues) => {
    try {
      const selectedOption = horizonOptions.find((opt) => opt.id === data.selectedHorizonId);
      if (!selectedOption) return;

      const payload = {
        tenantId,
        plantId: plantId || '',
        selectedPlan: {
          id: selectedOption.id,
          planningHorizon: selectedOption.planningHorizon,
          isselected: true,
          degreeOfRelevanceCost: selectedOption.degreeOfRelevanceCost,
          degreeOfRelevanceKpi: selectedOption.degreeOfRelevanceKpi,
          degreeOfInfluenceOnProximityFactors: selectedOption.degreeOfRelevanceKpi,
        },
      };

      const plannedSaveSuccessfully = await selectHorizonOption(payload).unwrap();
      if (plannedSaveSuccessfully) {
        setIsEditMode(false);
        setHasUnsavedChanges(false);
        // Update initial state to current saved state
        setInitialFormState(data);
      }
    } catch (error) {
      console.error('Failed to save horizon option:', error);
    }
  };

  const handleNextClick = () => {
    router.push(`/KpiDefinitionPreview/${tenantId}/${plantId}`);
  };

  const stepperState = useSelector((state: RootState) => state.stepper);

  // Button state logic
  const isSaveDisabled = !isEditMode || isLoadingAdd;
  const isNextDisabled = (isEditMode && hasUnsavedChanges) || isLoadingAdd;
  const isBackDisabled = isEditMode || isLoadingAdd;
  const isEditDisabled = isEditMode || isLoadingGet || isLoadingAdd;

  return (
    <>
      {isLoadingGet || isLoadingAdd ? (
        <Loader loading={true} />
      ) : (
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
                    name="selectedHorizonId"
                    control={control}
                    render={({ field }) => (
                      <>
                        {horizonOptions.map((option) => {
                          const isSelected = field.value === option.id;
                          const isDisabled = !isEditMode;

                          return (
                            <Grid
                              key={option.id}
                              size={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}
                              sx={{
                                height: '10%',
                                '& *': {
                                  cursor: isEditMode ? 'inherit' : 'not-allowed !important',
                                },
                              }}
                            >
                              <Card
                                label={option.planningHorizon}
                                isSelected={isSelected}
                                isDisabled={isDisabled}
                                onToggle={() => {
                                  if (isEditMode) {
                                    field.onChange(option.id);
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
      )}
    </>
  );
};

export default PlanningHorizonPreview;
