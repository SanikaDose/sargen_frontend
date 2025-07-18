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
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Kpi, KpiFormValues } from '../../(plantAssessment)/plantAssement.model';
import { useGetKPIDefinitionMutation, useSelectKPIDefinitionMutation } from '../../(plantAssessment)/plantAssementApi';
import styles from './KpiDefinitionPreview.module.css';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';
import { aboutSection } from '@/app/utils/aboutSection';

const KpiDefinitionPreview = () => {
  const params = useParams();
  const router = useRouter();
  const organisationId = params.organisationId as string;
  const plantId = params.plantId as string;
  const [getKPIDefinition, { isLoading: isLoadingGet }] = useGetKPIDefinitionMutation();
  const [selectKPIDefinition, { isLoading: isLoadingAdd }] = useSelectKPIDefinitionMutation();
  const [kpiList, setKpiList] = useState<Kpi[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.assessorKpiDefinitionPreview));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
    dispatch(setActiveStep(2));
    dispatch(markStepCompleted(1));
    dispatch(markStepIncomplete(3));
  }, [dispatch]);
  // Edit state management
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [initialFormState, setInitialFormState] = useState<KpiFormValues>({ kpis: [] });

  const { control, handleSubmit, reset, watch } = useForm<KpiFormValues>({
    defaultValues: { kpis: [] },
  });

  const selectedKpis = useWatch({ control, name: 'kpis' });
  const selectedCount = selectedKpis?.filter((k) => k.isselected)?.length || 0;

  // Watch for form changes to detect unsaved changes
  const watchedValues = watch();

  // Fixed change detection with proper dependency array and comparison
  useEffect(() => {
    if (isEditMode && initialFormState.kpis.length > 0 && watchedValues.kpis.length > 0) {
      // Deep comparison of the arrays
      const hasChanges =
        JSON.stringify(watchedValues.kpis.map((k) => k.isselected)) !== JSON.stringify(initialFormState.kpis.map((k) => k.isselected));
      setHasUnsavedChanges(hasChanges);
    } else if (!isEditMode) {
      // Reset unsaved changes when not in edit mode
      setHasUnsavedChanges(false);
    }
  }, [watchedValues.kpis, isEditMode, initialFormState.kpis]);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await getKPIDefinition({ tenantId: organisationId, plantId }).unwrap();
        const cleaned = response.map((k: Kpi) => ({
          ...k,
          kpi: k.kpi.trim(),
        }));
        setKpiList(cleaned);

        const formData = {
          kpis: cleaned.map((k: { isselected: boolean }) => ({ isselected: k.isselected })),
        };

        // Reset form with fetched data
        reset(formData);

        // Set initial state after form is reset - this is crucial
        setTimeout(() => {
          setInitialFormState(formData);
          setHasUnsavedChanges(false);
        }, 0);
      } catch (error) {
        console.error('Failed to fetch KPIs:', error);
      }
    };
    fetchKpis();
  }, [getKPIDefinition, organisationId, plantId, reset]);

  const handleEditClick = () => {
    setIsEditMode(true);
    // Don't update initialFormState here - keep the original fetched state
    // This allows change detection to work properly
    setHasUnsavedChanges(false);
  };

  const handleSave = async (formData: KpiFormValues) => {
    try {
      const payload = {
        tenantId: organisationId,
        plantId,
        kpiDefinitions: formData.kpis.map((item, index) => ({
          id: kpiList[index].id,
          kpi: kpiList[index].kpi,
          isselected: item.isselected,
        })),
      };

      const kpisSaveSuccesfully = await selectKPIDefinition(payload).unwrap();
      if (kpisSaveSuccesfully) {
        setIsEditMode(false);
        setHasUnsavedChanges(false);
        // Update initial state to current saved state
        setInitialFormState(formData);
      }
    } catch (error) {
      console.error('Failed to save KPIs:', error);
    }
  };

  const handleNextClick = () => {
    router.push(`/CostProfilePreview/${organisationId}/${plantId}`);
  };

  const stepperState = useSelector((state: RootState) => state.stepper);

  // Button state logic - simplified and clearer
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
                <Grid container spacing={2} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                  {kpiList.map((field, index) => (
                    <Grid
                      size={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}
                      key={field.id}
                      sx={{
                        height: '10%',
                        '& *': {
                          cursor: isEditMode ? 'inherit' : 'not-allowed !important',
                        },
                      }}
                    >
                      <Controller
                        name={`kpis.${index}.isselected`}
                        control={control}
                        render={({ field: controllerField }) => {
                          const isSelected = controllerField.value;
                          const isDisabled = (!isSelected && selectedCount >= 5) || !isEditMode;

                          return (
                            <Card
                              key={field.id}
                              label={field.kpi}
                              isSelected={isSelected}
                              isDisabled={isDisabled}
                              onToggle={() => {
                                if (isEditMode) {
                                  controllerField.onChange(!isSelected);
                                }
                              }}
                            />
                          );
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box className={styles.rightSection}>
                <Box className={styles.aboutSection}>
                  <InfoBox heading={aboutSection.kpiSelection.heading} content={aboutSection.kpiSelection.description} />
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

export default KpiDefinitionPreview;
