'use client';
import { useEffect, useState } from 'react';
import { useAddCostCategoriesMutation, useGetCostCategoriesMutation } from '../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { CostInputPercentage, FormValues, MultipleSections, RawCostCategory } from '../plantAssement.model';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import styles from './costProfile.module.css';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import OverallCostProfileCard from '@/components/CostProfileCard/OverallCostProfileCard';
import InfoBox from '@/components/InfoBox/InfoBox';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import Stepper from '@/components/Stepper/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { markStepCompleted, markStepIncomplete, setActiveStep } from '@/store/Slices/StepperSlice';

const CostProfile = () => {
  const params = useParams();
  const router = useRouter();
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

  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;

  const tenantId = getValueLocalStorage('tenantId');
  const [getCostCategories] = useGetCostCategoriesMutation();
  const [addCostCategories, { isLoading }] = useAddCostCategoriesMutation();

  const { control, handleSubmit, reset } = useForm<FormValues>({
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
    console.log('hello');

    if (!organisationId || !plantId) return;
    try {
      console.log('hello api is cakling');
      const payload = {
        tenantId,
        plantId: plantId,
        costProfileData: data.costs.map((cost) => ({
          id: cost.id,
          costCategory: cost.costCategory,
          costAsAPercentageOfRevenue: parseFloat(String(cost.costAsAPercentageOfRevenue)),
        })),
      };

      const costProfileSaveResponse = await addCostCategories(payload).unwrap();
      if (costProfileSaveResponse) {
        router.push(`/KpiDefinition/${organisationId}/${plantId}`);
      }
    } catch (error) {
      alert('cannot fetch api');
    }
  };

  useEffect(() => {
    fetchCostProfileData();
  }, [params]);

  const dispatch = useDispatch();
  const stepperState = useSelector((state: RootState) => state.stepper);
  useEffect(() => {
    dispatch(setActiveStep(0));
    dispatch(markStepIncomplete(1)); // Back navigation from step 1
  }, [dispatch]);

  return (
    <Box component="form" sx={{ height: '99%' }} onSubmit={handleSubmit(handleFormSubmit)}>
      <Box className={styles.stepperContainer}>
        <Stepper
          steps={stepperState.steps}
          activeStep={stepperState.activeStep}
          completedSteps={stepperState.completedSteps}
        />
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
            <Typography
              variant="h6"
              sx={{
                color: 'black',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Cost Profile
            </Typography>
            {/* <Box className={styles.costProfile} sx={{ width: '100%' }}>
              <Grid
                container
                spacing={2}
                sx={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  width: '100%',
                }}
              >
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

              <Box className={styles.OverallCostProfileCard}>
                <OverallCostProfileCard
                  fieldName="Overall Cost Profile"
                  costValue={averagePercentage}
                  onChange={() => {}}
                  readonly
                  boxBackgroundColor="#10557C"
                  textColor="#FFFFFF"
                />
              </Box>
            </Box> */}

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
      </Paper>
    </Box>
  );
};

export default CostProfile;
