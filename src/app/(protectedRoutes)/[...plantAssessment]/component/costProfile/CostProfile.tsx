import { useEffect, useState } from 'react';
import { useAddCostCategoriesMutation, useGetCostCategoriesMutation } from '../../plantAssementApi';
import { useParams, useRouter } from 'next/navigation';
import { CostInputPercentage, FormValues, MultipleSections, RawCostCategory } from '../../plantAssement.model';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './costProfile.module.css';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';

const CostProfile = ({ handleOptionSelected }: MultipleSections) => {
  const router = useRouter();
  const path = useParams() as { plantAssement?: string[] };

  const [getCostCategories] = useGetCostCategoriesMutation();
  const [addCostCategories] = useAddCostCategoriesMutation();
  const tenantId = getValueLocalStorage('tenantId');
  const [costProfileData, setCostProfileData] = useState<any[]>([]);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      costs: [],
    },
  });

  const buildBasicPayload = (plantAssement: string[] | undefined) => {
    if (plantAssement && plantAssement.length > 1) {
      return {
        tenantId: tenantId,
        plantId: plantAssement[2],
      };
    } else {
      return null;
    }
  };

  const buildCostProfilePayload = (plantAssement: string[] | undefined, costs: any[]) => {
    if (costs.length && plantAssement && plantAssement.length > 1) {
      return {
        tenantId: tenantId,
        plantId: plantAssement[2],
        costProfileData: costs.map((item) => ({
          id: item.id,
          costCategory: item.costCategory,
          costAsAPercentageOfRevenue: parseFloat(item.costAsAPercentageOfRevenue),
        })),
      };
    } else {
      return null;
    }
  };

  async function apiCall() {
    const payload = buildBasicPayload(path.plantAssement);
    if (!payload) return;

    const result = await getCostCategories(payload).unwrap();

    const initialData = result.map((item: RawCostCategory) => ({
      id: item.id,
      costCategory: item.costCategory.trim(),
      costAsAPercentageOfRevenue: parseFloat(item.costAsAPercentageOfRevenue) || 0,
    }));

    setCostProfileData(initialData);
    reset({ costs: initialData });
  }

  useEffect(() => {
    apiCall();
  }, []);

  const onSubmit = async (data: { costs: CostInputPercentage[] }) => {
    const payload = buildCostProfilePayload(
      path.plantAssement,
      data.costs.map((item, i) => ({
        ...item,
        id: costProfileData[i].id,
        costCategory: costProfileData[i].costCategory,
      })),
    );
    if (!payload) return;
    await addCostCategories(payload).unwrap();
    handleOptionSelected('KPI Selection');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} gap={2} className={styles.formContainer}>
      <section className={styles.innerConatiner}>
        {costProfileData.map((field, index) => (
          <Controller
            key={field.id}
            name={`costs.${index}.costAsAPercentageOfRevenue`}
            control={control}
            rules={{
              required: 'This field is required',
              min: { value: 0, message: 'Minimum value is 0' },
              max: { value: 100, message: 'Maximum value is 100' },
            }}
            render={({ field: controllerField, fieldState }) => (
              <div className={styles.individualInput}>
                <Typography
                  className={styles.labels}
                  variant="h6"
                >{`${index + 1}. ${field.costCategory} (%)`}</Typography>
                <TextField
                  className={styles.inputField}
                  {...controllerField}
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: 1,
                      min: 0,
                      max: 100,
                    },
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || ''}
                />
              </div>
            )}
          />
        ))}
      </section>

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default CostProfile;
