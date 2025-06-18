'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import styles from './SolutionAndImpactValues.module.css';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import InfoBox from '@/components/InfoBox/InfoBox';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import Card from '@/components/Card/Card';
import { useGetKPIDefinitionMutation, useSelectKPIDefinitionMutation } from '../../(plantAssessment)/plantAssementApi';
import { Kpi, KpiFormValues } from '../../(plantAssessment)/plantAssement.model';
import { useCallback } from 'react';

const SolutionAndImpactValues = () => {
  const params = useParams();
  const router = useRouter();
  const organisationId = params.organisationId as string;
  const plantId = params.plantId as string;
  const tenantId = getValueLocalStorage('tenantId');
  const [getKPIDefinition] = useGetKPIDefinitionMutation();
  const [selectKPIDefinition, { isLoading }] = useSelectKPIDefinitionMutation();
  const [kpiList, setKpiList] = useState<Kpi[]>([]);
  const { control, handleSubmit, reset } = useForm<KpiFormValues>({
    defaultValues: { kpis: [] },
  });

  const selectedKpis = useWatch({ control, name: 'kpis' });
  const selectedCount = selectedKpis?.filter((k) => k.isselected)?.length || 0;

  const fetchKpis = useCallback(async () => {
    try {
      const response = await getKPIDefinition({ tenantId, plantId }).unwrap();
      const cleaned = response.map((k: Kpi) => ({
        ...k,
        kpi: k.kpi.trim(),
      }));
      setKpiList(cleaned);
      reset({
        kpis: cleaned.map((k: Kpi) => ({ isselected: k.isselected })),
      });
    } catch (error) {
      console.error('Failed to fetch KPIs:', error);
    }
  }, [getKPIDefinition, tenantId, plantId, reset]);

  useEffect(() => {
    fetchKpis();
  }, [fetchKpis]);

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
    } catch {
      alert('something went wrong');
    }
  };

  return (
    <Box sx={{ height: '99%' }} component="form" onSubmit={handleSubmit(handleSave)}>
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
                          kpi={field.kpi}
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
              <CustomButton variant="contained" color="primary" icon="left" type="button" onClick={() => router.back()}>
                Back
              </CustomButton>
              <CustomButton variant="contained" icon="save" type="submit">
                {isLoading ? 'Submitting...' : 'Submit'}
              </CustomButton>
              <CustomButton
                variant="contained"
                color="primary"
                icon="right"
                type="button"
                onClick={() => router.back()}
              >
                next
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SolutionAndImpactValues;
