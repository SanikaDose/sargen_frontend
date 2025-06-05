import { useEffect, useState } from 'react';
import { useGetPlanningHorizonListMutation, useSelectPlanningHorizonListMutation } from '../../plantAssementApi';
import { useParams } from 'next/navigation';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './horizonPlanning.module.css';
import { HorizonFormValues, HorizonOption, MultipleSections } from '../../plantAssement.model';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';

const HorizonPlanning = ({ handleOptionSelected }: MultipleSections) => {
  const params = useParams() as { plantAssement?: string[] };
  const [getHorizonOptions] = useGetPlanningHorizonListMutation();
  const [selectHorizonOption] = useSelectPlanningHorizonListMutation();
  const tenantId = getValueLocalStorage('tenantId');

  const [horizonOptions, setHorizonOptions] = useState<HorizonOption[]>([]);

  const { handleSubmit, control, reset } = useForm<HorizonFormValues>({
    defaultValues: {
      selectedHorizonId: '',
    },
  });

  const fetchHorizonOptions = async () => {
    const requestPayload = {
      tenantId,
      plantId: params.plantAssement?.[2] || '',
    };
    const result = await getHorizonOptions(requestPayload).unwrap();

    const mappedOptions = result.map((option: HorizonOption) => {
      let termStart = Number(option.termStart);
      let termEnd = Number(option.termEnd);

      if (termStart % 1 !== 0) {
        termStart = Math.round(termStart * 12);
      }
      if (termEnd % 1 !== 0) {
        termEnd = Math.round(termEnd * 12);
      }

      return {
        id: option.id,
        planningHorizon: option.planningHorizon.trim(),
        termStart,
        termEnd,
        degreeOfRelevanceCost: option.degreeOfRelevanceCost,
        degreeOfRelevanceKpi: option.degreeOfRelevanceKpi,
        degreeOfInfluenceOnProximityFactors: option.degreeOfRelevanceKpi,
        isselected: option.isselected,
      };
    });

    setHorizonOptions(mappedOptions);

    const preselected = mappedOptions.find((opt: HorizonOption) => opt.isselected);
    reset({
      selectedHorizonId: preselected?.id || '',
    });
  };

  useEffect(() => {
    fetchHorizonOptions();
  }, []);

  const onSubmit = async (data: HorizonFormValues) => {
    const selectedOption = horizonOptions.find((opt) => opt.id === data.selectedHorizonId);
    if (!selectedOption) return;

    const payload = {
      tenantId,
      plantId: params.plantAssement?.[2] || '',
      selectedPlan: {
        id: selectedOption.id,
        planningHorizon: selectedOption.planningHorizon,
        isselected: true,
        degreeOfRelevanceCost: selectedOption.degreeOfRelevanceCost,
        degreeOfRelevanceKpi: selectedOption.degreeOfRelevanceKpi,
        degreeOfInfluenceOnProximityFactors: selectedOption.degreeOfRelevanceKpi,
      },
    };

    await selectHorizonOption(payload).unwrap();
    handleOptionSelected('Industry Selection');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.outerContainer}>
      <FormControl component="fieldset" className={styles.formContainer}>
        <Controller
          name="selectedHorizonId"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              {horizonOptions.map((option) => {
                console.log(option);

                return (
                  <section className={styles.individualRadioButtonDiv}>
                    <FormControlLabel
                      key={option.id}
                      value={option.id}
                      control={<Radio />}
                      label={<Typography className={styles.labels}>{option.planningHorizon}</Typography>}
                    />
                    <Typography className={styles.termStartText} sx={{ color: 'black' }}>
                      {`${option.termEnd} to ${option.termStart} years`}
                    </Typography>
                  </section>
                );
              })}
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

export default HorizonPlanning;
