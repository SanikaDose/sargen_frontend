'use client';

import { useEffect, useMemo, useState } from 'react';
import { useGetKPIDefinitionMutation, useSelectKPIDefinitionMutation } from '../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { Box, Card, Checkbox, Grid, Typography } from '@mui/material';
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

const KPI_TO_CATEGORY_MAP: Record<string, string> = {
  'Time to Delivery': 'Dilevery',
  'Utilities Efficiency': 'Utilities',
  'Materials Efficiency': 'Material',
  'Process Quality': 'Process',
  Safety: 'Safety',
  Security: 'Security',
  'Planning and Sched Effectiveness': 'Planning',
  'Production Flexibility': 'Product',
  'Workforce Flexibility': 'Workforce',
  'Time to Market': 'Market',
  'Asset and Equipment Efficiency': 'Asset Eff.',
  'Workforce Efficiency': 'Workforce Eff.',
  'Inventory Efficiency': 'Inventory Eff',
  'Product Quality': 'Product Quality',
};

const KpiDefinition = () => {
  const params = useParams();

  const router = useRouter();
  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;
  const tenantId = getValueLocalStorage('tenantId');
  const [getKPIDefinition] = useGetKPIDefinitionMutation();
  const [selectKPIDefinition, { isLoading }] = useSelectKPIDefinitionMutation();
  const [kpiList, setKpiList] = useState<Kpi[]>([]);

  const steps = Object.values(KPI_TO_CATEGORY_MAP).map((label) => ({ label }));

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

  const completedSteps = useMemo(() => {
    const categories = new Set<string>();
    selectedKpis.forEach((kpi, i) => {
      if (kpi.isselected) {
        const category = KPI_TO_CATEGORY_MAP[kpiList[i]?.kpi];
        if (category) categories.add(category);
      }
    });
    return steps.map((s, i) => (categories.has(s.label) ? i : -1)).filter((i) => i !== -1);
  }, [selectedKpis, kpiList]);

  const dispatch = useDispatch();
  const stepperState = useSelector((state: RootState) => state.stepper);
  useEffect(() => {
    dispatch(setActiveStep(1));
    dispatch(markStepCompleted(0));
    dispatch(markStepIncomplete(2)); // If coming back from Planning
  }, [dispatch]);
  return (
    <Box sx={{ height: '100%' }} component="form" onSubmit={handleSubmit(handleSave)}>
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
              Kpis Selection
            </Typography>

            <Grid container spacing={2} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
              {kpiList.map((field, index) => (
                <Grid size={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }} key={field.id} sx={{ height: '12%' }}>
                  <Controller
                    name={`kpis.${index}.isselected`}
                    control={control}
                    render={({ field: controllerField }) => {
                      const isSelected = controllerField.value;
                      const isDisabled = !isSelected && selectedCount >= 5;

                      return (
                        <Card
                          onClick={() => !isDisabled && controllerField.onChange(!isSelected)}
                          sx={{
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            background: isSelected ? '#10557C' : '#fff',
                            border: '0.4px solid #CCCCCC',
                            boxShadow: '0px 4px 4px 0px #00000040',
                            borderRadius: 2,
                            minHeight: 60,
                            display: 'flex',
                            alignItems: 'center',
                            paddingX: 2,
                            transition: 'background 0.3s ease',
                            color: isSelected ? '#fff' : '#000',
                            width: '100%',
                          }}
                        >
                          <Checkbox
                            checked={isSelected}
                            disabled={isDisabled}
                            onChange={() => controllerField.onChange(!isSelected)}
                            sx={{ color: '#fff', padding: 0, marginRight: 1 }}
                          />
                          <Typography
                            sx={{
                              textTransform: 'capitalize',
                              fontWeight: 500,
                              fontSize: 14,
                              color: isSelected ? '#fff' : '#000',
                            }}
                          >
                            {field.kpi}
                          </Typography>
                        </Card>
                      );
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <InfoBox
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nulla arcu. Nam accumsan vel lectus nec ullamcorper. Sed euismod ultrices velit, nec dignissim tortor aliquam eu. Praesent volutpat tortor a mi molestie blandit. Nulla euismod tortor a luctus maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio enim, ullamcorper ornare egestas in, tristique non velit. Sed molestie felis id quam cursus elementum. Curabitur lectus sapien, placerat vel nulla ut, euismod rhoncus nulla. Sed convallis vulputate purus, at varius nisl efficitur cursus. Pellentesque tincidunt, velit id"
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

export default KpiDefinition;
