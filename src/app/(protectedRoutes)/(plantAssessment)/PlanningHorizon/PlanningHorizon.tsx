'use client';

import { useEffect, useState } from 'react';
import { useGetPlanningHorizonListMutation, useSelectPlanningHorizonListMutation } from '../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { Box, Button, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './PlanningHorizon.module.css';
import { HorizonFormValues, HorizonOption, MultipleSections } from '../plantAssement.model';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import Stepper from '@/components/Stepper/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { markStepCompleted, markStepIncomplete, setActiveStep } from '@/store/Slices/StepperSlice';
import Card from '@/components/Card/Card';
import Loader from '@/components/Loader/Loader';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPlantAssessmentDepartment } from '../plantAssementSlice';
const steps = [
  'Research',
  'Selling',
  'RTransport',
  'Utilities',
  'Aftermarket',
  'Description',
  'Labour',
  'maintainance',
  'Raw Material',
  'Rental',
].map((label) => ({ label }));
const PlanningHorizon = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  dispatch(setPageNameHeader(pagesNames.plantAssessmentPlannigHorizon));
  dispatch(setShowAssessmentListSideBar(true));
  dispatch(setPlantAssessmentDepartment(''));
  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;

  const [getHorizonOptions, { isLoading: isLoadingGet }] = useGetPlanningHorizonListMutation();
  const [selectHorizonOption, { isLoading: isLoadingAdd }] = useSelectPlanningHorizonListMutation();
  const tenantId = getValueLocalStorage('tenantId');

  const [horizonOptions, setHorizonOptions] = useState<HorizonOption[]>([]);

  const { handleSubmit, control, reset } = useForm<HorizonFormValues>({
    defaultValues: {
      selectedHorizonId: '',
    },
  });

  const fetchHorizonOptions = async () => {
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
    reset({
      selectedHorizonId: preselected?.id || '',
    });
  };

  useEffect(() => {
    fetchHorizonOptions();
  }, []);

  const onSubmit = async (data: HorizonFormValues) => {
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

    const plannedSaveSuucesfully = await selectHorizonOption(payload).unwrap();
    if (plannedSaveSuucesfully) {
      router.push(`/IndustrySelection/${organisationId}/${plantId}`);
    }
  };

  const stepperState = useSelector((state: RootState) => state.stepper);

  useEffect(() => {
    dispatch(setActiveStep(2));
    dispatch(markStepCompleted(1));
    dispatch(markStepIncomplete(3)); // coming back from Industry
  }, [dispatch]);
  return (
    <Box sx={{ height: '99%' }} component="form" onSubmit={handleSubmit(onSubmit)}>
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
          <Box component="form" className={styles.formContainer}>
            <Typography
              variant="h6"
              sx={{
                color: 'black',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Planning Horizon
            </Typography>

            {isLoadingGet || isLoadingAdd ? (
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                <Loader loading />
              </Box>
            ) : (
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

                        return (
                          <Grid key={option.id} size={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }} sx={{ height: '10%' }}>
                            <Card label={option.planningHorizon} isSelected={isSelected} onToggle={() => field.onChange(option.id)} />
                          </Grid>
                        );
                      })}
                    </>
                  )}
                />
              </Grid>
            )}
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
              <CustomButton children="Back" variant="contained" color="primary" icon="left" type="button" onClick={() => router.back()} />
              <CustomButton children={isLoadingGet || isLoadingAdd ? 'Saving...' : 'Save'} variant="contained" icon="save" type="submit" />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PlanningHorizon;
