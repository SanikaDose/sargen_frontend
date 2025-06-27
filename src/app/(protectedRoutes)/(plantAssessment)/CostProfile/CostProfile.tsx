'use client';
import { useEffect, useState } from 'react';
import { useAddCostCategoriesMutation, useGetCostCategoriesMutation } from '../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { FormValues, RawCostCategory } from '../plantAssement.model';
import { Box, Grid, Paper } from '@mui/material';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import styles from './costProfile.module.css';
import OverallCostProfileCard from '@/components/CostProfileCard/OverallCostProfileCard';
import InfoBox from '@/components/InfoBox/InfoBox';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import Stepper from '@/components/Stepper/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { markStepCompleted, setActiveStep } from '@/store/Slices/StepperSlice';
import Loader from '@/components/Loader/Loader';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPlantAssessmentDepartment } from '../plantAssementSlice';
const CostProfile = () => {
  const params = useParams();
  const router = useRouter();

  const dispatch = useDispatch();

  const stepperState = useSelector((state: RootState) => state.stepper);
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.plantAssessmentCostProfile));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
    dispatch(setActiveStep(3));
    dispatch(markStepCompleted(2)); // KPI Definition completed
  }, [dispatch]);

  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;

  const tenantId = organisationId;
  const [getCostCategories, { isLoading: isLoadingGet }] = useGetCostCategoriesMutation();
  const [addCostCategories] = useAddCostCategoriesMutation();
  // const [getAssesmentStatus, { isLoading: isLoadingStatus }] = useGetAssesmentStatusMutation({ tenantId, plantId });

  const [isMounting, setIsMounting] = useState(true);

  //component onmount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounting(false);
    }, 700); // Adjust duration as needed

    return () => clearTimeout(timeout);
  }, []);
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { costs: [] },
  });

  const formValues = useWatch({
    control,
    name: 'costs',
  });

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
      tenantId,
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
    } catch (error) {
      console.error('Failed to fetch cost categories', error);
    }
  };

  const handleFormSubmit = async (data: FormValues) => {
    if (!organisationId || !plantId) return;
    try {
      const payload = {
        tenantId,
        plantId: plantId,
        costProfileData: data.costs.map((cost) => ({
          id: cost.id,
          costCategory: cost.costCategory,
          costAsAPercentageOfRevenue: parseFloat(String(cost.costAsAPercentageOfRevenue)),
        })),
      };
      await addCostCategories(payload).unwrap();
      await router.push(`/Questionaire/${organisationId}/${plantId}`);

      dispatch(setPlantAssessmentDepartment('R&D'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCostProfileData();
  }, [params]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {isMounting ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Loader loading />
        </Box>
      ) : isLoadingGet ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Loader loading />
        </Box>
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
                {/* Loader inside left section */}
                {isLoadingGet ? (
                  <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                    <Loader loading />
                  </Box>
                ) : (
                  <Grid container spacing={2} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    {fields.length > 0
                      ? fields.map((field, index) => (
                          <Box key={field.id} className={styles.costInputCards}>
                            <Controller
                              name={`costs.${index}.costAsAPercentageOfRevenue`}
                              control={control}
                              render={({ field: controllerField }) => (
                                <OverallCostProfileCard
                                  fieldName={field.costCategory}
                                  costValue={controllerField.value}
                                  onChange={(val) => controllerField.onChange(val)}
                                  readonly={false}
                                />
                              )}
                            />
                          </Box>
                        ))
                      : 'No cost Profile'}
                  </Grid>
                )}

                {/* Always show overall cost summary */}
                <Box className={styles.OverallCostProfileCard}>
                  <OverallCostProfileCard
                    fieldName="Overall Cost Profile"
                    costValue={overAllCostProfile}
                    onChange={() => {}}
                    readonly
                    boxBackgroundColor={parseFloat(overAllCostProfile) >= 100 ? '#f15353' : '#10557C'}
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
                    // children="Back"
                    variant="contained"
                    color="primary"
                    icon="left"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Back
                  </CustomButton>
                  <CustomButton
                    // children={isLoadingGet || isLoadingAdd ? 'Saving...' : 'Save'}
                    variant="contained"
                    icon="save"
                    type="submit"
                  >
                    {isLoadingGet ? 'Saving...' : 'Save'}
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default CostProfile;
