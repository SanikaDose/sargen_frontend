'use client';

import { useEffect, useState } from 'react';
import { useGetIndustrySelectionListMutation, useSelectIndustrySelectionListMutation } from '../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { Box, Button, Card, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './IndustrySelection.module.css';
import { Industry, IndustryFormValues, MultipleSections } from '../plantAssement.model';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import InfoBox from '@/components/InfoBox/InfoBox';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import Stepper from '@/components/Stepper/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { markStepCompleted, setActiveStep } from '@/store/Slices/StepperSlice';

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

const IndustrySelection = () => {
  const router = useRouter();
  const params = useParams();
  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;
  const [getIndustrySelectionList] = useGetIndustrySelectionListMutation();
  const [selectIndustrySelectionList, { isLoading }] = useSelectIndustrySelectionListMutation();
  const tenantId = getValueLocalStorage('tenantId');
  const [industryData, setIndustryData] = useState<Industry[]>([]);

  const { handleSubmit, control, reset } = useForm<IndustryFormValues>({
    defaultValues: {
      selectedIndustryId: '',
    },
  });

  const apiCall = async () => {
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
    reset({
      selectedIndustryId: selected?.id || '',
    });
  };

  useEffect(() => {
    apiCall();
  }, []);

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

    const industrySaveSuccesfully = await selectIndustrySelectionList(payload).unwrap();
    if (industrySaveSuccesfully) {
      router.push(`/Questionaire/${organisationId}/${plantId}`);
    }
  };

  const dispatch = useDispatch();
  const stepperState = useSelector((state: RootState) => state.stepper);

  useEffect(() => {
    dispatch(setActiveStep(3));
    dispatch(markStepCompleted(2));
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
              Industry Selection
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                flexWrap: 'wrap',
                mt: 2,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Controller
                name="selectedIndustryId"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    className={styles.radioGroup}
                    sx={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '100%',
                    }}
                  >
                    {industryData.map((industry) => {
                      const isSelected = field.value === industry.id;

                      return (
                        <Box key={industry.id} sx={{}} className={styles.cards}>
                          <Card
                            onClick={() => field.onChange(industry.id)}
                            sx={{
                              cursor: 'pointer',
                              background: isSelected ? '#10557C' : '#fff',
                              border: '0.4px solid #CCCCCC',
                              boxShadow: '0px 4px 4px 0px #00000040',
                              borderRadius: 2,
                              paddingX: 2,
                              transition: 'background 0.3s ease',
                              color: isSelected ? '#fff' : '#000',
                              width: '70%',
                              height: 70,
                              display: 'flex',
                              alignItems: 'center',
                              m: 'auto',
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
                            <Typography className={styles.labels}>{industry.industry_name}</Typography>
                          </Card>
                        </Box>
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

export default IndustrySelection;
