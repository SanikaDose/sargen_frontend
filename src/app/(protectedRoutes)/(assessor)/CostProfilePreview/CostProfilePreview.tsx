'use client';
import OverallCostProfileCard from '@/components/CostProfileCard/OverallCostProfileCard';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import Loader from '@/components/Loader/Loader';
import Stepper from '@/components/Stepper/Stepper';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { markStepCompleted, setActiveStep } from '@/store/Slices/StepperSlice';
import { RootState } from '@/store/store';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FormValues, RawCostCategory } from '../../(plantAssessment)/plantAssement.model';
import { useAddCostCategoriesMutation, useGetCostCategoriesMutation } from '../../(plantAssessment)/plantAssementApi';
import styles from './CostProfilePreview.module.css';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';

const CostProfilePreview = () => {
  const params = useParams();
  const router = useRouter();
  const organisationId = params.organisationId as string;
  const plantId = params.plantId as string;

  // initial state onf stepper
  const stepperState = useSelector((state: RootState) => state.stepper);

  // const tenantId = getValueLocalStorage('tenantId');
  const [getCostCategories, { isLoading: isLoadingGet }] = useGetCostCategoriesMutation();
  const [addCostCategories, { isLoading: isLoadingAdd }] = useAddCostCategoriesMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.plantAssessmentCostProfile));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
    dispatch(setActiveStep(3));
    dispatch(markStepCompleted(2)); // KPI Definition completed
  }, [dispatch]);

  // Edit state management
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { costs: [] },
  });
  console.log('organisation id', organisationId);

  const formValues = useWatch({
    control,
    name: 'costs',
  });

  // Watch for form changes to detect unsaved changes
  const watchedValues = watch();

  useEffect(() => {
    if (isEditMode) {
      setHasUnsavedChanges(true);
    }
  }, [watchedValues, isEditMode]);

  // Calculate overall cost profile
  const overAllCostProfile =
    formValues && formValues.length > 0
      ? formValues.reduce((acc, item) => acc + parseFloat(String(item.costAsAPercentageOfRevenue || 0)), 0).toFixed(2)
      : '0.00';

  const { fields, replace } = useFieldArray({
    control,
    name: 'costs',
  });

  const fetchCostProfileData = async () => {
    if (!organisationId || !plantId) return;

    const payload = {
      tenantId: organisationId,
      plantId: plantId,
    };

    try {
      const result = await getCostCategories(payload).unwrap();

      const formattedData = result.map((item: RawCostCategory) => ({
        id: item.id,
        costCategory: item.costCategory.trim(),
        costAsAPercentageOfRevenue: parseFloat(item.costAsAPercentageOfRevenue) || 0,
      }));

      replace(formattedData);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to fetch cost categories', error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setHasUnsavedChanges(false);
  };

  const handleFormSubmit = async (data: FormValues) => {
    if (!organisationId || !plantId) return;

    try {
      const payload = {
        tenantId: organisationId,
        plantId: plantId,
        costProfileData: data.costs.map((cost) => ({
          id: cost.id,
          costCategory: cost.costCategory,
          costAsAPercentageOfRevenue: parseFloat(String(cost.costAsAPercentageOfRevenue)),
        })),
      };

      const costProfileSaveResponse = await addCostCategories(payload).unwrap();
      if (costProfileSaveResponse) {
        setIsEditMode(false);
        setHasUnsavedChanges(false);
      }
    } catch (error) {
      console.error('Failed to save cost categories', error);
    }
  };

  const handleNextClick = () => {
    router.push(`/UserAssessmentPreview/${organisationId}/${plantId}`);
  };

  useEffect(() => {
    fetchCostProfileData();
  }, [params]);

  // Button state logic
  const isSaveDisabled = !isEditMode || !hasUnsavedChanges || isLoadingAdd;
  const isNextDisabled = isEditMode && hasUnsavedChanges;
  const isBackDisabled = isEditMode;
  const isEditDisabled = isEditMode || isLoadingGet || isLoadingAdd;

  return (
    <>
      {isLoadingGet || isLoadingAdd ? (
        <Loader loading={true} />
      ) : (
        <Box component="form" sx={{ height: '99%' }} onSubmit={handleSubmit(handleFormSubmit)}>
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
              {/* Left Section */}
              <Box className={styles.formContainer}>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'black',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  Cost Profile
                </Typography>
                <Grid container spacing={2} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                  {fields.length > 0
                    ? fields.map((field, index) => (
                        <Box
                          key={field.id}
                          className={styles.costInputCards}
                          sx={{
                            '& input': {
                              cursor: isEditMode ? 'text' : 'not-allowed !important',
                              pointerEvents: isEditMode ? 'auto' : 'none !important',
                            },
                            '& input:hover': {
                              cursor: isEditMode ? 'text' : 'not-allowed !important',
                            },
                            '& input:focus': {
                              cursor: isEditMode ? 'text' : 'not-allowed !important',
                            },
                            '& *': {
                              cursor: isEditMode ? 'inherit' : 'not-allowed !important',
                            },
                          }}
                        >
                          <Controller
                            name={`costs.${index}.costAsAPercentageOfRevenue`}
                            control={control}
                            render={({ field: controllerField }) => (
                              <OverallCostProfileCard
                                fieldName={field.costCategory}
                                costValue={controllerField.value}
                                onChange={(val) => controllerField.onChange(val)}
                                readonly={!isEditMode} // Make readonly when not in edit mode
                              />
                            )}
                          />
                        </Box>
                      ))
                    : 'No cost Profile'}
                </Grid>

                {/* Always show overall cost summary */}
                <Box className={styles.OverallCostProfileCard}>
                  <OverallCostProfileCard
                    fieldName="Overall Cost Profile"
                    costValue={overAllCostProfile}
                    onChange={() => {}}
                    readonly
                    boxBackgroundColor="#10557C"
                    textColor="#FFFFFF"
                  />
                </Box>
              </Box>

              {/* Right Section */}
              <Box className={styles.rightSection}>
                <Box className={styles.aboutSection}>
                  <InfoBox
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nulla arcu..."
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
                    disabled={isBackDisabled || isLoadingAdd} // Updated to include isBackDisabled
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
                    disabled={isNextDisabled} // This now simply checks if in edit mode
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

export default CostProfilePreview;
