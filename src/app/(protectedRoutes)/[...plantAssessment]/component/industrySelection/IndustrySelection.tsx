import { useEffect, useState } from 'react';
import { useGetIndustrySelectionListMutation, useSelectIndustrySelectionListMutation } from '../../plantAssementApi';
import { useParams } from 'next/navigation';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './industrySelection.module.css';
import { Industry, IndustryFormValues, MultipleSections } from '../../plantAssement.model';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';

const IndustrySelection = ({ handleOptionSelected }: MultipleSections) => {
  const path = useParams() as { plantAssement?: string[] };
  const [getIndustrySelectionList] = useGetIndustrySelectionListMutation();
  const [selectIndustrySelectionList] = useSelectIndustrySelectionListMutation();
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
      plantId: path.plantAssement?.[2] || '',
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
      plantId: path.plantAssement?.[2] || '',
      selectedIndustry: {
        id: selectedIndustry.id,
        industry_name: selectedIndustry.industry_name,
        isselected: true,
      },
    };

    await selectIndustrySelectionList(payload).unwrap();
    handleOptionSelected('Questionnaires');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <FormControl component="fieldset">
        <Controller
          name="selectedIndustryId"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              {industryData.map((industry) => (
                <FormControlLabel
                  key={industry.id}
                  value={industry.id}
                  control={<Radio />}
                  label={<Typography className={styles.labels}>{industry.industry_name}</Typography>}
                />
              ))}
            </RadioGroup>
          )}
        />
      </FormControl>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default IndustrySelection;
