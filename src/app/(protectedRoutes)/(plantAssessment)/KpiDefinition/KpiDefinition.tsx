'use client';

import { useEffect, useState } from 'react';
import { useGetKPIDefinitionMutation, useSelectKPIDefinitionMutation } from '../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { Box, Grid, Paper } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import styles from './kpiDefinition.module.css';
import { Kpi, KpiFormValues } from '../plantAssement.model';
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
import { aboutSection } from '@/app/utils/aboutSection';

const KpiDefinition = () => {
  const params = useParams();
  const router = useRouter();
  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;
  const tenantId = organisationId;
  const dispatch = useDispatch();

  const stepperState = useSelector((state: RootState) => state.stepper);
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.plantAssessmentKpiDefinition));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
    dispatch(setActiveStep(2));
    dispatch(markStepCompleted(1));
    dispatch(markStepIncomplete(3));
  }, [dispatch]);

  const [getKPIDefinition, { isLoading: isLoadingGet }] = useGetKPIDefinitionMutation();
  const [selectKPIDefinition, { isLoading: isLoadingSelect }] = useSelectKPIDefinitionMutation();
  const [kpiList, setKpiList] = useState<Kpi[]>([]);
  const { control, handleSubmit, reset } = useForm<KpiFormValues>({
    defaultValues: { kpis: [] },
  });
  const selectedKpis = useWatch({ control, name: 'kpis' });

  const selectedCount = selectedKpis?.filter((k) => k.isselected)?.length || 0;

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await getKPIDefinition({ tenantId, plantId }).unwrap();

        console.log('response', response);

        const cleaned = response.map((k: Kpi) => ({
          ...k,
          kpi: k.kpi.trim(),
        }));
        setKpiList(cleaned);
        reset({
          kpis: cleaned.map((k: { isselected: boolean }) => ({ isselected: k.isselected })),
        });
      } catch (error) {
        console.error('Failed to fetch KPIs:', error);
      }
    };
    fetchKpis();
  }, [router, getKPIDefinition, tenantId, plantId, reset]);

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
      await selectKPIDefinition(payload).unwrap();
      // if (kpisSaveSuccesfully) {
      router.push(`/CostProfile/${organisationId}/${plantId}`);
      // }
    } catch (error) {
      console.log('error', error);
    }
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
        <form style={{ height: '99%' }} onSubmit={handleSubmit(handleSave)}>
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
                {isLoadingGet ? (
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
                    disabled={selectedCount !== 5 || isLoadingGet || isLoadingSelect}
                    variant="contained"
                    icon="save"
                    type="submit"
                  >
                    {isLoadingSelect ? 'Saving...' : 'Save'}
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          </Paper>
        </form>
      )}
    </Box>
  );
};

export default KpiDefinition;
