import { useEffect, useState } from 'react';
import { useGetKPIDefinitionMutation, useSelectKPIDefinitionMutation } from '../../plantAssementApi';
import { useParams } from 'next/navigation';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './kpiDefinition.module.css';
import { Kpi, KpiFormValues, MultipleSections, RawCostCategory } from '../../plantAssement.model';
import { useDispatch } from 'react-redux';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';

const KpiDefinition = ({ handleOptionSelected }: MultipleSections) => {
  const dispatch = useDispatch();
  const path = useParams() as { plantAssement?: string[] };
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

  const buildPayload = (plantAssement: string[] | undefined, data: Kpi[]) => {
    if (plantAssement && plantAssement.length > 1) {
      return {
        tenantId,
        plantId: plantAssement[2],
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
      plantId: path.plantAssement?.[2] || '',
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
      path.plantAssement,
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
      <Typography variant="subtitle1" className={styles.kpiTitle}>
        <span className={styles.iconTextWrapper}>
          <TipsAndUpdatesIcon className={styles.icon} />
          Minimum 5 KPIs should be selected.
        </span>
      </Typography>

      <article className={styles.innerConatiner}>
        {watchKpis.length > 0 &&
          kpiData.map((field, index) => (
            <Controller
              key={field.id}
              name={`kpis.${index}.isselected`}
              control={control}
              render={({ field: controllerField }) => {
                const isDisabled = !controllerField.value && selectedCount >= 5;
                return (
                  <FormControlLabel
                    control={<Checkbox {...controllerField} checked={controllerField.value} disabled={isDisabled} />}
                    label={<Typography className={styles.labels}>{field.kpi}</Typography>}
                  />
                );
              }}
            />
          ))}
      </article>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default KpiDefinition;
