'use client';

import { useEffect, useState } from 'react';
import { useGetPlanningHorizonListMutation, useSelectPlanningHorizonListMutation } from '../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { Box, Button, Card, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
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
  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;

  const [getHorizonOptions] = useGetPlanningHorizonListMutation();
  const [selectHorizonOption, { isLoading }] = useSelectPlanningHorizonListMutation();
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

  const dispatch = useDispatch();
  const stepperState = useSelector((state: RootState) => state.stepper);

  useEffect(() => {
    dispatch(setActiveStep(2));
    dispatch(markStepCompleted(1));
    dispatch(markStepIncomplete(3)); // coming back from Industry
  }, [dispatch]);
  return (
    <Box sx={{ height: '100%' }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.stepperContainer}>
        <Stepper
          steps={stepperState.steps}
          activeStep={stepperState.activeStep}
          completedSteps={stepperState.completedSteps}
        />
      </Box>
      <Box className={styles.formSection}>
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

            <Grid container spacing={2} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
              <Controller
                name="selectedHorizonId"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} className={styles.radioGroup}>
                    {horizonOptions.map((option) => {
                      const isSelected = field.value === option.id;
                      return (
                        <Card
                          key={option.id}
                          onClick={() => field.onChange(option.id)}
                          sx={{
                            cursor: 'pointer',
                            background: isSelected ? '#10557C' : '#fff',
                            border: '0.4px solid #CCCCCC',
                            boxShadow: '0px 4px 4px 0px #00000040',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            paddingX: 2,
                            transition: 'background 0.3s ease',
                            color: isSelected ? '#fff' : '#000',
                            width: '50%',
                            height: '15%',
                            margin: 'auto',
                          }}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: 8 }}
                          >
                            <path
                              d="M8.33337 16.1668V8.66683H0.833374L9.16671 0.333496H16.6667V7.8335L8.33337 16.1668ZM13.3334 8.81266L15 7.146V2.00016H9.85421L8.18754 3.66683H13.3334V8.81266ZM10 12.146L11.6667 10.4793V5.3335H6.52087L4.85421 7.00016H10V12.146Z"
                              fill={isSelected ? 'white' : '#10557C'}
                            />
                          </svg>
                          <Box>
                            <Typography className={styles.labels}>{option.planningHorizon}</Typography>
                            <Typography>{`${option.termEnd} to ${option.termStart} years`}</Typography>
                          </Box>
                        </Card>
                      );
                    })}
                  </RadioGroup>
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

            <Box className={styles.buttonSection}>
              <CustomButton
                children="Back"
                variant="contained"
                color="primary"
                icon="left"
                type="button"
                onClick={() => router.back()}
              />
              <CustomButton children={isLoading ? 'Saving...' : 'Save'} variant="contained" icon="save" type="submit" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanningHorizon;
