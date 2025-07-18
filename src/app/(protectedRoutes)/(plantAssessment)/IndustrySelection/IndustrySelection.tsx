'use client';

import { useEffect, useState } from 'react';
import { useGetIndustrySelectionListMutation, useSelectIndustrySelectionListMutation } from '../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { Box, Grid, Paper } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import styles from './IndustrySelection.module.css';
import { Industry, IndustryFormValues } from '../plantAssement.model';
import InfoBox from '@/components/InfoBox/InfoBox';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import Stepper from '@/components/Stepper/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { markStepIncomplete, setActiveStep } from '@/store/Slices/StepperSlice';
import Card from '@/components/Card/Card';
import Loader from '@/components/Loader/Loader';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPlantAssessmentDepartment } from '../plantAssementSlice';
import { aboutSection } from '@/app/utils/aboutSection';

const IndustrySelection = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  const stepperState = useSelector((state: RootState) => state.stepper);

  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.plantAssessmentIndustrySelection));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
    dispatch(setActiveStep(0));
    dispatch(markStepIncomplete(1));
  }, [dispatch]);

  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;
  const [getIndustrySelectionList, { isLoading: isLoadingGet }] = useGetIndustrySelectionListMutation();
  const [selectIndustrySelectionList] = useSelectIndustrySelectionListMutation();
  const tenantId = organisationId;
  const [industryData, setIndustryData] = useState<Industry[]>([]);

  const { handleSubmit, control, reset } = useForm<IndustryFormValues>({
    defaultValues: {
      selectedIndustryId: '',
    },
  });

  const selectedIndustryId = useWatch({
    control,
    name: 'selectedIndustryId',
  });

  useEffect(() => {
    const apiCall = async () => {
      try {
        const obj = {
          tenantId,
          plantId: plantId || '',
        };
        const result = await getIndustrySelectionList(obj).unwrap();

        // Add null/undefined check and provide fallback
        if (!result || !Array.isArray(result)) {
          console.warn('API returned null or invalid data:', result);
          setIndustryData([]);
          return;
        }

        const industries = result.map((item: Industry) => ({
          id: item.id,
          industry_name: item.industry_name.trim(),
          isselected: item.isselected,
        }));

        setIndustryData(industries);

        const selected = industries.find((i: Industry) => i.isselected);
        reset({
          selectedIndustryId: selected?.id || '',
        });
      } catch (error) {
        console.error('Error fetching industry selection list:', error);
        setIndustryData([]);
      }
    };
    apiCall();
  }, [getIndustrySelectionList, tenantId, plantId, reset]);

  const onSubmit = async (data: IndustryFormValues) => {
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

    await selectIndustrySelectionList(payload).unwrap();

    router.push(`/PlanningHorizon/${organisationId}/${plantId}`);
  };

  const [isMounting, setIsMounting] = useState(true);

  //component onmount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounting(false);
    }, 700); // Adjust duration as needed

    return () => clearTimeout(timeout);
  }, []);
  return (
    <Box sx={{ width: '100%', height: '100%' }} component="form" onSubmit={handleSubmit(onSubmit)}>
      {isMounting ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Loader loading />
        </Box>
      ) : isLoadingGet ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Loader loading />
        </Box>
      ) : (
        <Box sx={{ height: '99%' }}>
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
                          // const isDisabled = !isSelected && industryData.filter((i) => i.isselected).length >= 1;

                          return (
                            <Grid key={industry.id} size={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }} sx={{ height: '10%' }}>
                              <Card
                                label={industry.industry_name}
                                isSelected={isSelected}
                                // isDisabled={isDisabled}
                                onToggle={() => field.onChange(industry.id)}
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
                  <InfoBox heading={aboutSection.industrySelection.heading} content={aboutSection.industrySelection.description} />
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
                  <CustomButton disabled={!selectedIndustryId || isLoadingGet} variant="contained" icon="save" type="submit">
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

export default IndustrySelection;
