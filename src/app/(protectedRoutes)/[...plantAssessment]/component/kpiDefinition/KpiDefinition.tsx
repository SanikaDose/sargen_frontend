import { useEffect, useState } from 'react';
import { useGetKPIDefinitionMutation, useSelectKPIDefinitionMutation } from '../../plantAssementApi';
import { useParams } from 'next/navigation';
import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './kpiDefinition.module.css';
import { Kpi, KpiFormValues, MultipleSections, RawCostCategory } from '../../plantAssement.model';
import { useDispatch } from 'react-redux';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';

const KpiDefinition = ({ handleOptionSelected }: MultipleSections) => {
  const dispatch = useDispatch();
  const path = useParams() as { plantAssessment?: string[] };
  const [getKPIDefinition] = useGetKPIDefinitionMutation();
  const [selectKPIDefinition] = useSelectKPIDefinitionMutation();
  const tenantId = getValueLocalStorage('tenantId');
  const [kpiData, setKpiData] = useState<Kpi[]>([]);

  const { handleSubmit, control, reset, watch } = useForm<KpiFormValues>({
    defaultValues: {
      kpis: [],
    },
  });
  const watchKpis = watch('kpis');
  const selectedCount = watchKpis.filter((k) => k.isselected).length;

  const buildPayload = (plantAssessment: string[] | undefined, data: Kpi[]) => {
    if (plantAssessment && plantAssessment.length > 1) {
      return {
        tenantId,
        plantId: plantAssessment[2],
        kpiDefinitions: data.map((item) => ({
          id: item.id,
          kpi: item.kpi,
          isselected: item.isselected,
        })),
      };
    }
    return null;
  };

  async function apiCall() {
    const obj2 = {
      tenantId,
      plantId: path.plantAssessment?.[2] || '',
    };
    const result = await getKPIDefinition(obj2).unwrap();
    const initialData = result.map((item: Kpi) => ({
      id: item.id,
      kpi: item.kpi.trim(),
      isselected: item.isselected,
    }));
    setKpiData(initialData);
    reset({
      kpis: initialData.map((item: Kpi) => ({
        isselected: item.isselected,
      })),
    });
  }

  useEffect(() => {
    apiCall();
  }, []);

  const onSubmit = async (data: { kpis: { isselected: boolean }[] }) => {
    const selectedCount = data.kpis.filter((kpi) => kpi.isselected).length;
    const payload = buildPayload(
      path.plantAssessment,
      data.kpis.map((item, i) => ({
        ...item,
        id: kpiData[i].id,
        kpi: kpiData[i].kpi,
      })),
    );
    if (!payload) return;

    await selectKPIDefinition(payload).unwrap();
    handleOptionSelected('Planning Horizon');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <Typography variant="h6" sx={{ color: 'black', textAlign: 'left', width: '100%' }}>
        KPIs Defination
      </Typography>

      <Grid container spacing={2} sx={{ width: '70%', margin: '0 auto' }}>
        {watchKpis.length > 0 &&
          kpiData.map((field, index) => (
            <Grid size={6} key={field.id}>
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
                      }}
                    >
                      <Checkbox
                        checked={isSelected}
                        disabled={isDisabled}
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
      {/* 
      <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
        Submit
      </Button> */}
    </Box>
  );
};

export default KpiDefinition;
