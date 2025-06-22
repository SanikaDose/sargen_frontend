'use client';

import { useEffect, useState } from 'react';
import { useGetKPIDefinitionMutation, useSelectKPIDefinitionMutation } from '../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import styles from './kpiDefinition.module.css';
import { Kpi, KpiFormValues } from '../plantAssement.model';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import InfoBox from '@/components/InfoBox/InfoBox';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import Stepper from '@/components/Stepper/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { markStepCompleted, markStepIncomplete, setActiveStep } from '@/store/Slices/StepperSlice';
import Card from '@/components/Card/Card';
import Loader from '@/components/Loader/Loader';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPlantAssessmentDepartment } from '../plantAssementSlice';

const KpiDefinition = () => {
  const params = useParams();
  const router = useRouter();

  const dispatch = useDispatch();
  dispatch(setPageNameHeader(pagesNames.plantAssessmentKpiDefinition));
  dispatch(setShowAssessmentListSideBar(true));
  dispatch(setPlantAssessmentDepartment(''));
  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;
  const tenantId = getValueLocalStorage('tenantId');
  const [getKPIDefinition, { isLoading: isLoadingGet }] = useGetKPIDefinitionMutation();
  const [selectKPIDefinition, { isLoading: isLoadingAdd }] = useSelectKPIDefinitionMutation();
  const [kpiList, setKpiList] = useState<Kpi[]>([]);
  const { control, handleSubmit, reset } = useForm<KpiFormValues>({
    defaultValues: { kpis: [] },
  });
  const selectedKpis = useWatch({ control, name: 'kpis' });
  const selectedCount = selectedKpis?.filter((k) => k.isselected)?.length || 0;
  const fetchKpis = async () => {
    try {
      const response = await getKPIDefinition({ tenantId, plantId }).unwrap();
      const cleaned = response.map((k: Kpi) => ({
        ...k,
        kpi: k.kpi.trim(),
      }));
      setKpiList(cleaned);
      reset({
        kpis: cleaned.map((k: { isselected: any }) => ({ isselected: k.isselected })),
      });
    } catch (error) {
      console.error('Failed to fetch KPIs:', error);
    }
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  const handleSave = async (formData: KpiFormValues) => {
    try {
      const payload = {
        tenantId,
        plantId,
        kpiDefinitions: formData.kpis.map((item, index) => ({
          id: kpiList[index].id,
          kpi: kpiList[index].kpi,
          isselected: item.isselected,
        })),
      };
      const kpisSaveSuccesfully = await selectKPIDefinition(payload).unwrap();
      if (kpisSaveSuccesfully) {
        router.push(`/PlanningHorizon/${organisationId}/${plantId}`);
      }
    } catch (error) {
      alert('something went wrong');
    }
  };

  const stepperState = useSelector((state: RootState) => state.stepper);
  useEffect(() => {
    dispatch(setActiveStep(1));
    dispatch(markStepCompleted(0));
    dispatch(markStepIncomplete(2)); // If coming back from Planning
  }, [dispatch]);
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
          <Box component="form" className={styles.formContainer}>
            <Typography
              variant="h6"
              sx={{
                color: 'black',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Kpis Selection
            </Typography>
            {isLoadingGet || isLoadingAdd ? (
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                <Loader loading />
              </Box>
            ) : (
              <Grid container spacing={2} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                {kpiList.map((field, index) => (
                  <Grid size={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }} key={field.id} sx={{ height: '10%' }}>
                    <Controller
                      name={`kpis.${index}.isselected`}
                      control={control}
                      render={({ field: controllerField }) => {
                        const isSelected = controllerField.value;
                        const isDisabled = !isSelected && selectedCount >= 5;

                        return (
                          <Card
                            key={field.id}
                            label={field.kpi}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                            onToggle={() => controllerField.onChange(!isSelected)}
                          />
                        );
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <InfoBox
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nulla arcu. Nam accumsan vel lectus nec ullamcorper. Sed euismod ultrices velit, nec dignissim tortor aliquam eu. Praesent volutpat tortor a mi molestie blandit. Nulla euismod tortor a luctus maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio enim, ullamcorper ornare egestas in, tristique non velit. Sed molestie felis id quam cursus elementum. Curabitur lectus sapien, placerat vel nulla ut, euismod rhoncus nulla. Sed convallis vulputate purus, at varius nisl efficitur cursus. Pellentesque tincidunt, velit id"
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
              <CustomButton children={isLoadingAdd || isLoadingGet ? 'Saving...' : 'Save'} variant="contained" icon="save" type="submit" />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default KpiDefinition;
